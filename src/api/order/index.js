import express from 'express';

import uGet from './get.js';


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', uGet);

export default router;
