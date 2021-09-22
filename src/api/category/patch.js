import express from 'express';
import Category from '../../models/categoryModel.js';
import Validator from 'validatorjs';

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

  try {
    Category.findOne({
      _id: req.params.id,
    }, (err, prod) => {
      if (err) {
        res.json({
          success: false,
          message: JSON.stringify(err),
        });
        return console.error("PATCH CATEGORY", err);
      }
      if (!prod) return res.sendStatus(404);
      prod.name = prod.name != obj.name ? obj.name : prod.name;
      prod.displayName = prod.displayName != obj.displayName ? obj.displayName : prod.displayName;
      prod.description = prod.description != obj.description ? obj.description : prod.description;
      prod.img = prod.img != obj.img ? obj.img : prod.img;
      prod.save();
      return res.status(200).json({
        success: true,
        modified: prod,
      });
    });
  } catch (ex) {
    return res.status(500).end(ex);
  }
});

export default router;
