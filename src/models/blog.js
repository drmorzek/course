//подключаем мангуста и устанавливаем схему
const mongo = require("mongoose");
const Schema = mongo.Schema;


//установка модели блога
const blogModel = new Schema ({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        default: 'Empty text'
    },
    content: {
        type: String,
        required: true,
        default: 'Empty text'
    },
});



//экспорт модели
module.exports = mongo.model("Blog", blogModel);