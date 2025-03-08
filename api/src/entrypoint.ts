// src/index.ts
import express from 'express';
import api from './routers';

const app = express();
const port = 3000;

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
