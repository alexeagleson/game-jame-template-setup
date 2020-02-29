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

// const port = parseInt(process.env.PORT as string, 10) || 3001;
const port = 4001;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

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
  const server = express();
  server.use(cors());
  server.use(cookieParser());
  server.use(express.json());
  server.use(express.urlencoded({ extended: false }));

  const pool = new Pool();

  server.use(
    '/graphql',
    graphqlHTTP({
      schema,
      rootValue: root,
      graphiql: true
    })
  );

  server.get('/example', (req, res) => {
    res.sendStatus(200);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });

  // pool.end();
});
