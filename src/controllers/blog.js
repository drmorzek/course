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
                if (!blog[0]) {
                  // сервер возвращает 400 - если блоги не найдены
                  res.status(400).json({
                    message: 'Blogs not found from MongoDB'
                  });

                } else {
                  //сохраняем полученные данные в редис
                  await blog.forEach((value, index) => {
                    //для проверки в консоли
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
                res.status(400).json({
                  message: `Error: ${String(e)}`
                });
              }
  };

//получить блог по id
module.exports.getOne = async (req, res) => {
        //проверка передаваемых get параметров на число(опциональная)  
        if (isNaN(Number(req.params.id))) {
          //если передаваемый параметр не является числом, то сервер возвращает 400 с ошибкой
          res.status(400).json({
            message: 'Params not a Number'
          });

          //иначе если всё ништяк
          } else {

            try {
                //ищем блог в кеше
                const blogFromRedis = await redis.get("blog_" + req.params.id);

                //если в кеше блога есть
                if (blogFromRedis) {
                  //для проверки в консоли
                  console.log("Взято из Redis ", JSON.parse(blogFromRedis));

                  // сервер возвращает 201 - если в редис сохранился блог
                  res.status(201).json({
                    data: JSON.parse(blogFromRedis)
                  });

                  //если в кеше блога нет, то..
                } else {
                  //ищем блог в базе монго
                  const blogFromMongo = await Blogs.find({
                    id: Number(req.params.id),
                  });

                  //если блог и в монго не найден                
                  if (!blogFromMongo[0]) {

                    //для проверки в консоли
                    console.log('Blogs not found in MongoDB and Redis');

                    // сервер возвращает 400 - если блог в монго не найден
                    res.status(400).json({
                      message: 'Blogs not found in MongoDB and Redis'
                    });

                    //иначе, если блог в базе найден, то...
                  } else {
                    //для проверки в консоли
                    console.log("Взято из MongoDB ", blogFromMongo);

                    //кешируем в редис если блог в базе найден
                    await redis.set(
                      "blog_" + String(req.params.id),
                      JSON.stringify(blogFromMongo),
                      "EX", expire
                    );
                    // сервер возвращает 201 - если все ок
                    res.status(201).json({
                      data: blogFromMongo
                    });
                  }
                }
            } catch (e) {
              res.status(400).json({
                message: `Error: ${String(e)}`
              });
            }  
            
        }
    };
    
