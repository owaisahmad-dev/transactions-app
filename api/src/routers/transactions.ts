import { Router, json } from 'express';
import { db } from '../db';

const router = Router();

router.use(json());

router.get('/', async (req, res) => {
  const query = req.query;
  const per_page = parseInt((query.per_page || '').toString()) - 1 || 9;
  const page = parseInt((query.page || '').toString()) - 1 || 0;

  const { data, status, error, count } = await db
    .from('transactions')
    .select('*', { count: 'exact' })
    .range(page, page + per_page)
    .order('timestamp', { ascending: true });

  if (error || !data) {
    res.status(status).json({
      message: error.message || 'Unknown Error fetching transactions',
    });
    return;
  }

  res.status(status).json({
    transactions: data,
    total: count,
  });
});

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id || '');
  if (!id) {
    res.status(400).json({
      message: 'Invalid transaction id',
    });
    return;
  }
  const { data, status, error } = await db
    .from('transactions')
    .select()
    .eq('id', id)
    .single();

  if (error || !data) {
    res.status(404).json({
      message: 'Transaction not found',
    });
    return;
  }

  res.status(status).json(data);
});

router.post('/', async (req, res) => {
  const body = req.body;
  const { error, status, data } = await db
    .from('transactions')
    .insert(body)
    .select()
    .single();

  if (error || !data) {
    res.status(status).json({
      message: error.message || 'Unknown Error inserting transaction',
    });
    return;
  }
  res.status(status).json(data);
  return;
});

export default router;
