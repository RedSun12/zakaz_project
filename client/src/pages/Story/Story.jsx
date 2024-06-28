import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import axiosInstance from '../../axiosInstance';
const { VITE_API } = import.meta.env;

export default function Story({ inputs, setInputs, user }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log(user)
        const { data } = await axiosInstance.get(`${VITE_API}/story/${ user?.id }`);
        setEntries(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    console.log('Я ТУТ!!!', entries)
    fetchData();
  }, []);
  return (
    <div>
      История хороших слов:{' '}
      {entries?.length
        ? entries?.map((el) => <p key={el}>{el.goodWord}</p>)
        : 'элементов нет'}
      <br/>
      История плохих слов:{' '}
      {entries?.length
        ? entries?.map((el) => <p key={el}>{el.badWord}</p>)
        : 'элементов нет'}
    </div>
  );
}
