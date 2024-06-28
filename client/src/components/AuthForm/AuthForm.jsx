import { useState } from "react";
import axiosInstance, { setAccessToken } from "../../axiosInstance";
import { useNavigate } from "react-router-dom";
import styles from "./AuthForm.module.css";
import {
  Button,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";

const { VITE_API } = import.meta.env;

export default function AuthForm({ title, type, setUser }) {
  const [inputs, setInputs] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [profilePhoto, setProfilePhoto] = useState(null);

  const changeHandler = (e) => {
    if (e.target.name === "profilePhoto") {
      setProfilePhoto(e.target.files[0]);
    } else {
      setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const submitHandler = async (e) => {
    // ^ правка 1: требование о пароле более 8 символов
    e.preventDefault();
    console.log("inputs", inputs);
    if (type === "signup" && inputs.password.length < 3) {
      setError("Пароль должен быть не менее 3 символов");
      return;
    }

    const formData = new FormData();
    Object.keys(inputs).forEach((key) => {
      formData.append(key, inputs[key]);
    });
    console.log("formData", formData);
    if (profilePhoto) {
      formData.append("profilePhoto", profilePhoto);
    }

    try {
      if (type === "signin") {
        const res = await axiosInstance.post(
          `${VITE_API}/auth/${type}`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        navigate("/home"); // ~ ШАБЛОН: Куда тебе нужно направление?  К примеру, "/profile"}
      }

      if (type === "signup") {
        const res = await axiosInstance.post(
          `${VITE_API}/auth/${type}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        setUser(res.data.user);
        setAccessToken(res.data.accessToken);
        navigate("/home"); // ~ ШАБЛОН: Куда тебе нужно направление?  К примеру, "/profile"}
      }
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
              required
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="password"
              name="password"
              value={inputs?.password}
              placeholder="Пароль"
              required
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
              required
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="email"
              name="email"
              value={inputs?.description}
              placeholder="Эл.почта"
              required
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="password"
              name="password"
              value={inputs?.password}
              placeholder="Пароль"
              required
            />
            <Input
              onChange={changeHandler}
              borderColor="#3f3e3e"
              type="file"
              name="profilePhoto"
              accept="image/*"
            />
          </>
        )}
      </div>
      {error && (
        <Alert status="error" className={styles.error}>
          <AlertIcon />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className={styles.btns}>
        <Button style={{marginRight:'10px'}}onClick={() => navigate("/")} colorScheme="green">
          На главную
        </Button>
        {type === "signin" && (
          <Button type="submit" colorScheme="green">
            Вход
          </Button>
        )}
        {type === "signup" && (
          <Button type="submit" colorScheme="green">
            Регистрация
          </Button>
        )}
      </div>
    </form>
  );
}
