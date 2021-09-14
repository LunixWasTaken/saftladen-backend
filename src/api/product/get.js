import express from 'express';
import products from '../../models/productModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', async (req, res) => {
  if (process.env.ENV == "DEV") console.log("LOG: pGET");
  const result = await products.find();
  res.status(200).type('application/json').send(result);
});

export default router;
