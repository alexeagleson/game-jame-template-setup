'use strict';

// https://crontab.guru/

require('dotenv').config();
import express from 'express';
import next from 'next';
import graphqlHTTP from 'express-graphql';
import { buildSchema } from 'graphql';
import { Pool } from 'pg';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import socketIo, { Socket } from 'socket.io';
import http from 'http';

// const port = parseInt(process.env.PORT as string, 10) || 3001;
const port = 4001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

// const app = require('express')();
// const server = require('http').createServer(app);

// server.listen(3000);

let circleX = 100;
let circleY = 100;
let squareX = 100;
let squareY = 100;

export interface UpdatePlayerPosition {
  x: number;
  y: number;
}

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
    type Query {
      hello: String
    }
  `);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  }
};

app.prepare().then(() => {
  const expressHandler = express();
  const server = http.createServer(expressHandler);
  expressHandler.use(cors());
  expressHandler.use(cookieParser());
  expressHandler.use(express.json());
  expressHandler.use(express.urlencoded({ extended: false }));

  const pool = new Pool();

  expressHandler.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    })
  );

  let connectUserIds: string[] = [];

  let currentTurn = 0;

  const io = socketIo(server);

  setInterval(() => {
    currentTurn++;
    connectUserIds.forEach(id => {
      io.to(id).emit('hey', `whats up ${currentTurn}`);
    });
  }, 10000);

  io.on('connection', socket => {
    connectUserIds.push(socket.id);
    console.log('a user c');
    socket.on('disconnect', something => {
      console.log('a user d');
      connectUserIds = connectUserIds.filter(id => id !== socket.id);
    });

    socket.on('chat message', message => {
      console.log(message);
    });

    console.log(connectUserIds);
  });

  // httpServer.listen(4002, function() {
  //   console.log('listening on *:3000');
  // });

  // expressHandler.get('/example', (req, res) => {
  //   res.sendStatus(200);
  // });

  expressHandler.get('/gimme_dat_circle_horizontal', (req, res) => {
    res.status(200).send(circleX.toString());
  });

  expressHandler.get('/gimme_dat_circle_vertical', (req, res) => {
    res.status(200).send(circleY.toString());
  });

  expressHandler.get('/gimme_dat_square_horizontal', (req, res) => {
    res.status(200).send(squareX.toString());
  });

  expressHandler.get('/gimme_dat_square_vertical', (req, res) => {
    res.status(200).send(squareY.toString());
  });

  expressHandler.post('/update_dat_circle_location', (req, res) => {
    console.log(req.body)


    const requestBodyWithTypeInfo = req.body as UpdatePlayerPosition;
    circleX = circleX + requestBodyWithTypeInfo.x;
    circleY = circleY + requestBodyWithTypeInfo.y;

    res.sendStatus(200);
  });

  expressHandler.post('/update_dat_square_location', (req, res) => {
    console.log(req.body)
    const requestBodyWithTypeInfo = req.body as UpdatePlayerPosition;
    squareX = squareX + requestBodyWithTypeInfo.x;
    squareY = squareY + requestBodyWithTypeInfo.y;

    res.sendStatus(200);
  });

  // expressHandler.get('/current_turn', (req, res) => {
  //   res.status(200).send('' + currentTurn);
  // });

  expressHandler.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, () => {
    // if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  // pool.end();
});
