const mongoose = require('mongoose');


const connectToMongoDB = async () => {
  
  try {

    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log('connected to mongodb');

  } catch(error) {

    console.log(error);
    throw new Error(error);
    // process.exit();
  }
}

module.exports = connectToMongoDB;