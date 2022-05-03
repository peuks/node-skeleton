import express from 'express';

const app = express();

app.get('/', (req, res) => res.send('hello worldworldworld'));

export default app;
