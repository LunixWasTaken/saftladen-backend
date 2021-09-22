import express from 'express';
import Orders from '../../models/orderModel.js';
import Validator from 'validatorjs';
import createInDb from '../functions/createDb.js';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "products": "required|array",
  "status": "required|in:in progress,done,canceled,delayed,please contact customer support|string",
};

router.put('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const validation = new Validator(req.body, validationRules);

  if (validation.fails()) {
    return res.status(412).json({
      success: false,
      message: {
        hint: "Validation failed",
        details: validation.errors,
      },
    });
  }

  const order = {
    "products": req.body.products,
    "orderStatus": req.body.status,
    "customerId": req.user.id,
  };

  const resp = await createInDb(Orders, order);

  res.status(resp[0]).type("json").json(resp[1]);
});

export default router;
