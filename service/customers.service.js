const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const getConnection= require('./../libs/postgres')
const {models} = require('./../libs/sequelize')


class customersService {

  async create(data){
    const hash = await bcrypt.hash(data.user.password,10)
    const newData = {
      ...data,
      user:{
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData,{
      include: ['user']
    });
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes){
    const customer = await this.findOne(id);
    const rta = await customer.update(changes);
    return rta;
  }

  async find(){
    const rta = await models.Customer.findAll({
      include: ['user']
    });

    return rta;
  }

  async findOne(id){
    const customer = await models.Customer.findByPk(id,{
      include:'orders'
    });
    if(!customer){
      throw boom.notFound("customer not found");
    }
    return customer;
  }

  async delete(id){
    const customer = await this.findOne(id);
    await customer.destroy();
    return {id};
  }
}

module.exports = customersService;
