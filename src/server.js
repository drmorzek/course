//подключение библиотек
require("dotenv").config();
const express = require("express");
const modelDb = require("./config/mongoConfig");

//установка константы значения порта
const port = process.env.PORT || 3000;

//установка константы сервера
const app = express();

//запуск сервера на прослушку порта 
app.listen(port, () => {
    console.log(`Сервер запустился на порту ${port}...`);
});