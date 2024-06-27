import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
const { VITE_API } = import.meta.env;

export default function Story({ inputs, setInputs, user }) {
  const [entries, setEntries] = useState([]);
  // async function submitHandler(event) {
  //     try {
  //       // ! Если передаёшь body в fetch, указывй headers
  //       const response = await fetch('http://localhost:3100/api/v1/story', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json'
  //         },
  //         body: JSON.stringify(inputs)
  //       })
  //       const data = await response.json()
  //       console.log("response:", data)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch('http://localhost:3100/api/v1/story', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...inputs, user_id: user.id }),
        });
        const data = await response.json();
        setInputs(() => data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axiosInstance.get(`${VITE_API}/story`);
        setEntries(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []);
  return (
    <div>
      Хорошие слова:{' '}
      {entries[0]?.length
        ? entries[0]?.map((el) => <p key={el}>{el}</p>)
        : 'элементов нет'}
      <br/>
      Плохие слова:{' '}
      {entries[1]?.length
        ? entries[1]?.map((el) => <p key={el}>{el}</p>)
        : 'элементов нет'}
    </div>
  );
}
