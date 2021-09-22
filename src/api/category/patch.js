import express from 'express';
import Category from '../../models/categoryModel.js';
import Validator from 'validatorjs';
import patchInDb from '../functions/patchDb.js';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "name": "string",
  "displayName": "string",
  "description": "string",
  "img": "string",
};

router.patch('/:id', async (req, res, next) => {
  if (!req.body) return res.sendStatus(400);
  // if (!req.isAdmin) return res.sendStatus(403);
  const obj = req.body;
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

  const resp = await patchInDb(Category, obj, req.params.id);

  res.status(resp[0]).type("json").json(resp[1]);
});

export default router;
