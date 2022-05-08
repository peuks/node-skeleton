#!/usr/bin/env node

import { config } from 'dotenv';
import * as http from 'http';
import stoppable from 'stoppable';
import { promisify } from 'util';
// import session from 'express-session';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from '../config/connectDB';
import app from '../src/app';

const SIGINT = 'SIGINT';
const SIGTERM = 'SIGTERM';
const SERVER_CLOSE_GRACE = 10000;
const { SERVER_PORT = 3000 } = process.env;

const shutdownMessages: any = {
  [SIGINT]: 'Received SIGINT, probably ctrl-c. Gracefully shutting down the server.',
  [SIGTERM]: 'Received SIGTERM, probably docker stop. Gracefully shutting down the server.',
};

config();
const start = async () => {
  app.set('port', SERVER_PORT);

  const server = stoppable(http.createServer(app), SERVER_CLOSE_GRACE);

  const io = new Server(server, { cors: { origin: '*' } });

  // hook up session for express routes
  // const sessionMiddleware = session({
  //   // genid: req => uuidv4(),
  //   secret: 'keyboard cat',
  //   resave: false,
  //   saveUninitialized: true,
  //   cookie: {},
  // });

  // hook up the session for socket.io connections
  // io.use((socket, next) => sessionMiddleware(socket.request, socket.request.res || {}, next));
  // app.use(sessionMiddleware);

  // let interval;

  // io.on('connection', (socket) => {
  //   console.log('New client connected');
  //   if (interval) {
  //     clearInterval(interval);
  //   }
  //   interval = setInterval(() => getApiAndEmit(socket), 1000);
  //   socket.on('disconnect', () => {
  //     console.log('Client disconnected');
  //     clearInterval(interval);
  //   });
  // });

  // const getApiAndEmit = (socket) => {
  //   const response = new Date();
  //   // Emitting a new message. Will be consumed by the client
  //   socket.emit('FromAPI', response);
  // };

  // app.use((req, res, next) => {
  //   req.io = io;
  //   next();
  // });

  const serverClose = promisify(server.stop.bind(server));

  // Handle a shutdown event
  const shutdown = async (signal: any) => {
    console.log(shutdownMessages[signal]);

    try {
      await serverClose();
      console.log('Bye');
      process.exit(0);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  const onError = (error: any) => {
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${SERVER_PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${SERVER_PORT} is already in use!`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };

  connectDB();

  server.listen(SERVER_PORT, () => {
    console.clear();
    console.log(`Server listening at http://localhost:${SERVER_PORT}`);
  });

  server.on('error', onError);

  process.on(SIGINT, () => shutdown(SIGINT));
  process.on(SIGTERM, () => shutdown(SIGTERM));
};

start();
