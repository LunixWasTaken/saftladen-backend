import express from 'express';

import pGet from './get.js';
import pGetId from './getId.js';
import pPatch from './patch.js';
import pDelete from './delete.js';
import pPut from './put.js';


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', pGet);
// Returns ALL Products

router.get('/:id', pGetId);
// Returns specific Product by ID

router.put('/', pPut);
// Creates new Object in database

router.patch('/:id', pPatch);
// Returns specific Product by ID

router.delete('/:id', pDelete);
// Returns specific Product by ID

export default router;
