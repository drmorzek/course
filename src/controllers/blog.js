//подключаем модель блогов
const Blogs = require("../models/blog");

//импорт редиски для кеширования
const redis = require("../config/redis");

//время жизни блога в кеше(в секундах)
const expire = 60;

//колбек функции для блогов
//============================
//получить все блоги
module.exports.getAll = async (req, res) => {

              try {
                const blog = await Blogs.find({});
                if (!blog) {

                  // сервер возвращает 400 - если блоги не найдены
                  res.status(400).json({
                    message: 'Blogs not found'
                  });

                } else {
                  //сохраняем полученные данные в редис
                  blog.forEach((value, index) => {
                    console.log("В Redis записано ", String(value));
                    redis.set("blog_" + String(value.id), 
                    JSON.stringify(value), 
                    "EX", expire);
                  });

                  // сервер возвращает 201 - если все ок
                  res.status(201).json({
                    data: blog
                  });
                }

              } catch (e) {
                throw e;
              }
  };




//получить блог по id
module.exports.getOne = async (req, res) => {
        //проверка передаваемых get параметров на число(опциональная)  
        if (!isNaN(Number(req.params.id))) {

            await redis.get("blog_" + req.params.id,async (err, blog_cache) =>{

              // 400 - если ошибка в редис
              if (err) res.status(400).json({
                message: 'Blogs not found'
              });

              if (blog_cache) {
                //для проверки в консоли
                console.log("Взято из Redis ", JSON.parse(blog_cache));

                // сервер возвращает 201 - если в редис сохранился блог
                res.status(201).json({
                  data: JSON.parse(blog_cache)
                });

              } else {
                  try {

                      //если в редис нет - ищем в монго
                      const blog = await Blogs.find({
                        id: Number(req.params.id),
                      });
                      if (!blog) {

                        // сервер возвращает 400 - если блог в монго не найден
                        res.status(400).json({
                          message: 'Blogs not found in MongoDB'
                        });

                      } else {
                        //для проверки в консоли
                        console.log("Взято из MongoDB ", blog);
                        //кешируем в редис если блог в базе найден
                        await redis.set(
                          "blog_" + String(req.params.id),
                          JSON.stringify(blog),
                          "EX", expire
                        );

                        // сервер возвращает 201 - если все ок
                        res.status(201).json({
                          data: blog
                        });
                      }

                  } catch (e) {
                      throw e;
                  }                       
              }
            });            
        } else {
            res.sendStatus(501);
        }
    };
    
