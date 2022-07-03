
const boom = require('@hapi/boom')

const getConnection= require('./../libs/postgres')
const {models} = require('./../libs/sequelize')
const bcrypt = require('bcrypt')

class usersService {
  constructor(){}

  async create(data){
    const hash = await bcrypt.hash(data.password,10)
    const newUser = await models.User.create({
       ...data,
      password: hash
    });
    //ahora eliminamos la contrasena para que no se envie
    delete newUser.dataValues.password;
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

  async findByEmail(email){
    const rta = await models.User.findOne({
      where : {email}
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
