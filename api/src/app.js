import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send({ response: 'I am alive' }).status(200);
});

export default app;
