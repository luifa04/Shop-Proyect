const {Sequelize} = require('sequelize');
const {config} = require('./../config/config')
const setupModels = require('./../db/models')


const options= {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if(config.isProd ){
  options.dialectOptions = {
    // ssl: {
    //   rejectUnauthorized: false,
    // }
  }
}

// descomentar lo de arriba para deployar



const sequelize = new Sequelize(config.dbUrl,options);

setupModels(sequelize);

//sincroniza para crear las tablas.
// sequelize.sync();

module.exports = sequelize;
