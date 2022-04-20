//esto es lo mismo que un DTO

const joi= require('joi')

const id= joi.number().integer();
const name= joi.string().min(5).max(25);
const price = joi.number().integer().min(0);
const image = joi.string().uri();
const description = joi.string().min(10);
const categorieId= joi.number().integer();

const limit= joi.number().integer();
const offset= joi.number().integer();
const price_min= joi.number().integer();
const price_max= joi.number().integer();

const createProductSchema = joi.object({
  name: name.required(),
  image: image.required(),
  description: description.required(),
  price: price.required(),
  categorieId: categorieId.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categorieId: categorieId
});

const getProductSchema = joi.object({
  id: id.required(),
});

const queryProductSchema = joi.object({
  price,
  limit,
  offset,
  price_min,
  //aca hago que price_max sea requerido solo si
  //price_min es pasado como query
  price_max: price_max.when('price_min',{
    is: joi.number().integer().required(),
    then: joi.required(),
  })
  //hacer lo de arriba es igual a:
  //limit: limit,
  //offset: offset
});

module.exports = {queryProductSchema,createProductSchema, updateProductSchema, getProductSchema}
