import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Box, Heading, Card, CardBody, Text } from "@chakra-ui/react";
import React from "react";
import styles from "./StartPage.module.css";
import axiosInstance from "../../axiosInstance";
import VantaRingsBackground from "../../components/Vanta/Vanta";

const { VITE_API } = import.meta.env;
const { VITE_BASE_URL } = import.meta.env;


export default function StartPage({ user }) {
  const navigate = useNavigate();
  const handleSigninClick = () => {
    navigate("/signin");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };
  

  return (
    <>
      <Box display="fixed" width="100%" top={0} left={0} >
        <VantaRingsBackground className={styles.vanta} />
      </Box>
      <div className={styles.wrapper}>
        <Box textAlign="center" mt="20px">
          <Heading as="h2" size="xl" mb="4" style={{fontSize:'80px'}} >
            ELBRUS NEWS
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
