import React, { useState, useEffect } from "react";
import { Box, Text, Button, Card, CardBody, Input } from "@chakra-ui/react";
import axiosInstance from "../../axiosInstance";
const { VITE_API } = import.meta.env;
import styles from "./HomePage.module.css";

const HomePage = ({ inputs, setInputs, user }) => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [entries, setEntries] = useState([]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  async function sendHandler(event) {
    // объединить функции в одну
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3100/api/v1/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...inputs, user_id: user.id }),
      });
      const data = await response.json();
      setInputs(() => data);
      setEntries((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get(`${VITE_API}/story`);
        setEntries(() => data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, [inputs]);

  useEffect(() => {
    setTotalPages(Math.ceil(news.length / 12));
  }, [news]);

  function inputsHandler(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function submitHandler(event) {
    event.preventDefault();
    try {
      const searchParams = new URLSearchParams({
        q: `${inputs.goodWord ? inputs.goodWord : ""}${
          inputs.goodWord && inputs.badWord
            ? ` AND -${inputs.badWord}`
            : inputs.badWord
            ? `-${inputs.badWord}`
            : ""
        }`,
        domains: "ria.ru,lenta.ru,yandex.ru,rbc.ru",
        apiKey: "13c73316936a42a5951587a58656f732",
      });
      const response = await fetch(
        `https://newsapi.org/v2/everything?${searchParams}`
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
      .slice((currentPage - 1) * 12, currentPage * 12)
      .map((el, index) => (
        <>
          <Card className={styles.card} key={index}>
            <img
              className={styles.img}
              src={el.urlToImage}
              alt="Картинка новости"
            />
            <CardBody className={styles.cardbody}>
              <a href={el.url}>Подробнее...</a>
            </CardBody>
          </Card>
        </>
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
        <Button
          style={{
            margin: "5px",
            backgroundColor: i === currentPage ? "#2f855a" : "inherit",
            color: i === currentPage ? "white" : "inherit",
          }}
          key={i}
          onClick={() => handlePageChange(i)}
          bg="#2F855A"
          colorScheme="teal"
          _hover={{ color: "#2F855A", bg: "teal.700" }}
          _active={{ bg: "teal.800" }}
          _focus={{ boxShadow: "none" }}
        >
          {i}
        </Button>
      );
    }
    return buttons;
  };

  return (
    <>
    <button onClick={toggleDropdown} className={styles.dropbtn}>
        Топ-5 "хочу видеть"
      </button>
      {isOpen && (
        <div className={styles.dropdownContent}>
          {entries[0]?.length ? (
            entries[0]?.map((el, i ) => <p key={el}>{i+1}. {el}</p>)
          ) : (
            <p>элементов нет</p>
          )}
        </div>
      )}
      <form
        // onSubmit={submitHandler}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "5px",
        }}
      >   

        <Input
          placeholder="Хочу видеть..."
          value={inputs.goodWord}
          onChange={inputsHandler}
          type="text"
          className={styles.goodWord}
          id="goodWord"
          aria-describedby="emailHelp"
          name="goodWord"
        />
        <Input
          placeholder="Не хочу видеть..."
          value={inputs.badWord}
          onChange={inputsHandler}
          type="text"
          className={styles.badWord}
          id="badWord"
          name="badWord"
        />
        <Button
          onClick={(e) => {
            sendHandler(e);
            submitHandler(e);
          }}
          style={{ margin: "5px", width: "150px" }}
          // type="submit"
          bg="#2F855A"
          colorScheme="teal"
          _hover={{ bg: "teal.700" }}
          _active={{ bg: "teal.800" }}
          _focus={{ boxShadow: "none" }}
        >
          Искать
        </Button>
      </form>
      <Box
        textAlign="center"
        py={10}
        px={6}
        bg="#A0AEC0"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {news.length ? (
          <>
            <div className={styles.cards}>{renderNews()}</div>
            <Box mt={4}>{generatePageButtons()}</Box>
            <Button
              style={{ margin: "25px" }}
              bg="#2F855A"
              colorScheme="teal"
              _hover={{ bg: "teal.700" }}
              _active={{ bg: "teal.800" }}
              _focus={{ boxShadow: "none" }}
              onClick={scrollToTop}
            >
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
