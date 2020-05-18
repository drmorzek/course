//подключение библиотек
require("dotenv").config();
const express  = require("express");
const bodyparser = require("body-parser");

//импорт роутов
const blogsRouter = require("./routes/blog");

//установка константы значения порта
const port = process.env.PORT || 3000;

//установка константы сервера
const app = express();

//установки body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

//установки роутов
app.use("/blogs", blogsRouter);

//подключение к БД и запуск сервера на прослушку порта 
require("./config/mongo")()
    .then(()=>{
        app.listen(port, () => {
            console.log(`Сервер запустился на порту ${port}...`);
        });
    });
