const mongoose = require('mongoose');


const connectToMongoDB = async () => {
  
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://root:123321@localhost:27017/nhatot?authSource=admin');

    console.log('connected to mongodb');

  } catch(error) {

    console.log(error);
    throw new Error(error);
    // process.exit();
  }
}

module.exports = connectToMongoDB;