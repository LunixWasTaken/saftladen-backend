import express from 'express';
import products from '../../models/productModel';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', async (req, res, next) => {
  const result = await products.find();
  res.status(200).type('application/json').send(result);
});

router.get('/:id', async (req, res, next) => {
  const result = await products.findOne({_id: req.params.id});
  if (!result) return res.sendStatus(404);
  res.status(200).type('application/json').send(result);
});

export const pGet = router;
