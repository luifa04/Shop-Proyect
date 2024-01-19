require('dotenv').config();

const config = {
  env: process.env.NODE_ENV  || 'dev',
  isProd: process.env.NODE_ENV  || 'production',
  port: process.env.PORT || 3000,
  dbUser: 'usmuelidzbdtlxba9jgq',
  dbPassword: 'TQ4m1ga8W3cH2BOJ17W8ubdaVoItvT',
  dbHost: 'blncsofcmyhuzgxozhwq-postgresql.services.clever-cloud.com',
  dbName: 'blncsofcmyhuzgxozhwq',
  dbPort: '50013',
  dbUrl: 'postgresql://usmuelidzbdtlxba9jgq:TQ4m1ga8W3cH2BOJ17W8ubdaVoItvT@blncsofcmyhuzgxozhwq-postgresql.services.clever-cloud.com:50013/blncsofcmyhuzgxozhwq',
  apikey: 12345,
  jwtSecret: process.env.JWT_SECRET,
  email: process.env.EMAIL,
  passwordEmail: process.env.PASSWORD_EMAIL
}

module.exports = {config}
