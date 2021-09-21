import express from 'express';
import User from '../../models/userModel.js';
import jwt from 'jsonwebtoken';
import Validator from 'validatorjs';

// eslint-disable-next-line new-cap
const router = express.Router();

const validationRules = {
  "username": "required|string",
  "password": "required|string",
};

router.post('/', (req, res, next) => {
  if (!req.body) res.sendStatus(400);

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


  User.findOne({username: req.body.username}, (err, user) => {
    if (err) {
      res.status(500).json({success: false, message: err});
      return console.error(err + " 1");
    };
    if (!user) return res.status(401).json({success: false, message: "Username or password not correct."});
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (err) {
        res.status(500).json({success: false, message: err});
        return console.error(err + " 2");
      };
      if (!isMatch) return res.status(401).json({success: false, message: "Username or password not correct."});
      const token = jwt.sign({username: user.username, creationDate: user.creationDate, isAdmin: user.isAdmin, id: user._id}, process.env.TOKEN_SECRET, {expiresIn: '8h'});

      res.cookie('token', token, {maxAge: 28800000, httpOnly: false});
      res.status(200).json({success: true});
    });
  });
});

export default router;
