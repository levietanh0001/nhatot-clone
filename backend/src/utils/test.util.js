// const { accessPublicKey, verifyToken } = require("./cryptography");
// const { redisClient } = require("./redis-store");

// function testAsync(error=false) {
//   return new Promise((resolve, reject) => {
//     if(error) {
//       reject('error');
//     }
//     resolve('result');
//   })
// }

// testAsync(result => {
//   console.log(result);
// }).catch(error => console.error(error))


// const { redisClient, redisConn } = require("./redis-store");


// // test verify token
// const payload = verifyToken('eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNjg4NjQzMzk3LCJleHAiOjE2ODg2NDUxOTd9.dY8CrltCfbSMhhPI9hZTVEpSVpxlVBq27LCGHpfucH19CGZ2zPtEfiJ6ih_T89_hjFa3WB6WU27rJBpT5OL68S1PhvwNzAdJnL0pYqImHaXimIdHQXsICovwZstVwXXwNzw8UC___VdyOejt_MueYbtMjtZdU73_CgDWoEPRvo6ecEF6208EXre8IlpMSmKcRu98rBs3Upc37Et6vdzi2-lnyOYGJEHPp1dF1Lqe4xv6Tyki8mWjYwzBfvwfARuKtTLafmJY6r-I9WV3qGZDRGpXgKN69_nGKEDTb9YtgA8Njv0Dy1c6MMOQrZ8umJDG-Xw_0PFGFaOGsRwVN7rgLw', accessPublicKey);

// console.log({ payload });

// // test redis
// async function test() {
//   const value = await redisClient.get('BL_1');
//   console.log({ value });
// }

// test();
