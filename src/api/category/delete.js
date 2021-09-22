import express from 'express';
import Category from '../../models/categoryModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.delete('/:id', (req, res, next) => {
  const filter = {
    _id: req.params.id,
  };
  Category.findOneAndDelete(filter, (err, product) => {
    err ? res.status(404).json({
      success: false,
      message: err,
    }) : res.status(200).json({success: true, deleted: product});
  });
});

export default router;
