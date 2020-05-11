//подключаем модель блогов
const blogs = require("../models/blogModel");

//колбек функции для блогов
//============================
//получить все блоги
exports.getAll = (req, res) => {
    blogs.find()
        .exec((err, newS) => {
        if (err) throw err;
        res.send(blogs);
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