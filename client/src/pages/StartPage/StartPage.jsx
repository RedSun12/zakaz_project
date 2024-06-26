import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Heading, Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./StartPage.module.css";
import axiosInstance from "../../axiosInstance";

const { VITE_API } = import.meta.env;
const { VITE_BASE_URL } = import.meta.env;


export default function StartPage({ user }) {
  const [showForm, setShowForm] = useState(null); // 'signin' или 'signup'
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [news, setNews] = useState([])

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

  async function getNews() {
    try {
      const response = await fetch('https://newsapi.org/v2/everything?q=tesla&from=2024-05-26&sortBy=publishedAt&apiKey=e70344a657e448dda752d8e0b26cde17')
      // * JSON.parse(data)  //  await response.json()
      const { articles } = await response.json()
      console.log("message:", articles)
      setNews((pre) => ({...pre, articles }))
    } catch (error) {
      console.log(error)
    }
  }

//   const pathAPI = fetch('https://newsdata.io/api/1/latest?country=ru&apikey=pub_473781911d39cd73e580a55047cd14fc9f476')
// .then(response => response.json())
// .then(data => console.log(data));

  const handleSigninClick = () => {
    navigate("/signin");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  console.log('я тут', news)

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
        <Button onClick={getNews}>
          Биба
        </Button>
        {news?.articles?.length ? (
          news?.articles?.map((el) => (
            <Card style={{ margin: "20px" }} key={el}>
              <img style={{ width: "500px" }} src={el.urlToImage} alt="фоточка для красоточки" />
              <CardBody>
                <Text style={{ color: "black" }}>
                  Источник: {el.source.name}
                </Text>
                <Text style={{ color: "black" }}>
                  Заголовок: {el.title}
                </Text>
                <Text style={{ color: "black" }}>
                  Описание новости: {el.description}
                </Text>
                <a href = {el.url}>Ссылочка</a>
              </CardBody>
            </Card>
          ))
        ) : (
          <h1>Публичных резюме нет</h1>
        )}

        {/* <a rel="alternate" type="application/rss+xml" href="https://www.gazeta.ru/export/rss/first.xml" title="Gazeta.ru">Cptn Jazz</a> */}
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
