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

router.post('/', async (req, res, next) => {
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

  const dbUser = await User.findOne({
    username: req.body.username,
  }).catch((err) => {
    return res.status(500).json({
      success: false,
      message: err,
    });
  });

  if (dbUser) {
    return res.status(409).json({
      success: false,
      message: "Username is taken.",
    });
  }

  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
  });

  newUser.save((err) => {
    if (err) {
      res.status(500).json({
        success: false,
        message: err,
      });
      return console.error(err + " 3");
    }
  });

  const token = jwt.sign({
    username: newUser.username,
    creationDate: newUser.creationDate,
    isAdmin: newUser.isAdmin,
    id: newUser._id,
  }, process.env.TOKEN_SECRET, {
    expiresIn: '8h',
  });

  res.cookie('token', token, {maxAge: 28800, httpOnly: false});
  res.status(200).json({
    success: true,
  });
});

export default router;
