// ! новое

import React, { useState } from "react";
import { useEffect } from "react";
import axiosInstance from "../../axiosInstance";
const { VITE_API } = import.meta.env;
// import styles from "./Story.module.css";
import {
  Drawer,
  DrawerBody,
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