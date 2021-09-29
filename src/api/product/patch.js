import express from 'express';
import Products from '../../models/productModel.js';
import Validator from 'validatorjs';
import patchInDb from '../functions/patchDb.js';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "name": "string",
  "price": "numeric|min:0",
  "description": "string",
  "available": "boolean",
  "category": "string",
  "img": "string",
};

router.patch('/:id', async (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.user.isAdmin) return res.sendStatus(403);

  const obj = req.body;
  const validation = new Validator(obj, validationRules);

  if (validation.fails()) {
    return res.status(412).json({
      success: false,
      message: {
        hint: "Validation failed",
        details: validation.errors,
      },
    });
  }


  const resp = await patchInDb(Products, obj, req.params.id);
  res.status(resp[0]).type("json").json(resp[1]);
});

export default router;
