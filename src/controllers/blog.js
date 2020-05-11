//подключаем модель блогов
const blogs = require("../models/blog");

//колбек функции для блогов
//============================
//получить все блоги
exports.getAll = (req, res) => {
    blogs.find()
        .exec((err, data) => {
        if (err) throw err;
        res.send(data);
    });
};

//получить блог по id
exports.getOne = (req, res) => {
    blogs
        .find({
            id: Number(req.params.id),
        })
        .exec((err, data) => {
            if (err) throw err;
            res.send(data);
        });
};