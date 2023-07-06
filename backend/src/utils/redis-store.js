const dotenvConfig = require('dotenv').config('../../.env');
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenvConfig);
const redis = require('redis');


const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS,
  // legacyMode: true
});

redisClient.on('connect', () => {
  console.log('connected to redis');
});

redisClient.on('ready', () => {
  console.log('redis is ready');
});

redisClient.on('error', (error) => {
  console.log(error);
});

const redisConn = redisClient.connect();




module.exports = { redisClient, redisConn };