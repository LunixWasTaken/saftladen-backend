import express from 'express';
import products from '../../models/productModel';

// eslint-disable-next-line new-cap
const router = express.Router();


router.put('/', (req, res, next) => {
  if (!req.body) res.sendStatus(400);
  const prod = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    img: req.body.img,
    available: req.body.available,
  };
  products.insert(prod, (err, data) => {
    if (err) {
      return res.sendStatus(500);
      console.error(err);
    }
    res.status(201).type('application/json').send(data);
  });
});

export const pPut = router;
