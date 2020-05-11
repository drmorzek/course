//подключаем експресс и контроллер блога
const express = require("express");
const blogsController = require("../controllers/blogController");

//устанавливаем роут блога
const blogsRouter = express.Router();

//устанавливаем роуты для блога
blogsRouter.get("/all", blogsController.getAll);
blogsRouter.get("/:id", blogsController.getOne);

//експортируем blogsRouter
module.exports = blogsRouter;