const {Model,DataTypes,Sequelize} = require('sequelize')

const CATEGORIES_TABLE = 'categories';

const CategoriesSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Categories extends Model{
  static associate(models){
    this.hasMany(models.Product, {
      as:'products',
      foreignKey: 'categorieId'
    });
  }

  static config(sequelize){
    return{
      sequelize,
      tableName: CATEGORIES_TABLE,
      modelName: 'Categorie',
      timestamps: false,
    }
  }
}

module.exports = {Categories,CategoriesSchema, CATEGORIES_TABLE, }
