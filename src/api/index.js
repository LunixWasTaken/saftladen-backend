import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';

import userRoutes from './user/index.js';
import productRoutes from './product/index.js';
import orderRoutes from './order/index.js';

const upload = multer();
const app = express();


function logging( req, res, next) {
  console.log(`${req.method} ${req.url} ${req.headers['user-agent']} ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
  next();
}

app.use(cors());
app.use(logging);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(upload.array());

app.get('/', (req, res) => {
  res.status(200).end();
});

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);

function start(PORT) {
  PORT = !PORT ? 3000 : PORT;
  app.listen(PORT, () => console.log("Running on " + PORT));
}

export default start;
