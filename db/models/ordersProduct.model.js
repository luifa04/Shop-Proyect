const {Model,DataTypes,Sequelize} = require('sequelize')
const {PRODUCT_TABLE} = require('./product.model')
const {ORDERS_TABLE} = require('./order.model')


const ORDERSPRODUCT_TABLE = 'orders_product';

const OrdersProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate:{
      min: 0,
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  orderId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    References:{
      model: ORDERS_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  productId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    References:{
      model:PRODUCT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class OrdersProduct extends Model{
  static associate(){
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: ORDERSPRODUCT_TABLE,
      modelName: 'OrdersProducts',
      timestamps: false,
    }
  }
}

module.exports = {OrdersProduct, OrdersProductSchema, ORDERSPRODUCT_TABLE}
