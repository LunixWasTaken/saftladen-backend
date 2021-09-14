import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import userRoutes from './user';
import productRoutes from './product';
import orderRoutes from './order';

const upload = multer();
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(upload.array());

// Use the Router on the sub route /movies
app.get('/', (req, res) => {
  res.status(200).end();
});

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);






function start (PORT) {
  PORT = !PORT ? 3000 : PORT;
  app.listen(PORT, () => { console.log("Running on " + PORT)});
}

export default start;
