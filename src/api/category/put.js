import express from 'express';
import Category from '../../models/categoryModel.js';
import Validator from 'validatorjs';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "name": "required|string",
  "displayName": "required|string",
  "description": "required|string",
  "img": "required|string",
};

router.put('/', (req, res) => {
  if (!req.body) return res.sendStatus(400);
  if (!req.user.isAdmin) return res.sendStatus(403);

  const cate = {
    name: req.body.name,
    displayName: req.body.displayName,
    description: req.body.description,
    img: req.body.img,
  };

  const validation = new Validator(cate, validationRules);
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

  Category.create(cate, (err, data) => {
    if (err) {
      console.error("PUT CATEGORY", err);
      return res.sendStatus(500);
    }
    res.status(201).type('json').send(data);
  });
});

export default router;
