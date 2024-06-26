
import React from "react";
import { Box, Heading, Text, Button, VStack, Alert, AlertIcon } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const HomePage = ({ user }) => {
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
      <VStack spacing={6} maxW="lg">
        <Heading as="h1" size="2xl" color="white">
          Welcome to Home Page
        </Heading>
        <Text fontSize="xl" color="white">
          {user ? `Вы авторизованы успешно, ${user.username}` : "Вы не зарегистрированы"}
        </Text>
        {!user && (
          <Alert status="warning" borderRadius="md">
            <AlertIcon />
            Вы не зарегистрированы. Пожалуйста, перейдите на главную страницу для регистрации.
          </Alert>
        )}
        {!user && (
          <Button as={RouterLink} to="/" colorScheme="teal" size="lg">
            Перейти на главную страницу
          </Button>
        )}
      </VStack>
    </Box>
  );
};

export default HomePage;