const joi= require('joi')

const id= joi.number().integer();
const name= joi.string().min(5).max(15);
const image = joi.string().uri();


const createCategorieSchema = joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorieSchema = joi.object({
  name: name,
  image: image,
});

const getCategorieSchema = joi.object({
  id: id.required(),
});

module.exports = {createCategorieSchema, updateCategorieSchema, getCategorieSchema}
