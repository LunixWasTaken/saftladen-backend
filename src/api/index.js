import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import userRoutes from './users/index.js';
import productRoutes from './product/index.js';
import orderRoutes from './order/index.js';
import categoryRoutes from './category/index.js';

const app = express();

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'PHP/6.9-mushyPotato');
  next();
});

function logging(req, res, next) {
  console.log(`${req.method} ${req.url} ${req.headers['user-agent']} ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}`);
  next();
}

function authenticateToken(req, res, next) {
  if (req.method.toString().toLowerCase() == "options") return next();
  const exceptions = ['/user/login', '/user/register', '/', '/product', '/category'];
  if (req.url.includes("/category/") && req.method.toLowerCase() == "get" || req.url.includes("/product/") && req.method.toLowerCase() == "get") return next();
  if (exceptions.includes(req.url) && ['post', 'get'].includes(req.method.toLowerCase())) return next();

  let token = undefined;
  const authHeader = req.headers['authorization'];
  if (authHeader) {
    token = authHeader && authHeader.split(' ')[1];
  } else {
    token = req.cookies.token;
  }
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) {
      console.error(err + " JWT Verify");
      return res.sendStatus(401);
    }
    console.log("Authenticated " + user.username);
    req.user = user;
    next();
  });
}

const corsOptions = {
  credentials: true,
  origin: true,
};

app.use(cookieParser());
app.use(logging);
app.use(cors(corsOptions));
app.use(authenticateToken);
app.use(express.json({extended: false, limit: "50mb"}));
app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  res.status(418).end("O.o");
});

app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/order', orderRoutes);
app.use('/category', categoryRoutes);

function start(PORT) {
  PORT = !PORT ? 3000 : PORT;
  app.listen(PORT, () => console.log("Running on " + PORT));
}

export default start;
