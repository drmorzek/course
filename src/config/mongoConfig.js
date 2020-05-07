// поключение библиотеки mongoose
const mongo = require('mongoose');

//URL базы данных
const url = process.env.MONGO_URI;

//параметры мангуста
const params = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

//подключение к БД
mongo
    .connect(
        url,
        params
    )
    .then(
        () => {
            console.log("Соединение с базой успешно");
        },
        (err) => {
            console.log(err);
        }
    );

// константа для работы со схемами
const Schema = mongo.Schema;


//экспортируем функцию для работы с коллекциями
exports.model = (name, schema) => {
    return mongo.model(name, new Schema(schema));
};