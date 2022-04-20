const faker = require('faker')
const boom = require('@hapi/boom')
const { Op } = require("sequelize");

const getConnection= require('./../libs/postgres')
const {models} = require('./../libs/sequelize')


class productsService {

  constructor(){}

  generate(){
    const limit =  100;

    for (let i = 0; i< limit ; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        Image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      })
    }
  }

  async create(data){
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async update(id, changes){
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  async find(query){
    const options = {
      include: 'categorie',
      where: {}
    }
    const {limit , offset, price_min, price_max} = query;
    if(limit && offset){
      options.limit = limit;
      options.offset = offset;
    }
    if(price_min && price_max){
      options.where.price ={
        [Op.between]:[price_min, price_max]
      }
    }
    const rta = await models.Product.findAll(options);
    return rta;
  }

  async findOne(id){
    const product = await models.Product.findByPk(id);
    if(!product){
      throw boom.notFound("Product not found");
    }
    return product;
  }

  async delete(id){
    const product = await this.findOne(id);
    await product.destroy();
    return {id};
  }
}

module.exports = productsService;
