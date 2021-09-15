import express from 'express';

import oGet from './get.js';
import oGetId from './getId.js';
import oPut from './put.js';
import oDelete from './delete.js';


// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', oGet);
// Returns ALL Products

router.get('/:id', oGetId);
// Returns specific Product by ID

router.put('/', oPut);
// Creates new Object in database

// router.patch('/:id', pPatch); // Can be added later if required.
// Returns specific Product by ID

router.delete('/:id', oDelete);
// Returns specific Product by ID

export default router;
