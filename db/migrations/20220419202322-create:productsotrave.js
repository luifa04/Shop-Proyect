'use strict';
const {ProductSchema, PRODUCT_TABLE} = require("../models/product.model");
const {CategoriesSchema, CATEGORIES_TABLE} = require("../models/categories.model");


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORIES_TABLE, CategoriesSchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
  },

  async down (queryInterface) {
    await queryInterface.drop(CATEGORIES_TABLE);
    await queryInterface.drop(PRODUCT_TABLE);
  }
};
