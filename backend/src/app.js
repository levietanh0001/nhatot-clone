const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const { graphqlHTTP } = require('express-graphql');

// load environment variables
const dotenvConfig = require('dotenv').config('../.env');
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenvConfig);
// console.log(process.env);

const { verifyToken, accessPublicKey } = require('./utils/cryptography');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// import middlewares
const uploadData = require('./middlewares/upload-data');

// import routers
const authRouter = require('./routes/auth');
// const adminRouter = require('./routes/admin');
// const productsRouter = require('./routes/products');
// const cartRouter = require('./routes/cart');
// const orderRouter = require('./routes/orders');
const errorsService = require('./services/errors');

// must import models into app (same place as sequelize.sync() for it to work)
const { sequelize } = require('./utils/database');
const Product = require('./models/product');
const User = require('./models/user');
const UserProfile = require('./models/user-profile');
const FavoriteList = require('./models/favorite-list');
const FavoriteItem = require('./models/favorite-item');
const ProductImage = require('./models/product-image');
const ProductCategory = require('./models/product-category');
const Category = require('./models/category');
const MainDoorDirection = require('./models/main-door-direction');
const Direction = require('./models/direction');
const BalconDirection = require('./models/balcon-direction');
const { getMagicMethods } = require('./utils/magic-methods');
// const UserRole = require('./models/user-role');

// init express app
const app = express();

app.use(helmet());

// associations

// one-to-one relationship, an User created a Product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // one-to-many relationship: getProducts() and createProduct() methods generated

ProductImage.belongsTo(Product, { constraints: true, onDelete: 'CASCADE' });
Product.hasMany(ProductImage);

ProductCategory.belongsTo(Category);
Category.hasMany(ProductCategory);

Product.belongsTo(ProductCategory, { constraints: true, onDelete: 'CASCADE' });
ProductCategory.hasMany(Product);

MainDoorDirection.belongsTo(Direction);
Direction.hasMany(MainDoorDirection);

BalconDirection.belongsTo(Direction);
Direction.hasMany(BalconDirection);

FavoriteList.belongsTo(User);
User.hasOne(FavoriteList);
// User.hasOne(FavoriteList);

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

// User.hasOne(UserRole);
// UserRole.belongsTo(User);

// belongsToMany through an intermediate Model
FavoriteList.belongsToMany(Product, { through: FavoriteItem });
Product.belongsToMany(FavoriteList, { through: FavoriteItem });


// // settings
// const store = new MongoDBStore({
//   uri: process.env.MONGO_CONNECTION_STRING,
//   collection: 'session',
// });

// 2. add middlewares

// cors
app.use(
  cors({
    origin: ['http://localhost:3000/'],
  })
);

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://google.com');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// })

app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'helloworld'
  })
})

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parse req.body 


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


// // cookies
// app.use(
//   // session manages cookies
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false, // will not rewrite the req.session.cookie object

//     // session is only stored into your storage
//     // when any of the property is modified in req.session
//     saveUninitialized: false,
//     cookie: { maxAge: 60 * 60 * 1000 * 24 * 30 },
//     store: store
//   })
// );

// // send _csrf cookie, only needed when rendering form
// const csrfProtection = { cookie: true }; // httpOnly=true only when _csrf is sent via form in a hidden input field (SSR)
// app.use(csrf()); // csrf protection middleware right after session middleware and after cookieParser
// app.use((req, res, next) => {
//   // should cstf token be included in cookies?
//   res.cookie('XSRF-TOKEN', req.csrfToken()); // csrfToken() comes from csrf middleware right above
//   console.log('[app.js]', 'XSRF-Token has been set');
//   next();
// })


// middleware that always runs first before the rest
app.use('/', (req, res, next) => {
  console.log('this always run first before any request');

  // console.log(getMagicMethods(User));
  // console.log(getMagicMethods(Product));
  // console.log(getMagicMethods(Direction));
  next();
});


app.use((req, res, next) => {

  const token = req.headers?.['authorization']?.split(' ')[1];

  // no token means user not logged in, next right away
  if(!token) {
    return next();
  }

  const payload = verifyToken(token, accessPublicKey);

  // if token invalid -> user is not logged in, pass control to the remaining routers
  if (!payload) {
    return next();
  }

  const currentUserId = payload.userId;

  // if current user exists, attach user object to every request to access user's data
  User
    // check if current session's user exists in database
    .findOne({ where: { id: currentUserId } })
    .then(user => {
      if (!user) { // if user does not exist
        errorsService.throwError(404, 'Not found', 'User does not exist');
      }

      req.user = user; // set user instance from user model (sequelize)
      return req.user.getFavorite_list();
    })
    .then(favList => {

      if (!favList) {
        return req.user.createFavorite_list();
      }

    //   return favList;
    // })
    // .then(favList => {
    //   console.log('[app.js].favList', favList);

      return next();
    })
    .catch(error => {
      errorsService.passErrorToHandler(error, error.statusCode, next);
    });
});


// add routers
app.use('/api/auth', authRouter);
// app.use('/api/admin', adminRouter);
// app.use('/api/products', productsRouter);


// error handling
app.use(errorsService.handle404);
// app.use(errorsService.errorHandler);



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


