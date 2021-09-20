import express from 'express';
import orders from '../../models/orderModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/:id', async (req, res) => {
  const dbOrder = await orders.findOne({
    _id: req.params.id,
    customerId: req.user.id,
  }).catch((err) => {
    return res.status(400).json({
      success: false,
      message: err,
    });
  });

  if (!dbOrder) return res.send(404);

  res.status(200).type('json').send(dbOrder);
});

export default router;
