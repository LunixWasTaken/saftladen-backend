import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import userRoutes from './user/index.js';
import productRoutes from './product/index.js';
import orderRoutes from './order/index.js';

const upload = multer();
const app = express();


function logging( req, res, next) {
  console.log(`${req.method} ${req.url} ${req.headers['user-agent']} ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
  next();
}

function authenticateToken(req, res, next) {
  const exceptions = ['/user/login', '/user/register'];
  if (exceptions.includes(req.url)) return next();

  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    console.error(err);
    if (err) return res.sendStatus(401);
    req.user = user;
    next();
  });
}

app.use(cookieParser());
app.use(logging);
// app.use(authenticateToken);
app.use(cors());
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
