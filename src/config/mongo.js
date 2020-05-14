// поключение библиотеки mongoose
const mongo = require('mongoose');

//константа URL монгоБД(если не указан адрес облака, то подключаемся к локальной коллекции test)
const mongoUrl = process.env.DB_CONN || "mongodb://localhost:27017/test";

//параметры мангуста
mongo.set("useNewUrlParser", true);
mongo.set("useNewUrlParser", true);
mongo.set("useUnifiedTopology", true);
mongo.set('useCreateIndex', true)


//экспортируем функцию для работы с коллекциями
module.exports = () => 
    mongo.connect(mongoUrl).then(
      () => {
        console.log("Подключение к MongoDB успешно");
      },
      (err) => {
        console.log(err);
      }
    );
