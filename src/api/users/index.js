import express from 'express';

import uGet from './get.js';
import uLogin from './login.js';
import uRegister from './register.js';
import uDelete from './delete.js';


// eslint-disable-next-line new-cap
const router = express.Router();


router.use('/register', uRegister);
router.use('/login', uLogin);
router.use('/', uGet);
router.use('/', uDelete);

export default router;
