import dotenv from 'dotenv';
dotenv.config();

import db from './util/db.js';
import api from './api/index.js';

process.env.NODE_ENV = 'production';

db();

api(3000);
