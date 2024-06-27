import React, { useState, useEffect } from "react";
import { Box, Text, Button, Card, CardBody } from "@chakra-ui/react";

const HomePage = ({ inputs, setInputs }) => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setTotalPages(Math.ceil(news.length / 5));
  }, [news]);

  function inputsHandler(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=%27+${inputs.goodWord}%20AND%20-${inputs.badWord}%27&domains=ria.ru,lenta.ru,yandex.ru,rbc.ru&apiKey=13c73316936a42a5951587a58656f732`
      );
      const { articles } = await response.json();
      setNews(articles);
      setCurrentPage(1);
    } catch (error) {
      console.log(error);
    }
  }

  const renderNews = () => {
    return news
      .slice((currentPage - 1) * 5, currentPage * 5)
      .map((el, index) => (
        <Card style={{ margin: "20px" }} key={index}>
          <img
            style={{ width: "500px" }}
            src={el.urlToImage}
            alt="Картинка новости"
          />
          <CardBody>
            <Text style={{ color: "black" }}>Источник: {el.source.name}</Text>
            <Text style={{ color: "black" }}>Заголовок: {el.title}</Text>
            {el.description && (
              <Text style={{ color: "black" }}>
                Описание новости: {el.description}
              </Text>
            )}
            <a href={el.url}>Посмотреть в источнике...</a>
          </CardBody>
        </Card>
      ));
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const generatePageButtons = () => {
    let buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button style={{margin:'5px'}} key={i} onClick={() => handlePageChange(i)}>
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <input
            placeholder="Напишите здесь тему, по которой хотите видеть новости"
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
            placeholder="А здесь, по которой не хотите"
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
        {news.length ? (
          <>
            {renderNews()}
            <Box mt={4}>{generatePageButtons()}</Box>
            <Button mt={4} onClick={scrollToTop}>
              Наверх
            </Button>
          </>
        ) : (
          <h1>Новости по таким ключевым словам не найдены</h1>
        )}
      </Box>
    </>
  );
};

export default HomePage;
