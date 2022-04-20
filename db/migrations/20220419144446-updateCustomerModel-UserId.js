'use strict';

const {CustomerSchema, CUSTOMER_TABLE} = require("../models/customer.model");
const {DataTypes} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id',{
      allowNull: false,
      type: DataTypes.INTEGER,
      unique: true,
      field: 'user_id',
    });
  },

  async down (queryInterface, Sequelize) {
  }
};

//al correr una migracion de modificacion de una columna
//primero hay que modificar los datos en la base de datos
//directo que interfieran en la modificacion, sino habra
//validator error.
