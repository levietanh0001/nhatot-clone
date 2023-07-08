const dotenvConfig = require('dotenv').config('../../.env');
const dotenvExpand = require('dotenv-expand')
dotenvExpand.expand(dotenvConfig);
const redis = require('redis');

const REDIS_HOST = process.env.NODE_ENV === 'prod'? process.env.REDIS_HOST: 'localhost'

const redisClient = redis.createClient({
  url: `redis://:redis_pass@${REDIS_HOST}:6379`
  // url: 'redis://redis:6379',

  // host: process.env.REDIS_HOST,
  // port: process.env.REDIS_PORT,
  // password: process.env.REDIS_PASS,
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