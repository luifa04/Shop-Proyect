//esto es lo mismo que un DTO

const joi= require('joi')

const id= joi.string().uuid();
const name= joi.string().min(5).max(15).alphanum();
const price = joi.number().integer().min(0);

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
});

const getProductSchema = joi.object({
  id: id.required(),
});

module.exports = {createProductSchema, updateProductSchema, getProductSchema}
