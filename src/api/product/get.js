import express from 'express';
import products from '../../models/productModel';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', async (req, res, next) => {
  const result = await products.find();
  res.status(200).type('application/json').send(result);
});

export const pGet = router ;
