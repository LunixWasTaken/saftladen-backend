import express from 'express';
import Products from '../../models/productModel.js';
import Validator from 'validatorjs';
import createInDb from '../functions/createDb.js';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "name": "required|string",
  "price": "required|numeric|min:0",
  "description": "required|string",
  "available": "boolean",
  "category": "required|string",
  "img": "required|string",
};

router.put('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.user.isAdmin) return res.sendStatus(403);

  const data = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    img: req.body.img,
    available: req.body.available,
    category: req.body.category,
  };

  const validation = new Validator(data, validationRules);

  if (validation.fails()) {
    return res.status(412).json({
      success: false,
      message: {
        hint: "Validation failed",
        details: validation.errors,
      },
    });
  }

  const resp = await createInDb(Products, data);

  res.status(resp[0]).type("json").json(resp[1]);
});

export default router;
