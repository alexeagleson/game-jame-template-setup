import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { words } from 'lodash-es';
import { withTheme } from 'styled-components';
import { MasterPlayer } from '../components/object-style'


// const ggg = io('http://localhost:4001');

const Index = () => {
  const [turn, setTurn] = useState<number | string | undefined>();
  const [topCircle, setTopCircle] = useState('100');
  const [sideCircle, setSideCircle] = useState('100');
  const [topSquare, setTopSquare] = useState('100');
  const [sideSquare, setSideSquare] = useState('100');

  // ggg.on('hey', (message: string) => {
  //   setTurn(message);
  // });

  useEffect(() => {
    setInterval(() => {
      axios.get('/gimme_dat_circle_vertical').then(axiosResponse => {
        console.log(axiosResponse);
        setTopCircle(axiosResponse.data);
      });
      axios.get('/gimme_dat_circle_horizontal').then(axiosResponse => {
        console.log(axiosResponse);
        setSideCircle(axiosResponse.data);
      });
      axios.get('/gimme_dat_square_vertical').then(axiosResponse => {
        console.log(axiosResponse);
        setTopSquare(axiosResponse.data);
      });
      axios.get('/gimme_dat_square_horizontal').then(axiosResponse => {
        console.log(axiosResponse);
        setSideSquare(axiosResponse.data);
      });
    }, 100);
  }, []);

  return (
    <>
      <h1>GAME JAM GAME OH YEAH!!!!!!!!!!!</h1>

      <div
        style={{ width: '800px', height: '800px', backgroundColor: 'purple' }}
      >
        <MasterPlayer
          className={'circle'}
          style={{
            left: `${sideCircle}px`,
            top: `${topCircle}px`,
          }}
        ></MasterPlayer>

        <MasterPlayer
          className={'square'}
          style={{
            left: `${sideSquare}px`,
            top: `${topSquare}px`,
          }}
        ></MasterPlayer>
      </div>

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
      {/* <h2>{turn}</h2>
      <button
        onClick={() => {
          ggg.emit('chat message', 'your ass');
        }}
      >
        JJ
      </button> */}
    </>
  );
};

export default Index;
