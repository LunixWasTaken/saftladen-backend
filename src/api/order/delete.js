import express from 'express';
import orders from '../../models/orderModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.delete('/:id', (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403);

  const filter = {
    _id: req.params.id,
  };
  orders.findOneAndDelete(filter, (err, order) => {
    err ? res.status(404).json({
      success: false,
      message: err,
    }) : res.status(200).json({success: true});
  });
});

export default router;
