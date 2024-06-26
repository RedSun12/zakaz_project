import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Heading } from "@chakra-ui/react";
import React from "react";
import styles from "./StartPage.module.css";
import axiosInstance from "../../axiosInstance";

const { VITE_API } = import.meta.env;
const { VITE_BASE_URL } = import.meta.env;


export default function StartPage({ user }) {
  const [showForm, setShowForm] = useState(null); // 'signin' или 'signup'
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axiosInstance
      .get(`${import.meta.env.VITE_API}/channels`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.error("Ошибка при загрузке данных:", err);
      });
  }, []);

  const handleSigninClick = () => {
    navigate("/signin");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Box textAlign="center" mt="20px">
          <Heading as="h2" size="xl" mb="4" >
            Добро пожаловать в наше приложение!
          </Heading>
          <Heading fontSize="lg">
            Пожалуйста, войдите или зарегистрируйтесь{" "}
          </Heading>
        </Box>
        <Box display="flex" justifyContent="center" mt="20px">
          <Button
            onClick={handleSigninClick}
            colorScheme="teal"
            size="lg"
            m="10px"
          >
            Войти
          </Button>
          <Button
            onClick={handleSignupClick}
            colorScheme="green"
            size="lg"
            m="10px"
          >
            Зарегистрироваться
          </Button>
        </Box>
      </div>
    </>
  );
}
