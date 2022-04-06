
const products = require('./products');

function routerApi(app){
  app.use('/products', products);
}

module.exports = routerApi;
