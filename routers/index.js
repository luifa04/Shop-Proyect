
const products = require('./products.router');

function routerApi(app){
  app.use('/products', products);
}

module.exports = routerApi;
