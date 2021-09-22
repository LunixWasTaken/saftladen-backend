import express from 'express';
import Category from '../../models/categoryModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.get('/:id', async (req, res) => {
  const dbObject = await Category.findOne({
    _id: req.params.id,
  })
      .catch(() => {
        return res.status(400).json({
          success: false,
          message: err,
        });
      });
  if (!dbObject) return res.sendStatus(404);
  res.status(200).type('json').json(dbObject);
});

export default router;
