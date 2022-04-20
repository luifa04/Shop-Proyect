const {User, UserSchema} = require('./user.model')
const {Product, ProductSchema} = require('./product.model')
const {Customer, CustomerSchema} = require('./customer.model')
const {OrdersProduct, OrdersProductSchema} = require('./ordersProduct.model')
const {Categories, CategoriesSchema} = require('./categories.model')
const {Orders, OrdersSchema} = require('./order.model')

function setupModels(sequelize){
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Categories.init(CategoriesSchema, Categories.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Orders.init(OrdersSchema, Orders.config(sequelize));
  OrdersProduct.init(OrdersProductSchema, OrdersProduct.config(sequelize));

  User.associate(sequelize.models)
  Customer.associate(sequelize.models)
  Categories.associate(sequelize.models)
  Product.associate(sequelize.models)
  Orders.associate(sequelize.models)
}

module.exports = setupModels;
