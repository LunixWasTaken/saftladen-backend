import express from 'express';

import cGet from './get.js';
import cGetId from './getId.js';
import cPatch from './patch.js';
import cDelete from './delete.js';
import cPut from './put.js';


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', cGet);
// Returns ALL Products

router.get('/:id', cGetId);
// Returns specific Product by ID

router.put('/', cPut);
// Creates new Object in database

router.patch('/:id', cPatch);
// Returns specific Product by ID

router.delete('/:id', cDelete);
// Returns specific Product by ID

export default router;
