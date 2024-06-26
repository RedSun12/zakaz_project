import axiosInstance, { setAccessToken } from "../../axiosInstance";
import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";
import {
  Flex,
  Spacer,
  Heading,
  ButtonGroup,
  Button,
  Box,
} from "@chakra-ui/react";

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
      bg="#68D391"
      boxShadow="md"
    >
      <ButtonGroup spacing="2">
        {user?.username && (
          <>
            <Button
              as={Link}
              to="/home"
              bg="#2F855A"
              colorScheme="teal"
              _hover={{ color: "#2F855A", bg: "teal.700" }}
              _active={{ bg: "teal.800" }}
              _focus={{ boxShadow: "none" }}
            >
              Home (или будущая страница Новостей)
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
              _hover={{ color: "#2F855A", bg: "teal.700" }}
              _active={{ bg: "teal.800" }}
              _focus={{ boxShadow: "none" }}
            >
              Профиль
            </Button>
            <Button
              as={Link}
              to="/"
              colorScheme="teal"
              _hover={{ color: "#2F855A", bg: "teal.700" }}
              _active={{ bg: "teal.800" }}
              _focus={{ boxShadow: "none" }}
              onClick={logoutHandler}
            >
              Выйти
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup spacing="2">
            <Button as={Link} to="/signin" colorScheme="teal">
              Войти
            </Button>
            <Button as={Link} to="/signup" colorScheme="teal">
              Регистрация
            </Button>
          </ButtonGroup>
        )}
      </Box>
    </Flex>
  );
}

//   return (
//     <div className={styles.wrapper}>
//       <div className={styles.left}>
//         <Link to='/'>На стартовую страницу</Link>
//       </div>
//       <div className={styles.right}>
//         {user?.username ? (
//           <>
//             {/* <Link to="/channels">Каналы</Link>  // ~ ШАБЛОН: добавь свои ссылки на страницы */}
//            {/* <Link to="/subscriptions">Подписки</Link>  // ~ ШАБЛОН: добавь свои ссылки на страницы */}
//             <Link to='/profile'>Профиль</Link>
//             <Link onClick={logoutHandler}>Выйти</Link>
//           </>
//         ) : (
//           <>
//            {/* <Link to="/channels">Каналы (Общая страница)</Link> */}
//             <Link to='/signin'>Войти</Link>
//             <Link to='/signup'>Регистрация</Link>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
