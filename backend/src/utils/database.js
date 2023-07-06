const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'nhatot', 'root', '123321',
  {
    dialect: 'mysql',
    host: 'localhost',
    sync: true,
    dialectOptions: {
      // useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
      timezone: "+05:30"
    },
    timezone: "+05:30", //for writing to database
  }
);

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});




// connect to redis

// const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);

// const redisClient = redis.createClient({
//   host: process.env.REDIS_HOST,
//   port: process.env.REDIS_PORT,
//   password: process.env.REDIS_PASS,
//   // legacyMode: true
// });

// redisClient.on('connect', function () {
//   console.log('redis connected');
// });

// redisClient.on("error", (error) => {
//   console.log(error);
// });

// (async () => {
//   await redisClient.connect();
// })

// let redisClient = null;
// (async () => {

//   redisClient = redis.createClient({
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//     password: process.env.REDIS_PASS
//   });

//   redisClient.on("error", (error) => {
//     console.log(error);
//   });
//   redisClient.on("connect", () => {
//     console.log("Redis connected!");
//   });

//   await redisClient.connect();
// })();


module.exports = { sequelize };
