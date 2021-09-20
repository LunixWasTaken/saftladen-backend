import express from 'express';
import User from '../../models/userModel.js';

// eslint-disable-next-line new-cap
const router = express.Router();


router.delete('/:id', (req, res, next) => {
  if (!req.user.isAdmin) return res.sendStatus(403);

  const filter = {
    _id: req.params.id,
  };
  User.findOneAndDelete(filter, (err, order) => {
    if (err) return res.status(500).json({success: false, message: err});
    if (!order) return res.sendStatus(404);
    res.status(200).json({success: true});
  });
});

export default router;
