import dotenv from 'dotenv';
dotenv.config();


import db from './util/db.js';
db();

import api from './api/index.js';
api(3000);
