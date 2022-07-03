const {Model,DataTypes,Sequelize, ForeignKeyConstraintError} = require('sequelize')
const bcrypt= require('bcrypt');

const USER_TABLE = 'users';

const UserSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate:{
      isEmail: true,
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
    validate:{
      min: 5,
      max: 20
    }
  },
  recoveryToken: {
    field: 'recovery_token',
    allowNull: true,
    type: DataTypes.STRING
  },
  role: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class User extends Model{
  static associate(models){
    this.hasOne(models.Customer,{
      as:'customer',
      foreignKey: 'userId'
    });;
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false,
      // hooks: {
      //   beforeCreate: async (user, options) => {
      //     const password = await bcrypt.hash(user.password, 10);
      //     user.password = password;
      //   },
      // }
    }
  }
}

module.exports = {User, USER_TABLE, UserSchema}
