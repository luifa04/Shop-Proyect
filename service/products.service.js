const faker = require('faker')
const boom = require('@hapi/boom')

class productsService {

  constructor(){
    this.products= [],
    this.generate()
  }

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
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id );
    if(index === -1){
      throw boom.notFound('product not found');
    }
    const producToChange = this.products[index];
    this.products[index]= {
      ...this.products[index],
      ...changes
    }
    return this.products[index];
  }

  async find(){
    // simula una consulta a la base de datos, simula el asincronismo
    // return new Promise((resolve, reject) =>{
    //   setTimeout(()=>{
    //     resolve(this.products)
    //   },5000)
    // })
    return this.products;
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id );
    if(!product){
      throw boom.notFound('product not found');
    }
    if(product.isBlock){
      throw boom.conflict('this product is block');
    }
    return product;
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id );
    if(index === -1){
      throw boom.notFound('product not found');
    }
    this.products.splice(index,1);
    return `deleted product with id=${id}`;
  }
}

module.exports = productsService;
