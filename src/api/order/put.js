import express from 'express';
import orders from '../../models/orderModel.js';
import Validator from 'validatorjs';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "products": "required|array",
  "status": "required|in:in progress,done,canceled,delayed,please contact customer support|string",
};

router.put('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const validation = new Validator(req.body, validationRules);
  validation.fails(() => {
    return res.status(412).json({
      success: false,
      message: {
        hint: "Validation failed",
        details: validation.errors,
      },
    });
  });

  if (!validation.check()) return;

  const order = {
    "products": req.body.products,
    "orderStatus": req.body.status,
    "customerId": req.user.id,
  };

  orders.create(order, (err, data) => {
    if (err) {
      console.error("PUT ORDER", err);
      return res.status(500).json({success: false, message: err});
    }
    res.status(201).type('json').send({success: true, created: data});
  });
});

export default router;
