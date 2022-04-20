'use strict';

const {OrdersProductSchema, ORDERSPRODUCT_TABLE} = require("../models/ordersProduct.model");


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDERSPRODUCT_TABLE, OrdersProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(ORDERSPRODUCT_TABLE);
  }
}
