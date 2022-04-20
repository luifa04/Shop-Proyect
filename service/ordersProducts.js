const boom = require('@hapi/boom')

const getConnection= require('./../libs/postgres')
const {models} = require('./../libs/sequelize')


class ordersProductsService {

  async create(data){
    const newItem = await models.OrdersProducts.create(data);
    return newItem;
  }

  async find(){
    const rta = await models.OrdersProducts.findAll();
    return rta;
  }

  async findOne(id){
    const item = await models.OrdersProducts.findByPk(id);
    if(!item){
      throw boom.notFound("Item not found");
    }
    return item;
  }

}

module.exports = ordersProductsService;
