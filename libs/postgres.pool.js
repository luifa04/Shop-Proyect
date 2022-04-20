const {Pool} = require('pg');
const {config} = require('./../config/config')

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const pool = new Pool({connectionString: URI });

module.exports = pool;


//esta el la mejor manera de conectarte con la BD.
//es mas optima que la anterior que cada vez que necesito
//una consulta se deberia ejecutar la funcion getConnection
//en este caso se declara una variable pool en el constructor
//de la entidad y directamente se puede enviar querys.