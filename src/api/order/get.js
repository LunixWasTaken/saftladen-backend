import express from 'express';
import orders from '../../models/orderModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await orders.find();
  res.status(200).type('application/json').send(result);
});

export default router;
