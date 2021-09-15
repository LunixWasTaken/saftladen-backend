import express from 'express';
import users from '../../models/userModel.js';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/', (req, res) => {
  if (!req.body) res.sendStatus(400);

  const {username, password} = req.body;
  if (!username || !password) res.sendStatus(400);

  users.findOne({username: username}, (err, user) => {
    if (err) {
      res.status(500).json({success: false, message: err});
      return console.error(err);
    };

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        res.status(500).json({success: false, message: err});
        return console.error(err);
      };
      if (!isMatch) return res.status(401).json({success: false, message: "Username or password not correct."});
      const token = jwt.sign({username: user.username, creationDate: user.creationDate, isAdmin: user.isAdmin}, process.env.TOKEN_SECRET, {expiresIn: '8h'});

      res.cookie('token', token);
      res.status(200).json({success: true});
    });
  });
});

export default router;
