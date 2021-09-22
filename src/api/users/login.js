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

  // Apply the Rules to the submitted body.
  const validation = new Validator(req.body, validationRules);

  // Check if validation failed reply with errors.
  if (validation.fails()) {
    return res.status(412).json({
      success: false,
      message: {
        hint: "Validation failed",
        details: validation.errors,
      },
    });
  }

  // Search the database for the submitted username
  const dbUser = await User.findOne({username: req.body.username})
      .catch((err) => {
        res.status(500).json({success: false, message: err});
        return console.error("Login FindUser " + err);
      });

  if (!dbUser) { // Username does not exist in database
    return res.status(401).json({
      success: false,
      message: "Username or password not correct.",
    });
  };

  console.log(dbUser);

  dbUser.comparePassword(req.body.password, (err, isMatch) => {
    if (err) {
      res.status(500).json({success: false, message: err});
      return console.error("Login PasswordCompare " + err);
    };

    if (!isMatch) { // Password does not match database entry
      return res.status(401).json({
        success: false,
        message: "Username or password not correct.",
      });
    };

    // Create and sign a JWT for the user to Authenticate with.
    const token = jwt.sign({
      username: dbUser.username,
      creationDate: dbUser.creationDate,
      isAdmin: dbUser.isAdmin,
      id: dbUser._id,
    }, process.env.TOKEN_SECRET, {
      expiresIn: '8h',
    });

    // Set the Set-Cookie header
    res.cookie('token', token, {maxAge: 28800000, httpOnly: false});
    // Send the reply.
    res.status(200).json({success: true});
  });
});

export default router;
