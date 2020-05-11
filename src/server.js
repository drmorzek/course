//подключение библиотек
require("dotenv").config();
const express  = require("express");
const bodyparser = require("body-parser");

//експорт роутов
const blogsRouter = require("./routes/blogRouter");

//установка константы значения порта
const port = process.env.PORT || 3000;

//установка константы сервера
const app = express();

//установки body-parser
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

app.use("/blog", blogsRouter);



//запуск сервера на прослушку порта 
app.listen(port, () => {
    console.log(`Сервер запустился на порту ${port}...`);
});