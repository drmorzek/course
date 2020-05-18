//подключение библиотеки редиски
const redis = require("async-redis");

//параметры клиента
const redis_params = {
  // host: process.env.REDIS_HOST || "localhost",
  // port: process.env.REDIS_PORT || 6379,
  // password: process.env.REDIS_PASSWORD || "",
  url: process.env.REDIS_URL || "redis://localhost:6379",
  detect_buffers: false
};

//создание клиента редиски
const client = redis.createClient(redis_params);

client.on("error", function (error) {
  console.error("Ошибка подключения к Redis ",error);
});

client.on("connect", function () {
  console.log("Подключение к Redis успешно");
});

//экспорт клиента
module.exports = client;