import { useState } from "react";
import axiosInstance, { setAccessToken } from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";
import { Button, Input } from "@chakra-ui/react";

const { VITE_API } = import.meta.env;

export default function AuthForm({ title, type = "signin", setUser }) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`${VITE_API}/auth/${type}`, inputs);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      navigate("/home");// ~ ШАБЛОН: Куда тебе нужно направление?  К примеру, "/profile"
    } catch (error) {
      setError(
        "Авторизация не завершена. Пожалуйста, проверьте свои учетные данные"
      );
      console.error(error);
    }
  };

  return (
<form onSubmit={submitHandler} className={styles.wrapper}>
      <h3 className={styles.head}>{title}</h3>
      <div className={styles.inputs}>
        {type === "signin" && (
          <>
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="email"
              name="email"
              value={inputs?.email}
              placeholder="Эл.почта"
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="password"
              name="password"
              value={inputs?.password}
              placeholder="Пароль"
            />
          </>
        )}
        {type === "signup" && (
          <>
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              name="username"
              value={inputs?.name}
              placeholder="Имя пользователя"
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="email"
              name="email"
              value={inputs?.description}
              placeholder="Эл.почта"
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="password"
              name="password"
              value={inputs?.password}
              placeholder="Пароль"
            />
          </>
        )}
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.btns}>
        {type === "signin" && (
          <Button type="submit" colorScheme="blue">
            Вход
          </Button>
        )}
        {type === "signup" && (
          <Button type="submit" colorScheme="blue">
            Регистрация
          </Button>
        )}
      </div>
    </form>
  );
}
