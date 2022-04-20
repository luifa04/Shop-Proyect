const {Model,DataTypes,Sequelize} = require('sequelize')
const {CUSTOMER_TABLE} = require('./customer.model')

const ORDERS_TABLE = 'orders';

const OrdersSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  customerId:{
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'customer_id',
    References:{
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  }
}

class Orders extends Model{
  static associate(models){
    this.belongsTo(models.Customer,{
      as:'customer',
    })
    this.belongsToMany(models.Product, {
      as:'items',
      through: models.OrdersProducts,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: ORDERS_TABLE,
      modelName: 'Order',
      timestamps: false,
    }
  }
}

module.exports = {Orders, OrdersSchema, ORDERS_TABLE}
