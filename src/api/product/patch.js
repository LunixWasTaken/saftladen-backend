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

router.patch('/:id', async (req, res) => {
  if (!req.body) return res.sendStatus(400);
  // if (!req.isAdmin) return res.sendStatus(403);
  const obj = req.body;
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

  try {
    products.findOne({
      _id: req.params.id,
    }, (err, prod) => {
      if (err) {
        res.json({
          success: false,
          message: JSON.stringify(err),
        });
        return console.error("PATCH PRODUCT", err);
      }
      if (!prod) return res.sendStatus(404);
      prod.name = prod.name != obj.name ? obj.name : prod.name;
      prod.price = prod.price != obj.price ? obj.price : prod.price;
      prod.description = prod.description != obj.description ? obj.description : prod.description;
      prod.img = prod.img != obj.img ? obj.img : prod.img;
      prod.available = prod.available != obj.available ? obj.available : prod.available;
      prod.save();
      return res.status(200).json({
        success: true,
        modified: JSON.stringify(prod),
      });
    });
  } catch {
    return res.status(500).end();
  }
});

export default router;
