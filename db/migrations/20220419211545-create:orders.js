'use strict';

const {OrdersSchema, ORDERS_TABLE} = require("../models/order.model");


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDERS_TABLE, OrdersSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(ORDERS_TABLE);
  }
}

