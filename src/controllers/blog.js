//подключаем модель блогов
const blogs = require("../models/blog");

//експорт редиски для кеширования
const redis = require("../config/redis");

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
                    redis.hmset(
                      "blog_cache",
                      String(value.id),
                      JSON.stringify(value)
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
            redis.hmget("blog_cache", req.params.id, (err, res_cache) => {
              if (err) res.status(501).send(err);
              if (String(res_cache).length !== 0) {
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
                      redis.hmset(
                        "blog_cache",
                        String(req.params.id),
                        JSON.stringify(data)
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