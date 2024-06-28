// import React, { useState } from "react";
// import Story from "../Story/Story";
// import {
//   Box,
//   Text,
//   Heading,
//   VStack,
//   HStack,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Image,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
// } from "@chakra-ui/react";
// import axiosInstance from "../../axiosInstance";

// const ProfilePage_skeleton = ({ user, setUser }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     username: user.username,
//     email: user.email,
//     password: "",
//     profilePhoto: null,
//   });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     if (e.target.name === "profilePhoto") {
//       setFormData({ ...formData, profilePhoto: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataObj = new FormData(); // подходит для файловых загрузок
//       formDataObj.append("username", formData.username);
//       formDataObj.append("email", formData.email);
//       if (formData.password) {
//         formDataObj.append("password", formData.password);
//       }
//       if (formData.profilePhoto) {
//         formDataObj.append("profilePhoto", formData.profilePhoto);
//       }

//       // console.log("🟢FormData being sent:", {
//       //   username: formData.username,
//       //   email: formData.email,
//       //   password: formData.password ? "****" : "(not changed)",
//       //   profilePhoto: formData.profilePhoto ? formData.profilePhoto.name : "(not changed)",
//       // });

//       const res = await axiosInstance.put(
//         `${import.meta.env.VITE_API}/profile/users/${user.id}`,
//         // `http://localhost:3100/api/v1/profile/users/${user.id}`,
//         formDataObj,
//         {
//           headers: {
//             // Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // передача нового токена в заголовках
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       // ! важны колбеки в стейте для очереди
//       setUser((prevUser) => ({
//         ...prevUser,
//         ...res.data.user,
//         profilePhoto: res.data.profilePhoto,
//       }));
//       setIsEditing(false); // закрытие модального окна
//     } catch (error) {
//       setError("Ошибка обновления профиля");
//       console.error("Ошибка обновления профиля:", error);
//     }
//   };

//   console.log("🟢Updated user state in component:", user);

//   return (
//     <Box
//       textAlign="center"
//       py={10}
//       px={6}
//       bg="#A0AEC0"
//       minHeight="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="center"
//       alignItems="center"
//     >
//       <Story  color="white" user={user} />
//       <VStack spacing={6} color="white">
//         <Heading as="h1" size="xl">
//           Приветствуем Вас, {user.username}!
//         </Heading>
//         <Text fontSize="lg">
//           Эта страница отображает данные о Вас. Она будет пополняться.
//         </Text>

//         <HStack w="full" justifyContent="space-around">
//           <VStack spacing={3} alignItems="flex-start">
//             <Text fontSize="lg">💚 Ваше имя: {user.username}</Text>
//             <Text fontSize="lg">💚 Ваша электронная почта: {user.email}</Text>
//             <Text fontSize="lg">💚 Дата регистрации: {user.createdAt}</Text>
//             <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
//               Редактировать профиль
//             </Button>
//           </VStack>
//           {user.profilePhoto && (
//             <Image
//               boxSize="150px"
//               borderRadius="full"
//               src={`http://localhost:3100${user.profilePhoto}`}
//               alt="Profile Photo"
//             />
//           )}
//         </HStack>
//       </VStack>

//       <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Редактировать профиль</ModalHeader>
//           <ModalCloseButton />
//           <form onSubmit={handleSubmit} enctype="multipart/form-data">
//             <ModalBody>
//               <Input
//                 placeholder="Имя пользователя"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Эл.почта"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Новый пароль"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 type="file"
//                 name="profilePhoto"
//                 onChange={handleChange}
//                 mb={3}
//               />
//             </ModalBody>
//             {error && (
//               <Alert status="error">
//                 <AlertIcon />
//                 <AlertTitle>Ошибка</AlertTitle>
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <ModalFooter>
//               <Button colorScheme="blue" mr={3} type="submit">
//                 Сохранить
//               </Button>
//               <Button variant="ghost" onClick={() => setIsEditing(false)}>
//                 Отмена
//               </Button>
//             </ModalFooter>
//           </form>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default ProfilePage_skeleton;

// ! ВТОРОЙ ВАРИАНТ:

// import React, { useState } from "react";
// import Story from "../Story/Story";
// import {
//   Box,
//   Text,
//   Heading,
//   VStack,
//   HStack,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Image,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
// } from "@chakra-ui/react";
// import axiosInstance from "../../axiosInstance";

// const ProfilePage_skeleton = ({ user, setUser }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     username: user.username,
//     email: user.email,
//     password: "",
//     profilePhoto: null,
//   });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     if (e.target.name === "profilePhoto") {
//       setFormData({ ...formData, profilePhoto: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataObj = new FormData();
//       formDataObj.append("username", formData.username);
//       formDataObj.append("email", formData.email);
//       if (formData.password) {
//         formDataObj.append("password", formData.password);
//       }
//       if (formData.profilePhoto) {
//         formDataObj.append("profilePhoto", formData.profilePhoto);
//       }

//       const res = await axiosInstance.put(
//         `${import.meta.env.VITE_API}/profile/users/${user.id}`,
//         formDataObj,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setUser((prevUser) => ({
//         ...prevUser,
//         ...res.data.user,
//         profilePhoto: res.data.profilePhoto,
//       }));
//       setIsEditing(false);
//     } catch (error) {
//       setError("Ошибка обновления профиля");
//       console.error("Ошибка обновления профиля:", error);
//     }
//   };

//   console.log("🟢Updated user state in component:", user);

//   return (
//     <Box
//       textAlign="center"
//       py={10}
//       px={6}
//       bg="#A0AEC0"
//       minHeight="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="flex-start"
//       alignItems="center"
//     >
//       <VStack spacing={6} color="white" w="full">
//         <Heading as="h1" size="xl">
//           Приветствуем Вас, {user.username}!
//         </Heading>
//         <Text fontSize="lg">
//          История ваших поисков:
//         </Text>
//         <Story user={user} />
//         <HStack w="full" justifyContent="space-around">
//           <VStack spacing={3} alignItems="flex-start">
//             <Text fontSize="lg">💚 Ваше имя: {user.username}</Text>
//             <Text fontSize="lg">💚 Ваша электронная почта: {user.email}</Text>
//             <Text fontSize="lg">💚 Дата регистрации: {user.createdAt}</Text>
//             <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
//               Редактировать профиль
//             </Button>
//           </VStack>
//           {user.profilePhoto && (
//             <Image
//               boxSize="150px"
//               borderRadius="full"
//               src={`http://localhost:3100${user.profilePhoto}`}
//               alt="Profile Photo"
//             />
//           )}
//         </HStack>
//       </VStack>

//       <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Редактировать профиль</ModalHeader>
//           <ModalCloseButton />
//           <form onSubmit={handleSubmit} enctype="multipart/form-data">
//             <ModalBody>
//               <Input
//                 placeholder="Имя пользователя"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Эл.почта"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Новый пароль"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 type="file"
//                 name="profilePhoto"
//                 onChange={handleChange}
//                 mb={3}
//               />
//             </ModalBody>
//             {error && (
//               <Alert status="error">
//                 <AlertIcon />
//                 <AlertTitle>Ошибка</AlertTitle>
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <ModalFooter>
//               <Button colorScheme="blue" mr={3} type="submit">
//                 Сохранить
//               </Button>
//               <Button variant="ghost" onClick={() => setIsEditing(false)}>
//                 Отмена
//               </Button>
//             </ModalFooter>
//           </form>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default ProfilePage_skeleton;

// ! ТРЕТИЙ ВАРИАНТ:
// import React, { useState } from "react";
// import Story from "../Story/Story";
// import {
//   Box,
//   Text,
//   Heading,
//   VStack,
//   HStack,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Image,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
// } from "@chakra-ui/react";
// import axiosInstance from "../../axiosInstance";

// const ProfilePage_skeleton = ({ user, setUser }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     username: user.username,
//     email: user.email,
//     password: "",
//     profilePhoto: null,
//   });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     if (e.target.name === "profilePhoto") {
//       setFormData({ ...formData, profilePhoto: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataObj = new FormData();
//       formDataObj.append("username", formData.username);
//       formDataObj.append("email", formData.email);
//       if (formData.password) {
//         formDataObj.append("password", formData.password);
//       }
//       if (formData.profilePhoto) {
//         formDataObj.append("profilePhoto", formData.profilePhoto);
//       }

//       const res = await axiosInstance.put(
//         `${import.meta.env.VITE_API}/profile/users/${user.id}`,
//         formDataObj,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setUser((prevUser) => ({
//         ...prevUser,
//         ...res.data.user,
//         profilePhoto: res.data.profilePhoto,
//       }));
//       setIsEditing(false);
//     } catch (error) {
//       setError("Ошибка обновления профиля");
//       console.error("Ошибка обновления профиля:", error);
//     }
//   };

//   console.log("🟢Updated user state in component:", user);

//   return (
//     <Box
//       textAlign="center"
//       py={10}
//       px={6}
//       bg="#A0AEC0"
//       minHeight="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="flex-start"
//       alignItems="center"
//     >
//       <VStack spacing={6} color="white" w="full">
//         <Heading as="h1" size="2xl">
//           Приветствуем Вас, {user.username}!
//         </Heading>
//         <Text fontSize="xl">
//           История ваших поисков:
//         </Text>
//         <Story user={user} />
//         <hr />
//         <HStack w="full" justifyContent="space-around">
//           <VStack spacing={3} alignItems="flex-start">
//             <Text fontSize="lg">💚 Ваше имя: {user.username}</Text>
//             <Text fontSize="lg">💚 Ваша электронная почта: {user.email}</Text>
//             <Text fontSize="lg">💚 Дата регистрации: {user.createdAt}</Text>
//             <Button colorScheme="blue"           style={{ margin: "5px", width: "250px" }}
//           // type="submit"
//           bg="#2F855A"
//           colorScheme="teal"
//           _hover={{ bg: "teal.700" }}
//           _active={{ bg: "teal.800" }}
//           _focus={{ boxShadow: "none" }} onClick={() => setIsEditing(true)}>
//               Редактировать профиль
//             </Button>
//           </VStack>
//           {user.profilePhoto && (
//             <Image
//               boxSize="150px"
//               borderRadius="full"
//               src={`http://localhost:3100${user.profilePhoto}`}
//               alt="Profile Photo"
//             />
//           )}
//         </HStack>
//       </VStack>

//       <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Редактировать профиль</ModalHeader>
//           <ModalCloseButton />
//           <form onSubmit={handleSubmit} enctype="multipart/form-data">
//             <ModalBody>
//               <Input
//                 placeholder="Имя пользователя"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Эл.почта"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Новый пароль"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 type="file"
//                 name="profilePhoto"
//                 onChange={handleChange}
//                 mb={3}
//               />
//             </ModalBody>
//             {error && (
//               <Alert status="error">
//                 <AlertIcon />
//                 <AlertTitle>Ошибка</AlertTitle>
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <ModalFooter>
//               <Button colorScheme="blue" mr={3} type="submit">
//                 Сохранить
//               </Button>
//               <Button variant="ghost" onClick={() => setIsEditing(false)}>
//                 Отмена
//               </Button>
//             </ModalFooter>
//           </form>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default ProfilePage_skeleton;

// ! ЧЕТВЕРТЫЙ ВАРИАНТ:

// import React, { useEffect, useState } from "react";
// import Story from "../Story/Story";
// import {
//   Box,
//   Text,
//   Heading,
//   VStack,
//   HStack,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   Input,
//   Image,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { motion } from "framer-motion";
// import axiosInstance from "../../axiosInstance";

// const ProfilePage_skeleton = ({ user, setUser }) => {
//   console.log("user", user);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     username: user?.username,
//     email: user?.email,
//     password: "",
//     profilePhoto: null,
//   });
//   const [error, setError] = useState(null);

//   const handleChange = (e) => {
//     if (e.target.name === "profilePhoto") {
//       setFormData({ ...formData, profilePhoto: e.target.files[0] });
//     } else {
//       setFormData({ ...formData, [e.target.name]: e.target.value });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formDataObj = new FormData();
//       formDataObj.append("username", formData.username);
//       formDataObj.append("email", formData.email);
//       if (formData.password) {
//         formDataObj.append("password", formData.password);
//       }
//       if (formData.profilePhoto) {
//         formDataObj.append("profilePhoto", formData.profilePhoto);
//       }

//       const res = await axiosInstance.put(
//         `${import.meta.env.VITE_API}/profile/users/${user.id}`,
//         formDataObj,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setUser((prevUser) => ({
//         ...prevUser,
//         ...res.data.user,
//         profilePhoto: res.data.profilePhoto,
//       }));
//       setIsEditing(false);
//     } catch (error) {
//       setError("Ошибка обновления профиля");
//       console.error("Ошибка обновления профиля:", error);
//     }
//   };

//   return (
//     // isLoading && (
//     <Box
//       textAlign="center"
//       py={10}
//       px={6}
//       bg="#A0AEC0"
//       minHeight="100vh"
//       display="flex"
//       flexDirection="column"
//       justifyContent="flex-start"
//       alignItems="center"
//     >
//       <VStack spacing={6} color="white" w="full">
//         <Heading as="h1" size="xl">
//           Приветствуем Вас, {user.username}!
//         </Heading>
//         <Text fontSize="lg">
//           Эта страница отображает данные о Вас. Она будет пополняться.
//         </Text>
//         <Story user={user} />
//         <HStack w="full" justifyContent="space-around">
//           <VStack spacing={3} alignItems="flex-start">
//             <Text fontSize="lg">💚 Ваше имя: {user.username}</Text>
//             <Text fontSize="lg">💚 Ваша электронная почта: {user.email}</Text>
//             <Text fontSize="lg">💚 Дата регистрации: {user.createdAt}</Text>
//             <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
//               Редактировать профиль
//             </Button>
//           </VStack>
//           {user.profilePhoto && (
//             <Image
//               boxSize="150px"
//               borderRadius="full"
//               src={`http://localhost:3100${user.profilePhoto}`}
//               alt="Profile Photo"
//             />
//           )}
//         </HStack>
//       </VStack>

//       <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Редактировать профиль</ModalHeader>
//           <ModalCloseButton />
//           <form onSubmit={handleSubmit} enctype="multipart/form-data">
//             <ModalBody>
//               <Input
//                 placeholder="Имя пользователя"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Эл.почта"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 placeholder="Новый пароль"
//                 type="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 mb={3}
//               />
//               <Input
//                 type="file"
//                 name="profilePhoto"
//                 onChange={handleChange}
//                 mb={3}
//               />
//             </ModalBody>
//             {error && (
//               <Alert status="error">
//                 <AlertIcon />
//                 <AlertTitle>Ошибка</AlertTitle>
//                 <AlertDescription>{error}</AlertDescription>
//               </Alert>
//             )}
//             <ModalFooter>
//               <Button colorScheme="blue" mr={3} type="submit">
//                 Сохранить
//               </Button>
//               <Button variant="ghost" onClick={() => setIsEditing(false)}>
//                 Отмена
//               </Button>
//             </ModalFooter>
//           </form>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default ProfilePage_skeleton;

// ! ПЯТЫЙ  ВАРИАНТ:

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
  // const [entries, setEntries] = useState([]);

  // // const { isOpen, onOpen, onClose } = useDisclosure(); //добавить
  // const [placement, setPlacement] = useState("left"); //добавить


  // useEffect(() => {
  //   async function fetchData() {
  //     try {
  //       if (user?.id) {
  //         const { data } = await axiosInstance.get(`${VITE_API}/story/${user.id}`);
  //         setEntries(data);
  //       }
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   }
  //   fetchData();
  // }, [user]);

  // const goodWords = entries.filter(entry => entry.goodWord).map(entry => entry.goodWord);
  // const badWords = entries.filter(entry => entry.badWord).map(entry => entry.badWord);

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
        {/* <Text fontSize="lg">
          Эта страница отображает данные о Вас. Она будет пополняться.
        </Text> */}



        <HStack w="full" justifyContent="space-around">
          <VStack spacing={3} alignItems="flex-start">
            <Text fontSize="lg">💚 Ваше имя: {user.username}</Text>
            <Text fontSize="lg">💚 Ваша электронная почта: {user.email}</Text>
            {/* <Text fontSize="lg">💚 Дата регистрации: {user.createdAt}</Text> */}
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
