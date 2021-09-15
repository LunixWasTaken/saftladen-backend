import express from 'express';
import orders from '../../models/orderModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.put('/', (req, res, next) => {
  if (!req.body) res.sendStatus(400);

  let orderStatus;
  let products;

  try {
    orderStatus = body.status;
    products = body.products;
  } catch {
    return res.sendStatus(400);
  }

  const order = {
    "products": products,
    "orderStatus": orderStatus,
  };

  orders.create(order, (err, data) => {
    if (err) {
      console.error(err);
      return res.sendStatus(500);
    }
    res.status(201).type('application/json').send(data);
  });
});

export default router;
