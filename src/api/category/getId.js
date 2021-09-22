import express from 'express';
import Category from '../../models/categoryModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/:id', async (req, res) => {
  Category.findOne({_id: req.params.id}, (err, data) => {
    if (err) return res.status(400).json({success: false, message: err});
    if (!data) return res.sendStatus(404);
    res.status(200).type('json').json(data);
  });
});

export default router;
