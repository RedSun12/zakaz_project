import React, { useState } from "react";
import Story from "../Story/Story";
import {
  Box,
  Text,
  Heading,
  VStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import axiosInstance from "../../axiosInstance";
import VantaRingsBackground from "../../components/Vanta/Vanta";

const ProfilePage_skeleton = ({ user, setUser }) => {
  // console.log("user from ProfilePage_skeleton", user);


  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    password: "",
    profilePhoto: null,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "profilePhoto") {
      setFormData({ ...formData, profilePhoto: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataObj = new FormData(); // подходит для файловых загрузок
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      if (formData.password) {
        formDataObj.append("password", formData.password);
      }
      if (formData.profilePhoto) {
        formDataObj.append("profilePhoto", formData.profilePhoto);
      }

      // ~ ОБРАБОТКА СОСТОЯНИЙ
      console.log("🟢FormData being sent:", {
        username: formData.username,
        email: formData.email,
        password: formData.password ? "****" : "(not changed)",
        profilePhoto: formData.profilePhoto ? formData.profilePhoto.name : "(not changed)",
      });


      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API}/profile/users/${user.id}`,
        // `http://localhost:3100/api/v1/profile/users/${user.id}`,
        formDataObj,
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // передача нового токена в заголовках
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("🟢Response from server:", res.data);

      // setUser(() => res.data.user);
      // setUser((prevUser) => ({ ...prevUser, ...res.data.user }));.........
      setUser((prevUser) => ({
        ...prevUser,
        ...res.data.user,
        profilePhoto: res.data.profilePhoto,
      }));
      // setFormData(() => res.data.profilePhoto); // ! важны колбеки в стейте для очереди
      setIsEditing(false); // закрытие модального окна
    } catch (error) {
      setError("Ошибка обновления профиля");
      console.error("Ошибка обновления профиля:", error);
    }
  };
  
  console.log("🟢Updated user state in component:", user);
  
  return (
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
      <Story user={user} />
      <VStack spacing={6} color="white">
        <Heading as="h1" size="xl">
          Приветствуем Вас, {user.username}!
        </Heading>
        <Text fontSize="lg">
          Эта страница отображает данные о Вас. Она будет пополняться.
        </Text>
        <Text fontSize="lg">💚 Ваше имя: {user.username}</Text>
        <Text fontSize="lg">💚 Ваша электронная почта: {user.email}</Text>
        <Text fontSize="lg">💚 Дата регистрации: {user.createdAt}</Text>
        <Text fontSize="lg"> Эта страница будет пополняться...</Text>
        <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
          Редактировать профиль
        </Button>
      </VStack>

      <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Редактировать профиль</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <ModalBody>
              <Input
                placeholder="Имя пользователя"
                name="username"
                value={formData.username}
                onChange={handleChange}
                mb={3}
              />
              <Input
                placeholder="Эл.почта"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                mb={3}
              />
              <Input
                placeholder="Новый пароль"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                mb={3}
              />
              <Input
                type="file"
                name="profilePhoto"
                onChange={handleChange}
                mb={3}
              />
            </ModalBody>
            {error && (
              <Alert status="error">
                <AlertIcon />
                <AlertTitle>Ошибка</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit">
                Сохранить
              </Button>
              <Button variant="ghost" onClick={() => setIsEditing(false)}>
                Отмена
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProfilePage_skeleton;