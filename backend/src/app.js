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

const { verifyToken, accessPublicKey } = require('./utils/cryptography.util');

const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');

// import middlewares
const uploadData = require('./middlewares/upload-data.middleware');

// add routers
const authRouter = require('./routes/auth.route');
// const adminRouter = require('./routes/admin');
// const productsRouter = require('./routes/products');
const errorsService = require('./controllers/errors.controller');

// must import models into app (same place as sequelize.sync() for it to work)
const { sequelize } = require('./utils/database.util');
const Product = require('./models/product.model');
const User = require('./models/user.model');
const UserProfile = require('./models/user-profile.model');
const FavoriteList = require('./models/favorite-list.model');
const FavoriteItem = require('./models/favorite-item.model');
const { getMagicMethods } = require('./utils/magic-methods.util');

// init express app
const app = express();

app.use(helmet());

// associations

// one-to-one relationship, an User created a Product
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // one-to-many relationship: getProducts() and createProduct() methods generated

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

FavoriteList.belongsTo(User);
User.hasOne(FavoriteList);

// belongsToMany through an intermediate Model
FavoriteList.belongsToMany(Product, { through: FavoriteItem });
Product.belongsToMany(FavoriteList, { through: FavoriteItem });


// // settings
// const store = new MongoDBStore({
//   uri: process.env.NODE_ENV === 'prod'? process.env.MONGO_CONNECTION_STRING: 'localhost',
//   collection: 'session',
// });

// 2. add middlewares

// cors

const corsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:3000",
  preflightContinue: false,
};

// frontend origins
app.use(cors({
  ...corsOptions
  // origin: ['http://localhost:3000', 'http://localhost:3000/', 'http://127.0.0.1:3000', 'http://127.0.0.1:3000/'], 
  // credentials: true 
}));

// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// })


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parse req.body 


app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'helloworld'
  })
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
  if (!token) {
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
app.use(errorsService.errorHandler);



// sync sequelize model with database
sequelize
  .sync({ force: process.env.SYNC_MODE === 'force' }) // force overwrite relationships, only in dev mode
  .then(() => {
    const server = app.listen(process.env.PORT);
    const io = require('./utils/socket.util').init(server);
    io.on('connection', socket => {
      console.log('Socket connected');
    });
  })
  .catch(error => {
    errorsService.throwError(500, 'Internal Server Error', error.message);
  });


