import React from 'react';
import styled from 'styled-components';



export const MasterPlayer= styled.div `
            margin: 1em;
            position: relative;
            width: 40px;
            height: 40px;
            &.circle {
                border-radius: 50%;
                background-image: linear-gradient(red, yellow, green);
            }
            &.square {
                border-radius: 10%;
                background-image: linear-gradient(blue, pink, blue);
            }
` 