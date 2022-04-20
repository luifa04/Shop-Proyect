
const boom = require('@hapi/boom')

const getConnection= require('./../libs/postgres')
const {models} = require('./../libs/sequelize')


class usersService {
  constructor(){}

  async create(data){
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, changes){
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async find(){
    const rta = await models.User.findAll({
      include: ['customer']
    });
    return rta;
  }

  async findOne(id){
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound("user not found");
    }
    return user;
  }

  async delete(id){
    const user = await this.findOne(id);
    await user.destroy();
    return {id};
  }
}

module.exports = usersService;
