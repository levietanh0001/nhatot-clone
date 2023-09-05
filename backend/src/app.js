// import core packages
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');


// load environment variables
const dotenvConfig = require('dotenv').config('../.env');
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenvConfig);


// import graphql package
const { graphqlHTTP } = require('express-graphql');


// import graphql modules
const graphqlSchema = require('./graphql/schema');
const graphqlResolver = require('./graphql/resolvers');
const { graphqlMiddleware } = require('./middlewares/graphql.middleware');


// import middlewares
// const { uploadSingleFile, uploadMultipleImages, uploadVideo } = require('./middlewares/upload.middleware');
// const { authenticateUser } = require('./middlewares/auth.middleware');


// import routers
const authRouter = require('./routes/auth.route');
const productRouter = require('./routes/product.route');
const favoriteListRouter = require('./routes/favorite-list.route');
const userRouter = require('./routes/user.route');
const chatRouter = require('./routes/chat.route');
const messageRouter = require('./routes/message.route');
// const firebaseRouter = require('./routes/firebase-auth.route');
const errorsService = require('./controllers/errors.controller');


// import models: into app.js, same place as sequelize.sync() for it to work
const { sequelize, getMagicMethods } = require('./utils/database.util');
const Product = require('./models/product.model');
const User = require('./models/user.model');
const UserProfile = require('./models/user-profile.model');
const FavoriteList = require('./models/favorite-list.model');
const FavoriteItem = require('./models/favorite-item.model');
const ProductImage = require('./models/product-image.model');
const ProductVideo = require('./models/product-video.model');
const userProfileRouter = require('./routes/user-profile.route');
// const { extractAccessTokenFromRequest, verifyAccessTokenAsync } = require('./utils/cryptography.util');
const ProductThumbnail = require('./models/product-thumbnail');
const VideoThumbnail = require('./models/video-thumbnail');
const connectToMongoDB = require('./utils/database.mongo.util');
const UserCollection = require('./models/user.collection');


// define associations
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } }); // on delete User, remove Product
User.hasMany(Product, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });

Product.belongsToMany(FavoriteList, { through: FavoriteItem });
FavoriteList.belongsToMany(Product, { through: FavoriteItem });

Product.hasMany(ProductImage, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });
ProductImage.belongsTo(Product, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });

Product.hasMany(ProductVideo, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });
ProductVideo.belongsTo(Product, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });

Product.hasOne(ProductThumbnail, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });
ProductThumbnail.belongsTo(Product, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });

Product.hasOne(VideoThumbnail, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });
VideoThumbnail.belongsTo(Product, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });

User.hasOne(FavoriteList, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });
FavoriteList.belongsTo(User, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });

User.hasOne(UserProfile, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });
UserProfile.belongsTo(User, { constraints: true, onDelete: 'CASCADE', foreignKey: { allowNull: true } });


// init express app
const app = express();


// add headers for extra security
const helmetConfig = {
  crossOriginResourcePolicy: false,
}
app.use(helmet(helmetConfig));


// add cors and cache preflight request
app.use(cors({
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token', 'Authorization'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: [process.env.FRONTEND_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'],
  preflightContinue: true,
  maxAge: 86400
}));


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // parse req.body 


// add upload folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))


// middleware that always runs first before the rest
app.use('/', (req, res, next) => {
  console.log('running first request');
  console.log({ magicMethods: getMagicMethods(User) });
  return next();
});


app.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'nhatot clone express server'
  })
});


// graphql
app.use('/graphql', graphqlMiddleware);


// add routers
// app.use('/firebase-auth', firebaseRouter);
// app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/user', userRouter);
app.use('/user-profile', userProfileRouter);
app.use('/favorite-list', favoriteListRouter);
app.use('/chat', chatRouter);
app.use('/message', messageRouter);

// error handling
app.use(errorsService.handle404);
app.use(errorsService.errorHandler);


connectToMongoDB();

// sync sequelize model with database
sequelize
  .sync({ force: process.env.SYNC_MODE === 'force' }) // force overwrite relationships, only in dev mode
  .then(() => {

    const server = app.listen(process.env.SERVER_PORT || process.env.PORT);

    const io = require('socket.io')(server, {
      pingTimeOut: 60000, // close connection after 60s of inactivity (user not sending anything)
      cors: {
        origin: ['http://localhost:3000']
      },
    });

    io.on('connection', socket => {

      const socketId = socket.id;

      console.log(`connected to socket with id ${socketId}`);

      // socket.on('setup', async (userId) => { // client emits 'setup' with `userData` as args

      //   if(userId) {

      //     // create user if not exists
      //     const currentUser = await UserCollection.findOne({ id: { $eq: userId } });

      //     if (!currentUser) {
      //       await UserCollection.create({ id: userId });
      //     }

      //     if(currentUser) {
      //       // socket.join(currentUser._id);
      //       socket.emit('privated_chat_connected', currentUser._id);
      //     }
          
      //   }

      // });

      console.log({ numClients: io.engine.clientsCount });

      socket.on('join_one_one_chat', (chatId) => {
        console.log(`joining room ${chatId}`);
        socket.join(chatId);
        socket.emit('one_one_chat_created', chatId);
      })

      socket.on('send_message', (message, chatId) => {
        
        console.log({ message });
        // socket.emit('receive_message', message); // send to self and recipient
        // io.emit('receive_message', message); // send to all clients including self
        // io.in(receiverId).emit('receive_message', message);
        // socket.broadcast.emit('receive_message', message);
        socket.to(chatId).emit('receive_message', message);

      });

      // socket.on('send_message', (message, room) => {
        
      //   console.log({ message, room });
      //   if(room) {
      //     io.emit('receive_message', message);
      //     // socket.broadcast.emit('receive_message', message);
      //     // socket.to(room).emit('receive_message', message);
      //   }
      //   // else {
      //   //   // io.emit('receive_message', message); // send to all clients including sender
      //   //   socket.broadcast.emit('receive_message', message); // send to all clients except for sender
      //   // }
        
      // });

    });

  })
  .catch(error => {
    console.error(error);
    throw new Error(error);
  });