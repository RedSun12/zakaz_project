import React, { useState } from "react";
import { Box, Text, Button, Card, CardBody } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HomePage = ({ user }) => {
  const [news, setNews] = useState();
  const [inputs, setInputs] = useState({ goodWord: "", badWord: "" });

  function inputsHandler(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(event) {
    // было getNews
    event.preventDefault();
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=%27+${inputs.goodWord}%20AND%20-${inputs.badWord}%27&domains=ria.ru,lenta.ru,yandex.ru,rbc.ru&apiKey=13c73316936a42a5951587a58656f732`
      );
      const { articles } = await response.json();
      setNews(articles);
    } catch (error) {
      console.log(error);
    }   // ! НУЖНО СДЕЛАТЬ ПОИСК С УЧЕТОМ ОКОНЧАНИЙ
  }

  return (
    <>
      <>
        <form onSubmit={submitHandler}>
          <div className="mb-3">
            <input
              placeholder="театр, природа, трусики"
              value={inputs.goodWord}
              onChange={inputsHandler}
              type="text"
              className="htmlForm-control"
              id="goodWord"
              aria-describedby="emailHelp"
              name="goodWord"
              required
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="грязь, обида, мусор"
              value={inputs.badWord}
              onChange={inputsHandler}
              type="text"
              className="htmlForm-control"
              id="badWord"
              name="badWord"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Искать
          </button>
        </form>
      </>
      <Box
        textAlign="center"
        py={10}
        px={6}
        bg="#68D391"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {news?.length ? (
          news?.map((el) => (
            <Card style={{ margin: "20px" }} key={el}>
              <img
                style={{ width: "500px" }}
                src={el.urlToImage}
                alt="Картинка новости"
              />
              <CardBody>
                <Text style={{ color: "black" }}>
                  Источник: {el.source.name}
                </Text>
                <Text style={{ color: "black" }}>Заголовок: {el.title}</Text>
                {el.description ? (
                  <Text style={{ color: "black" }}>
                    Описание новости: {el.description}
                  </Text>
                ) : null}
                <a href={el.url}>Ссылка на новость</a>
              </CardBody>
            </Card>
          ))
        ) : (
          <h1>Новости по таким ключевым словам не найдены</h1>
        )}
      </Box>
    </>
  );
};

export default HomePage;
