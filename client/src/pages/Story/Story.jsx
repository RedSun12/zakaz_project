import React from 'react';
import axios from 'axios';
import { useEffect } from 'react';
export default function Story({ inputs, setInputs, user }) {
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
          body: JSON.stringify({...inputs, user_id: user.id}),
          
        });
        const data = await response.json();
        setInputs(() => data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  
  return <div>История</div>;
}
