const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../../db/models"); // модель юзера наша для авторизаций
const generateToken = require("../utils/generateToken");
const cookiesConfig = require("../configs/cookiesConfig");
const { where } = require("sequelize");

// ^ ПЕРВЫЙ РУТ для Регистрации нового пользователя (POST запроса /signup)
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { username, email, password: await bcrypt.hash(password, 10) },
    });

    if (!created) {
      return res.status(403).json({ message: "User already exists" });
    }

    const plainUser = user.get();
    delete plainUser.password;

    //! Генерируем access и refresh
    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    //! Устанавливаем cookie с access токеном
    res
      .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
      .json({ user: plainUser, accessToken });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
router
  .post("/signin", async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // поиск пользователя по email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: "Incorrect user or password" });
      }

      // ! проверка правильности пароля
      const correctPass = await bcrypt.compare(password, user.password);
      if (!correctPass) {
        return res.status(401).json({ message: "Incorrect user or password" });
      }

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateToken({ user: plainUser });

      res
        .cookie("refreshToken", refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ user: plainUser, accessToken });
    } catch (error) {
      console.log('Ошибка catch в .post("/signin"', error);
      return res.sendStatus(500);
    }
  })
  // ^ ТРЕТИЙ РУТ Выход пользователя (GET запроса /logout):
  // выход + очищение куки с refresh токеном
  // Сервер должен очищать куки в браузере, а клиент должен очищать access токен из переменной.
  .get("/logout", (req, res) => {
    try {
      // Очистка cookie с refreshToken
      res.clearCookie("refreshToken").sendStatus(200);
    } catch (error) {
      console.log('Ошибка в удалении .get("/logout', error);
      return res.sendStatus(500);
    }
  });

module.exports = router;
