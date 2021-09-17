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
  if (!req.body) res.sendStatus(400);

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


  const order = {
    "products": body.products,
    "orderStatus": body.status,
  };

  orders.create(order, (err, data) => {
    if (err) {
      console.error("PUT ORDER", err);
      return res.sendStatus(500);
    }
    res.status(201).type('json').send(data);
  });
});

export default router;
