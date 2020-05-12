//подключаем модель блогов
const blogs = require("../models/blog");

//колбек функции для блогов
//============================
//получить все блоги
const getAll = async (req, res) => {
    await blogs
        .find()
        .exec((err, data) => {
            if (err) throw err;
            if (data.length !== 0 ) {
                res.status(200).send(data);
            } else {
                res.sendStatus(501);
            }
        });
    };

//получить блог по id
const getOne = async (req, res) => {
    if (isNaN(Number(req.params.id)) !== true) {
        await blogs
            .find({
                id: Number(req.params.id),
            })
            .exec((err, data) => {
                if (err) res.status(501).send(err);
                if (data.length !== 0) {
                    res.status(200).send(data);
                } else {
                    res.sendStatus(501);
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