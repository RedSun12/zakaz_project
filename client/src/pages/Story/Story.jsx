// import React, { useState } from 'react';
// import axios from 'axios';
// import { useEffect } from 'react';
// import axiosInstance from '../../axiosInstance';
// const { VITE_API } = import.meta.env;

// export default function Story({ inputs, setInputs, user }) {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         console.log(user)
//         const { data } = await axiosInstance.get(`${VITE_API}/story/${ user?.id }`);
//         setEntries(data);
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//     console.log('Я ТУТ!!!', entries)
//     fetchData();
//   }, []);
//   return (
//     <div>
//       История хороших слов:{' '}
//       {entries?.length
//         ? entries?.map((el) => <p key={el}>{el.goodWord}</p>)
//         : 'элементов нет'}
//       <br/>
//       История плохих слов:{' '}
//       {entries?.length
//         ? entries?.map((el) => <p key={el}>{el.badWord}</p>)
//         : 'элементов нет'}
//     </div>
//   );
// }






// import React, { useState, useEffect } from 'react';
// import { VStack, Box, Text, SimpleGrid, Card, CardBody, CardHeader } from '@chakra-ui/react';
// import axiosInstance from '../../axiosInstance';

// const { VITE_API } = import.meta.env;

// const Story = ({ user }) => {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         if (user?.id) {
//           const { data } = await axiosInstance.get(`${VITE_API}/story/${user.id}`);
//           setEntries(data);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//     fetchData();
//   }, [user]);

//   const goodWords = entries.filter(entry => entry.goodWord).map(entry => entry.goodWord);
//   const badWords = entries.filter(entry => entry.badWord).map(entry => entry.badWord);

//   return (
//     <VStack spacing={6} color="white" w="full">
//       <SimpleGrid columns={2} spacing={10} w="full">
//         <Card>
//           <CardHeader>История хороших слов</CardHeader>
//           <CardBody>
//             <VStack spacing={2}>
//               {goodWords.length
//                 ? goodWords.map((word, index) => <Text key={index}>{word}</Text>)
//                 : <Text>Элементов нет</Text>}
//             </VStack>
//           </CardBody>
//         </Card>
//         <Card>
//           <CardHeader>История плохих слов</CardHeader>
//           <CardBody>
//             <VStack spacing={2}>
//               {badWords.length
//                 ? badWords.map((word, index) => <Text key={index}>{word}</Text>)
//                 : <Text>Элементов нет</Text>}
//             </VStack>
//           </CardBody>
//         </Card>
//       </SimpleGrid>
//     </VStack>
//   );
// };

// export default Story;

// ! ДО СТОРИ

// import React, { useState, useEffect } from 'react';
// import { VStack, Box, Text, SimpleGrid, Card, CardBody, CardHeader } from '@chakra-ui/react';
// import axiosInstance from '../../axiosInstance';

// const { VITE_API } = import.meta.env;

// const Story = ({ user }) => {
//   const [entries, setEntries] = useState([]);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         if (user?.id) {
//           const { data } = await axiosInstance.get(`${VITE_API}/story/${user.id}`);
//           setEntries(data);
//         }
//       } catch (error) {
//         console.error('Error:', error);
//       }
//     }
//     fetchData();
//   }, [user]);

//   const goodWords = entries.filter(entry => entry.goodWord).map(entry => entry.goodWord);
//   const badWords = entries.filter(entry => entry.badWord).map(entry => entry.badWord);

//   return (
//     <VStack spacing={6} color="white" w="full">
//       <SimpleGrid columns={2} spacing={10} w="full">
//         <Card bg="green.100">
//           <CardHeader>История хороших слов</CardHeader>
//           <CardBody>
//             <VStack spacing={2}>
//               {goodWords.length
//                 ? goodWords.map((word, index) => <Text key={index} color="green.800">{word}</Text>)
//                 : <Text>Элементов нет</Text>}
//             </VStack>
//           </CardBody>
//         </Card>
//         <Card bg="red.100">
//           <CardHeader>История плохих слов</CardHeader>
//           <CardBody>
//             <VStack spacing={2}>
//               {badWords.length
//                 ? badWords.map((word, index) => <Text key={index} color="red.800">{word}</Text>)
//                 : <Text>Элементов нет</Text>}
//             </VStack>
//           </CardBody>
//         </Card>
//       </SimpleGrid>
//     </VStack>
//   );
// };

// export default Story;

// ! новое

import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
const { VITE_API } = import.meta.env;
// import styles from "./Story.module.css";
import {
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
export default function Story({ user }) {
  const [entries, setEntries] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); //добавить
  const [placement, setPlacement] = useState("left"); //добавить
  useEffect(() => {
    async function fetchData() {
      try {
        console.log(user);
        const { data } = await axiosInstance.get(
          `${VITE_API}/story/${user?.id}`
        );
        setEntries(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <>
      <>
        <Button
          colorScheme="blue"
          style={{ margin: "5px", width: "150px" }}
          bg="#2F855A"
          _hover={{ bg: "teal.700" }}
          _active={{ bg: "teal.800" }}
          _focus={{ boxShadow: "none" }}
          onClick={onOpen}
        >
          История поиска
        </Button>
        <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader
              style={{ textAlign: "center" }}
              borderBottomWidth="1px"
            >
              Моя история поиска
            </DrawerHeader>
            <DrawerBody>
              <div style={{ margin: "15px", textAlign: "center" }}>
                <h2 style={{ color: "green" }}>Хорошие слова:</h2>
                {entries?.length ? (
                  <div>
                    {entries.map((el, index) => (
                      <p key={index}>{el.goodWord}</p>
                    ))}
                  </div>
                ) : (
                  <p>Элементов нет</p>
                )}
              </div>
              <div style={{ margin: "15px", textAlign: "center" }}>
                <h2 style={{ color: "red" }}>Плохие слова:</h2>
                {entries?.length ? (
                  <div>
                    {entries.map((el, index) => (
                      <p key={index}>{el.badWord}</p>
                    ))}
                  </div>
                ) : (
                  <p>Элементов нет</p>
                )}
              </div>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </>
  );
}