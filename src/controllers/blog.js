//подключаем модель блогов
const blogs = require("../models/blog");

//експорт редиски для кеширования
const redis = require("../config/redis");

//время жизни блога в кеше(в секундах)
const expire = 60;

//колбек функции для блогов
//============================
//получить все блоги
const getAll = async (req, res) => {
    await blogs
        .find()
        .exec((err, data) => {
            if (err) throw err;
            if (data.length !== 0 ) {
                data.forEach((value, index) =>{
                    console.log("В Redis записано ", String(value));
                    redis.set(
                      "blog_"+String(value.id),
                      JSON.stringify(value),
                      "EX", expire
                    );
                });                
                res.status(200).send(data);
            } else {
                res.sendStatus(501);
            }
        });
    };

//получить блог по id
const getOne = async (req, res) => {        
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
    

module.exports = {
    getAll,
    getOne
};