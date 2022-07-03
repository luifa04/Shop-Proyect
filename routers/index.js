
const products = require('./products.router');
const users = require('./users.router');
const customers = require('./custumers.router');
const orders = require('./orders.router');
const ordersProducts = require('./ordersProduct.router');
const categories = require('./categories.router');
const auth = require('./auth.router');
const profile = require('./profile.router');


function routerApi(app){
  app.use('/products', products);
  app.use('/users', users);
  app.use('/customers', customers);
  app.use('/orders', orders);
  app.use('/item', ordersProducts);
  app.use('/categories', categories);
  app.use('/auth', auth);
  app.use('/profile', profile);
}

module.exports = routerApi;
