import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello, world from transactions');
});

export default router;
