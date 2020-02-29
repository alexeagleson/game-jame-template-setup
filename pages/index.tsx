import React, { useState } from 'react';
import axios from 'axios';

const Index = () => {
  const [turn, setTurn] = useState<number | undefined>();

  return (
    <>
      <h1>GAME JAM GAME GOES RIGHT HERE</h1>
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
    </>
  );
};

export default Index;
