import React, { useState } from "react";
import { Box, Text, Button, Card, CardBody } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HomePage = ({ user }) => {
  const [news, setNews] = useState([]);
  const [inputs, setInputs] = useState({ goodWord: "", badWord: "" });
  // const goodWord = "авто";
  // const badWord = "настроение";

  function inputsHandler(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(event) {
    // было getNews
    event.preventDefault();
    try {
      const response = await fetch(
        "https://newsapi.org/v2/everything?q=tesla&from=2024-05-26&sortBy=publishedAt&apiKey=e70344a657e448dda752d8e0b26cde17"
      );
      const { articles } = await response.json();
      setNews((pre) => ({ ...pre, articles }));
      const allNews = news.articles;
      const goodfilterNews = allNews.filter((article) =>
        article.description
          .split(" ")
          .some((word) => word.toLowerCase().includes(inputs.goodWord.toLowerCase()))
      );
      console.log(goodfilterNews);
      const filterNews = goodfilterNews.filter((article) =>
        article.description
          .split(" ")
          .some(
            (word) => !word.toLowerCase().includes(inputs.badWord.toLocaleLowerCase())
          )
      );
      console.log(filterNews);
      setNews(filterNews);
    } catch (error) {
      console.log(error);
    }
  }

  // async function getNews() {
  //   try {
  //     const response = await fetch(
  //       "https://newsapi.org/v2/everything?q=tesla&from=2024-05-26&sortBy=publishedAt&apiKey=e70344a657e448dda752d8e0b26cde17"
  //     );
  //     const { articles } = await response.json();
  //     setNews((pre) => ({ ...pre, articles }));
  //     const allNews = news.articles;
  //     const goodfilterNews = allNews.filter((article) =>
  //       article.description
  //         .split(" ")
  //         .some((word) => word.toLowerCase().includes(goodWord.toLowerCase()))
  //     );
  //     console.log(goodfilterNews);
  //     const filterNews = goodfilterNews.filter((article) =>
  //       article.description
  //         .split(" ")
  //         .some(
  //           (word) => !word.toLowerCase().includes(badWord.toLocaleLowerCase())
  //         )
  //     );
  //     console.log(filterNews);
  //     setNews(filterNews);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

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
        {/* <Button onClick={getNews}>Биба</Button> */}
        {news?.length ? (
          news?.map((el) => (
            <Card style={{ margin: "20px" }} key={el}>
              <img
                style={{ width: "500px" }}
                src={el.urlToImage}
                alt="фоточка для красоточки"
              />
              <CardBody>
                <Text style={{ color: "black" }}>
                  Источник: {el.source.name}
                </Text>
                <Text style={{ color: "black" }}>Заголовок: {el.title}</Text>
                <Text style={{ color: "black" }}>
                  Описание новости: {el.description}
                </Text>
                <a href={el.url}>Ссылочка</a>
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
