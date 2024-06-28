import React, { useState, useEffect } from "react";
import Story from "../Story/Story";
import {
  Box,
  Text,
  Heading,
  VStack,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Image,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Drawer,
  DrawerBody,
  RadioGroup,
  Stack,
  Radio,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axiosInstance from "../../axiosInstance";
import VantaRingsBackground from "../../components/Vanta/Vanta";

const ProfilePage_skeleton = ({ user, setUser }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username,
    email: user?.email,
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
      const formDataObj = new FormData();
      formDataObj.append("username", formData.username);
      formDataObj.append("email", formData.email);
      if (formData.password) {
        formDataObj.append("password", formData.password);
      }
      if (formData.profilePhoto) {
        formDataObj.append("profilePhoto", formData.profilePhoto);
      }

      const res = await axiosInstance.put(
        `${import.meta.env.VITE_API}/profile/users/${user.id}`,
        formDataObj,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setUser((prevUser) => ({
        ...prevUser,
        ...res.data.user,
        profilePhoto: res.data.profilePhoto,
      }));
      setIsEditing(false);
    } catch (error) {
      setError("Ошибка обновления профиля");
      console.error("Ошибка обновления профиля:", error);
    }
  };

  return (
    <Box
      textAlign="center"
      py={10}
      px={6}
      bg="#A0AEC0"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <VStack spacing={6} color="white" w="full">
        <Heading as="h1" size="xl">
          Приветствуем Вас, {user.username}!
        </Heading>
        <HStack w="full" justifyContent="space-around">
          <VStack spacing={3} alignItems="flex-start">
            <Text fontSize="lg">💚 Ваше имя: {user.username}</Text>
            <Text fontSize="lg">💚 Ваша электронная почта: {user.email}</Text>

            <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
              Редактировать профиль
            </Button>
            <Story user={user} />
          </VStack>
          {user.profilePhoto && (
            <Image
              boxSize="150px"
              borderRadius="full"
              src={`http://localhost:3100${user.profilePhoto}`}
              alt="Profile Photo"
            />
          )}
        </HStack>
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
