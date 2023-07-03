const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const { graphqlHTTP } = require('express-graphql');
require('dotenv').config('../.env');

const { readPublicKeyFile, verifyToken } = require('./utils/cryptography');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// import middlewares
const uploadData = require('./middlewares/upload_data');

// import routers
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const productsRouter = require('./routes/products');
const cartRouter = require('./routes/cart');
const orderRouter = require('./routes/orders');
const errorsService = require('./services/errors');

// must import models into app (containing sequelize.sync())
const sequelize = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart_item');
const Order = require('./models/order');
const OrderItem = require('./models/order_item');


// init express app
const app = express();

// settings
const store = new MongoDBStore({
  uri: process.env.MONGO_CONNECTION_STRING,
  collection: 'session',
});

// 2. add middlewares
// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parse req.body 

// cors
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

// graphql
app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true, // web ide

    // // format error for graphql
    // formatError(error) {
    //     if(!error.originalError) { // means if not error during runtime
    //         return error;
    //     }
    //     const data = error.originalError.data;
    //     const message = error.message || 'Something wrong happens';
    //     const statusCode = error.originalError.code || 500;
    //     return { message: message, statusCode: statusCode, data: data };
    // }
  }),

);

// upload single file (image) middleware
app.use(uploadData.multerWrapper());

app.use(
  // session manages cookies
  session({
    secret: process.env.SESSION_SECRET,
    resave: false, // will not rewrite the req.session.cookie object

    // session is only stored into your storage
    // when any of the property is modified in req.session
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 * 24 * 30 },
    store: store
  })
);

// send _csrf cookie, only needed when rendering form
const csrfProtection = { cookie: true }; // httpOnly=true only when _csrf is sent via form in a hidden input field (SSR)
app.use(csrf()); // csrf protection middleware right after session middleware and after cookieParser
app.use((req, res, next) => {
  // should cstf token be included in cookies?
  res.cookie('XSRF-TOKEN', req.csrfToken()); // csrfToken() comes from csrf middleware right above
  console.log('[app.js]', 'XSRF-Token has been set');
  next();
})

// middleware that always runs first before the rest
app.use('/', (req, res, next) => {
  console.log('this always run first before any request');
  next();
});


app.use((req, res, next) => {

  console.log('[app.js]', 'run before every request');

  const token = req.headers?.['authorization']?.split(' ')[1];
  const publicKey = readPublicKeyFile;
  const payload = verifyToken(token, publicKey);

  if (!payload.id) {
    return next();
  }

  const currentUserId = payload.id;

  // if current user exists, attach user object to every request
  User
    // check if current session's user exists in database
    .findByPk(currentUserId) // req.session.user contains data fields only
    .then(user => {
      if (!user) { // if user does not exist
        errorsService.throwError(404, 'Not found', 'User is not found in current session');
        // return next();
      }

      req.user = user; // set user instance from user model (sequelize)

      return req.user.getCart();
    })
    .then(cart => {

      if (!cart) {
        return req.user.createCart();
      }

      return cart;
    })
    .then(cart => {
      console.log('[app.js].cart', cart);
      return next();
    })
    .catch(error => {
      errorsService.passErrorToHandler(error, error.statusCode, next);
    });
});


// use routers
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use('/cart', cartRouter)
app.use('/orders', orderRouter);


// error handling
app.use(errorsService.handle404);
app.use(errorsService.errorHandler);


// one-to-one relationship, an User created a Product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // one-to-many relationship: getProducts() and createProduct() methods generated

User.hasOne(Cart);
Cart.belongsTo(User); // generated user.getCart() method

// association: belongsToMany through an intermediate Model
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem });
Product.belongsToMany(Order, { through: OrderItem });


// sync sequelize model with database
sequelize
  .sync({ force: process.env.SYNC_MODE === 'force' }) // force overwrite relationships, only in dev mode
  .then(() => {
    const server = app.listen(process.env.PORT);
    const io = require('./utils/socket').init(server);
    io.on('connection', socket => {
      console.log('Socket connected');
    });
  })
  .catch(error => {
    errorsService.throwError(500, 'Internal Server Error', error.message);
  });


