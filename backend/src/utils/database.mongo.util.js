const mongoose = require('mongoose');


const connectToMongoDB = async () => {
  
  try {

    const conn = await mongoose.connect(
      process.env.MONGO_URI
      // 'mongodb://root:123321@mongo:27017/nhatot?authSource=admin'
      // 'mongodb://root:mongo_pass@127.0.0.1:27017/nhatot?authSource=admin'

      // 'mongodb://root:mongo_pass@$207.148.126.202:27017/nhatot?authSource=admin'
      // process.env.MONGO_URI || 'mongodb://root:123321@localhost:27017/nhatot?authSource=admin'
    );

    console.log('connected to mongodb');

  } catch(error) {

    console.log(error);
    throw new Error(error);
    // process.exit();
  }
}

module.exports = { connectToMongoDB, mongoConn: mongoose.connection };
