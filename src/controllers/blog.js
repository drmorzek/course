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
    try{
        const news = await Blogs.find({});
        if(!news){
            // 400 - новости не найдены
            res.status(400).json({
                message: 'fdfsdf'
            });
        } else {
            news.forEach((value, index) =>{
                redis.set(
                      "blog_"+String(value.id),
                      JSON.stringify(value),
                      "EX", expire
                    );
             });    
            // 201 - все ок
            res.status(201).json({
                data: news
            });
        }
    } catch(e) {
        throw e
    };
//получить блог по id
module.exports.getOne = async (req, res) => {        
        if (!isNaN(Number(req.params.id))) {
           await redis.get("blog_"+req.params.id, (err, res_cache) => {
              if (err) res.status(501).send(err);
              if (res_cache) {
                console.log("Взято из Redis ", JSON.parse(res_cache));
                res.status(200).send(JSON.parse(res_cache));
              } else {
                blogs
                  .find({
                    id: Number(req.params.id),
                  })
                  .exec((err, data) => {
                    if (err) res.status(501).send(err);
                    if (data.length !== 0) {
                      console.log("Взято из БД ", data);
                      redis.set(
                        "blog_"+String(req.params.id),
                        JSON.stringify(data),
                        "EX", expire
                      );                      
                      res.status(200).send(data);
                    } else {
                      res.sendStatus(501);
                    }
                  });
              }
            });
            
        } else {
            res.sendStatus(501);
        }
    };
