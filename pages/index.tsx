import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ggg = io('http://localhost:4001');


const Index = () => {
  const [turn, setTurn] = useState<number | string | undefined>();

  ggg.on('hey', (message: string) => {
    setTurn(message);
  });
  // useEffect(() => {

  // }, []);

  return (
    <>
      <h1>GAME JAM GAME !!!!!!!!!!!</h1>
      {/* <button
        onClick={() => {
          axios.get('/current_turn').then(axiosResponse => {
            console.log(axiosResponse);
            setTurn(axiosResponse.data);
          });
        }}
      >
        BUTTN
      </button>
      <h2>{turn}</h2> */}
      <h2>{turn}</h2>
      <button
        onClick={() => {
          ggg.emit('chat message', 'your ass');
        }}
      >
        JJ
      </button>
    </>
  );
};

export default Index;
