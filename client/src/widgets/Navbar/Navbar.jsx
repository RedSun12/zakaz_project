import axiosInstance, { setAccessToken } from "../../axiosInstance";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import { Flex, Spacer, ButtonGroup, Button, Box } from "@chakra-ui/react";

export default function Navbar({ user, setUser }) {
  const logoutHandler = async () => {
    const res = await axiosInstance(`${import.meta.env.VITE_API}/auth/logout`);

    if (res.status === 200) {
      setUser(null);
      setAccessToken("");
    }
  };

  return (
    <Flex
      as="nav"
      className={styles.wrapper}
      alignItems="center"
      p={4}
      bg="#CBD5E0"
      boxShadow="md"
    >
      <ButtonGroup spacing="2">
        {user?.username && (
          <>
            <Button
              className={styles.btnNav}
              as={Link}
              to="/home"
              bg="#2F855A"
              colorScheme="teal"
              _hover={{ bg: "teal.700" }}
              _active={{ bg: "teal.800" }}
              _focus={{ boxShadow: "none" }}
              sx={{
                "@media screen and (max-width: 500px)": {
                  fontSize: "sm",
                  padding: "8px",
                },
                "@media screen and (min-width: 501px)": {
                  fontSize: "lg",
                  padding: "16px",
                },
              }}
            >
              Новости
            </Button>
          </>
        )}
      </ButtonGroup>
      <Spacer />
      <Box>
        {user?.username ? (
          <ButtonGroup>
            <Button
              as={Link}
              to="/profile"
              bg="#2F855A"
              colorScheme="teal"
              _hover={{ bg: "teal.700" }}
              _active={{ bg: "teal.800" }}
              _focus={{ boxShadow: "none" }}
              sx={{
                "@media screen and (max-width: 500px)": {
                  fontSize: "sm",
                  padding: "8px",
                },
                "@media screen and (min-width: 501px)": {
                  fontSize: "lg",
                  padding: "16px",
                },
              }}
            >
              Профиль
            </Button>
            <Button
              as={Link}
              to="/"
              colorScheme="teal"
              _hover={{ bg: "teal.700" }}
              _active={{ bg: "teal.800" }}
              _focus={{ boxShadow: "none" }}
              onClick={logoutHandler}
              sx={{
                "@media screen and (max-width: 500px)": {
                  fontSize: "sm",
                  padding: "8px",
                },
                "@media screen and (min-width: 501px)": {
                  fontSize: "lg",
                  padding: "16px",
                },
              }}
            >
              Выйти
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup spacing="2">
            <Button
              as={Link}
              to="/signin"
              colorScheme="teal"
              sx={{
                "@media screen and (max-width: 500px)": {
                  fontSize: "sm",
                  padding: "8px",
                },
                "@media screen and (min-width: 501px)": {
                  fontSize: "lg",
                  padding: "16px",
                },
              }}
            >
              Войти
            </Button>
            <Button
              as={Link}
              to="/signup"
              colorScheme="teal"
              sx={{
                "@media screen and (max-width: 500px)": {
                  fontSize: "sm",
                  padding: "8px",
                },
                "@media screen and (min-width: 501px)": {
                  fontSize: "lg",
                  padding: "16px",
                },
              }}
            >
              Регистрация
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Flex>
  );
}
