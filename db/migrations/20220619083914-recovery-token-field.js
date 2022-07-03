'use strict';

const {UserSchema, USER_TABLE} = require("../models/user.model");
const {DataTypes} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
        field: 'recovery_token',
        allowNull: true,
        type: DataTypes.STRING
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  }
};
