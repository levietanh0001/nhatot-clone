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


module.exports = sequelize;
