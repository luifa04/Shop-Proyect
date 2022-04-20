const boom = require('@hapi/boom')

const getConnection= require('./../libs/postgres')
const {models} = require('./../libs/sequelize')


class CategorieService {
  constructor(){}

  async create(data){
    const newCategorie = await models.Categorie.create(data);
    return newCategorie;
  }

  async update(id, changes){
    const categorie = await this.findOne(id);
    const rta = await categorie.update(changes);
    return rta;
  }

  async find(){
    const rta = await models.Categorie.findAll();
    return rta;
  }

  async findOne(id){
    const categorie = await models.Categorie.findByPk(id,{
      include:'products'
    });
    if(!categorie){
      throw boom.notFound("Category not found");
    }
    return categorie;
  }

  async delete(id){
    const categorie = await this.findOne(id);
    await categorie.destroy();
    return {id};
  }
}

module.exports = CategorieService;
