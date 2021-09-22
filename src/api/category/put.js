import express from 'express';
import Category from '../../models/categoryModel.js';
import Validator from 'validatorjs';
import createInDb from '../functions/createDb.js';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "name": "required|string",
  "displayName": "required|string",
  "description": "required|string",
  "img": "required|string",
};

router.put('/', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.user.isAdmin) return res.sendStatus(403);

  const cate = {
    name: req.body.name,
    displayName: req.body.displayName,
    description: req.body.description,
    img: req.body.img,
  };

  const validation = new Validator(cate, validationRules);

  if (validation.fails()) {
    return res.status(412).json({
      success: false,
      message: {
        hint: "Validation failed",
        details: validation.errors,
      },
    });
  }

  const resp = await createInDb(Category, cate);

  res.status(resp[0]).type("json").json(resp[1]);
});

export default router;
