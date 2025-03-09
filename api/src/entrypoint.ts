// src/index.ts
import express from 'express';
import api from './routers';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (_, res) => {
  res.send('Hello, world!');
});

app.use('/api', api);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
