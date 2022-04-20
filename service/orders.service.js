const boom = require('@hapi/boom');

const getConnection= require('./../libs/postgres')
const {models} = require('./../libs/sequelize')


class ordersService {

  constructor(){}

  async create(data){
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  // async update(id, changes){
  //   const order = await this.findOne(id);
  //   const rta = await order.update(changes);
  //   return rta;
  // }

  async find(){
    const rta = await models.Order.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id){
    const order = await models.Order.findByPk(id,{
      include:[
        {
          association:'customer',
          include:['user']
        },
       'items'
      ]
    });
    if(!order){
      throw boom.notFound("Order not found");
    }
    return order;
  }

  async delete(id){
    const order = await this.findOne(id);
    await order.destroy();
    return {id};
  }
}

module.exports = ordersService;
