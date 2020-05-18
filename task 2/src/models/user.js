//подключаем мангуста и устанавливаем схему
const mongo = require("mongoose");
const Schema = mongo.Schema;


//установка модели блога
const userModel = new Schema({
    name: {
        type: String,
        required: true,
        default: 'Empty text'
    },
    age: {
        type: Number,
        required: true,
        default: null
    },
    password: {
        type: String,
        unique: true,
        required: true,
        default: 'Empty text'
    },
    email: {
        type: String,
        unique: true,
        required: true,
        default: 'Empty text'
    },
});



//экспорт модели
module.exports = mongo.model("User", userModel);