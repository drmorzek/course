// поключение библиотеки mongoose
const mongo = require('mongoose');


//параметры мангуста
mongo.set("useNewUrlParser", true);
mongo.set("useNewUrlParser", true);
mongo.set("useUnifiedTopology", true);
mongo.set('useCreateIndex', true)


//экспортируем функцию для работы с коллекциями
module.exports = () => {
    mongo.connect(process.env.MONGO_URI).then(
      () => {
        console.log("Соединение с базой успешно");
      },
      (err) => {
        console.log(err);
      }
    );
};