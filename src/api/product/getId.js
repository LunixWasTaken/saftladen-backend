import express from 'express';
import products from '../../models/productModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/:id', async (req, res) => {
  if (process.env.ENV == "DEV") console.log("LOG: pGET:id");
  products.findOne({_id: req.params.id}, (err, data) => {
    if (err) return res.status(400).json({success: false, message: err});
    if (!data) return res.sendStatus(404);
    res.status(200).type('application/json').send(JSON.stringify(data));
  });
});

export default router;
