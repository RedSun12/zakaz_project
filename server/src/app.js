require("dotenv").config(); // настройка переменных окружения .env

const cors = require("cors"); // для обработки запросов CORS
const apiRouter = require("./routers/api.router");
const cookieParser = require("cookie-parser"); // достает данные из http-запроса и отдает нам в виде объекта req.cookies
const morgan = require("morgan"); // для логирования запросов и отладки в терминале

const express = require("express"); // подключаем сам модуль Экспресса для создания тут

const app = express(); // создаем наш экземпляр приложения
const { PORT } = process.env;

// const corsConfig = {
//   origin: ["http://localhost:5173"], // разрешаем запросы с этого http-адреса
//   credentials: true, // разрешаем передачу кукис
// };

// ^ пробую решить проблем с путом
const corsConfig = {
  origin: ["http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(morgan("dev")); //  подкл. мидлварку morgan с настройкой 'dev' (в консоль удобная отладка)
app.use(cookieParser()); // подкл. мидлварку cookieParser для обработки кук из запросов.
app.use(express.urlencoded({ extended: true })); // подкл. мидлварку: позволяет читать URL-encoded формат key1=value1&key2=value2,
// где ключ=значение => {key1: 'value1', key2: 'value2'} будет у нас в req.body
app.use(express.json()); // подкл. мидлварку = позволяет нам получать тело запроса в формате JSON
app.use(cors(corsConfig));

// http://localhost:5173/api/v1/profile   
// http://localhost:3100/api/v1/profile   

app.use(express.static('uploads')); // ! для загрузки фото и малтера, важно подключать через статичную папку


app.use("/api/v1", apiRouter);

app.listen(PORT, () => {
  console.log(`Server started at ${PORT} port`);
});
