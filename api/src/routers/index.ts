import { Router } from 'express';

const router = Router();

import transactions from './transactions';

router.use('/transactions', transactions);

router.get('/', (req, res) => {
  res.send('Hello, world from API');
});

export default router;
