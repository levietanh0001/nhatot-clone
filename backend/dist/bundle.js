var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define("app", ["require", "exports", "express"], function (require, exports, express_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    express_1 = __importDefault(express_1);
    var bodyParser = require('body-parser');
    var multer = require('multer');
    var cookieParser = require('cookie-parser');
    var cors = require('cors');
    var session = require('express-session');
    var MongoDBStore = require('connect-mongodb-session')(session);
    var csrf = require('csurf');
    var graphqlHTTP = require('express-graphql').graphqlHTTP;
    var jwt = require('jsonwebtoken');
    require('dotenv').config('./.env');
    var _a = require('./utils/cryptography'), readPublicKeyFile = _a.readPublicKeyFile, verifyToken = _a.verifyToken;
    var graphqlSchema = require('./graphql/schema');
    var graphqlResolver = require('./graphql/resolvers');
    var uploadData = require('./middlewares/upload_data');
    var authRouter = require('./routes/auth');
    var adminRouter = require('./routes/admin');
    var productsRouter = require('./routes/products');
    var cartRouter = require('./routes/cart');
    var orderRouter = require('./routes/orders');
    var errorsService = require('./services/errors');
    var sequelize = require('./utils/database');
    var Product = require('./models/product');
    var User = require('./models/user');
    var Cart = require('./models/cart');
    var CartItem = require('./models/cart_item');
    var Order = require('./models/order');
    var OrderItem = require('./models/order_item');
    var app = (0, express_1.default)();
    var store = new MongoDBStore({
        uri: process.env.MONGO_CONNECTION_STRING,
        collection: 'session',
    });
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    });
    app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
    }));
    app.use(uploadData.multerWrapper());
    app.use(session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 60 * 60 * 1000 * 24 * 30 },
        store: store
    }));
    var csrfProtection = { cookie: true };
    app.use(csrf());
    app.use(function (req, res, next) {
        res.cookie('XSRF-TOKEN', req.csrfToken());
        console.log('[app.js]', 'XSRF-Token has been set');
        next();
    });
    app.use('/', function (req, res, next) {
        console.log('this always run first before any request');
        next();
    });
    app.use(function (req, res, next) {
        var _a, _b;
        console.log('[app.js]', 'run before every request');
        var token = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a['authorization']) === null || _b === void 0 ? void 0 : _b.split(' ')[1];
        var publicKey = readPublicKeyFile;
        var payload = verifyToken(token, publicKey);
        if (!payload.id) {
            return next();
        }
        var currentUserId = payload.id;
        User
            .findByPk(currentUserId)
            .then(function (user) {
            if (!user) {
                errorsService.throwError(404, 'Not found', 'User is not found in current session');
            }
            req.user = user;
            return req.user.getCart();
        })
            .then(function (cart) {
            if (!cart) {
                return req.user.createCart();
            }
            return cart;
        })
            .then(function (cart) {
            console.log('[app.js].cart', cart);
            return next();
        })
            .catch(function (error) {
            errorsService.passErrorToHandler(error, error.statusCode, next);
        });
    });
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
    app.use('/products', productsRouter);
    app.use('/cart', cartRouter);
    app.use('/orders', orderRouter);
    app.use(errorsService.handle404);
    app.use(errorsService.errorHandler);
    Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
    User.hasMany(Product);
    User.hasOne(Cart);
    Cart.belongsTo(User);
    Cart.belongsToMany(Product, { through: CartItem });
    Product.belongsToMany(Cart, { through: CartItem });
    Order.belongsTo(User);
    User.hasMany(Order);
    Order.belongsToMany(Product, { through: OrderItem });
    Product.belongsToMany(Order, { through: OrderItem });
    sequelize
        .sync({ force: process.env.SYNC_MODE === 'force' })
        .then(function () {
        var server = app.listen(process.env.PORT);
        var io = require('./utils/socket').init(server);
        io.on('connection', function (socket) {
            console.log('Socket connected');
        });
    })
        .catch(function (error) {
        errorsService.throwError(500, 'Internal Server Error', error.message);
    });
});
