import express from 'express';

import {pGet, pPut, pPatch, pDelete} from '.';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', pGet);
// Returns ALL Products

router.get('/', pGetItem);
// Returns specific Product by ID

router.put('/', pPut);
// Creates new Object in database

router.patch('/', pPatch);
// Returns specific Product by ID

router.delete('/', pDelete);
// Returns specific Product by ID

export const productRoutes = router;
