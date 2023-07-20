const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const { graphqlHTTP } = require('express-graphql');

// load environment variables
const dotenvConfig = require('dotenv').config('../.env');
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenvConfig);


// graphql
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');


// import middlewares
const { uploadSingleFile, uploadMultipleImages, uploadVideo } = require('./middlewares/upload-data.middleware');


// import routers
const authRouter = require('./routes/auth.route');
const productsRouter = require('./routes/products.route');
const errorsService = require('./controllers/errors.controller');


// import models: into app.js, same place as sequelize.sync() for it to work
const { sequelize } = require('./utils/database.util');
const Product = require('./models/product.model');
const User = require('./models/user.model');
const UserProfile = require('./models/user-profile.model');
const FavoriteList = require('./models/favorite-list.model');
const FavoriteItem = require('./models/favorite-item.model');
const { graphqlMiddleware } = require('./middlewares/graphql.middleware');
const { authenticateUser } = require('./middlewares/auth.middleware');
const { rootDir } = require('./utils/path.util');
const { check } = require('express-validator');
const firebaseRouter = require('./routes/firebase-auth.route');


// define associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product); // one-to-many relationship: getProducts() and createProduct() methods generated
User.hasOne(UserProfile);
UserProfile.belongsTo(User);
FavoriteList.belongsTo(User);
User.hasOne(FavoriteList);
FavoriteList.belongsToMany(Product, { through: FavoriteItem });
Product.belongsToMany(FavoriteList, { through: FavoriteItem });


// init express app
const app = express();


// add headers for extra security
app.use(helmet());


// add cors
const corsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: "http://localhost:3000",
  preflightContinue: false,
};
app.use(cors({...corsOptions}));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parse req.body 

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// middleware that always runs first before the rest
app.use('/', (req, res, next) => {
  console.log('this always run first before any request');
  // console.log(getMagicMethods(User));
  // console.log(rootDir);
  next();
});


app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'helloworld'
  })
});


// authenticate user for subsequent requests to resources (attach user object to req object)
app.use(authenticateUser);


// graphql
app.use('/graphql', graphqlMiddleware);


// upload files
// app.post('/uploads/images', uploadMultipleImages, (req, res, next) => {
//   console.log({ file: req.file, files: req.files });
//   res.json({ message: 'uploaded images received' });
// });

// app.post('/uploads/video', uploadVideo, (req, res, next) => {
//   console.log({ file: req.file, files: req.files });
//   res.json({ message: 'uploaded video received' });
// });


// add routers
// app.use('/api/auth', authRouter);
app.use('/api/firebase-auth', firebaseRouter);
// app.use('/api/admin', adminRouter);
app.use('/api/products', productsRouter);


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


