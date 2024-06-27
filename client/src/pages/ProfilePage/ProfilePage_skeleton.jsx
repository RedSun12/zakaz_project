import React from "react";
import { Box, Text, Heading, VStack } from "@chakra-ui/react";
import Story from "../Story/Story";

const ProfilePage_skeleton = ({ user }) => {
  // const [entries, setEntries] = useState([]);
  console.log(user);

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
      </VStack>
    </Box>
  );
};

export default ProfilePage_skeleton;
