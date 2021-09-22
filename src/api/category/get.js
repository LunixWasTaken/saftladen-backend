import express from 'express';
import Category from '../../models/categoryModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/', async (req, res) => {
  const result = await Category.find();
  res.status(200).type('json').send(result);
});

export default router;
