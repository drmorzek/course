//установка модели блога
const blogSchema = {
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
};

//подключаем мангуста и устанавливаем схему
const mongo = require("../config/mongoConfig")();

//экспорт модели
module.exports = () => mongo.model("Blog", new Schema(blogSchema));