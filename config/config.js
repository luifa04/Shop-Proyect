require('dotenv').config();

const config = {
  env: process.env.NODE_ENV  || 'dev',
  isProd: process.env.NODE_ENV  || 'production',
  port: process.env.PORT || 3000,
  dbUser: 'admin',
  dbPassword: 'admin123',
  dbHost: 'localhost',
  dbName: 'my_store',
  dbPort: '5432',
  dbUrl: 'postgres://admin:admin123@localhost:5432/my_store',
  apikey: 12345,
  jwtSecret: process.env.JWT_SECRET || K4M5N7Q8R9SBUCVDXFYGZJ3K4M6P7Q8SATBUDWEXFZH2J3M5N6P8R9SATC,
  email: process.env.EMAIL,
  passwordEmail: process.env.PASSWORD_EMAIL
}

module.exports = {config}
