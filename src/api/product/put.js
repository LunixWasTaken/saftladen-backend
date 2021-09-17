import express from 'express';
import products from '../../models/productModel.js';
import Validator from 'validatorjs';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "name": "required|string",
  "price": "required|numeric|min:0",
  "description": "required|string",
  "available": "boolean",
  "category": "required|string",
  "img": "",
};

router.put('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  // if (!req.Admin) return res.sendStatus(403);

  const prod = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    img: req.body.img,
    available: req.body.available,
    category: req.body.category,
  };

  const validation = new Validator(prod, validationRules);
  validation.fails(() => {
    console.log("Validation failed.");
    return res.status(412).json({
      success: false,
      message: {
        hint: "Validation failed",
        details: validation.errors,
      },
    });
  });

  if (!validation.check()) return;

  products.create(prod, (err, data) => {
    if (err) {
      console.error("PUT PRODUCT", err);
      return res.sendStatus(500);
    }
    res.status(201).type('json').send(data);
  });
});

export default router;
