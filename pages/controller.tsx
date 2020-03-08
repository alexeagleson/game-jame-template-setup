import React from 'react';
import axios from 'axios';


const ControllerPage = () => {
  return (
    <>
      <h1>HEYYYY HERMANO</h1>

      <button
        onClick={() => {
          axios.post('/update_dat_circle_location', { y: -16, x: 0 });
        }}
      >
        UP
      </button>

      <button
        onClick={() => {
          axios.post('/update_dat_circle_location', {y: 16, x: 0});
        }}
      >
        DOWN
      </button>

      <button
        onClick={() => {
          axios.post('/update_dat_square_location', {y: 0 , x: 16});
        }}
      >
        RIGHT
      </button>

      <button
        onClick={() => {
          axios.post('/update_dat_square_location', {y: 0, x: -16});
        }}
      >
        LEFT
      </button>
    </>
  );
};

export default ControllerPage;
