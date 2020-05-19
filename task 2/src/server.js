//подключение библиотек
require("dotenv").config();
const express  = require("express");
const bodyparser = require("body-parser");

const upload = require('./helpers/multer');

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
app.post('/file', upload("../uploads"), function (req, res, next) {
    next();
});

//подключение к БД и запуск сервера на прослушку порта 
require("./helpers/mongo")()
    .then(()=>{
        app.listen(port, () => {
            console.log(`Сервер запустился на порту ${port}...`);
        });
    });
