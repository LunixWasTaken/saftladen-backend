import express from 'express';

// import uGet from './get.js';
import uLogin from './login.js';
import uRegister from './register.js';


// eslint-disable-next-line new-cap
const router = express.Router();

router.post('/register', uLogin);
router.post('/login', uRegister);

export default router;
