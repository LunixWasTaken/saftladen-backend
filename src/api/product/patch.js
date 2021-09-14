import express from 'express';
import products from '../../models/productModel';

// eslint-disable-next-line new-cap
const router = express.Router();


router.patch('/:id', async (req, res, next) => {
  const obj = req.body;
  let prod = await products.findOne({_id: req.params.id});
  prod.name = prod.name != obj.name ? obj.name : prod.name;
  prod.price = prod.price != obj.price ? obj.price : prod.price;
  prod.description = prod.description != obj.description ? obj.description : prod.description;
  prod.img = prod.img != obj.img ? obj.img : prod.img;
  prod.available = prod.available != obj.available ? obj.available : prod.available;
  prod.Save()
});

export const pGet = router ;
