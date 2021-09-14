import express from 'express';
import products from '../../models/productModel';

// eslint-disable-next-line new-cap
const router = express.Router();


router.delete('/:id', (req, res, next) => {
  const filter = {
    _id: req.params.id,
  };
  products.findOneAndDelete(filter, (err, product) => {
    err ? res.status(404).json({
      success: false,
      message: err,
    }) : res.status(200).json(product);
  });
});

export const pDelete = router;
