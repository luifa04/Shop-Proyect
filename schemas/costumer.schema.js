const joi= require('joi')

const id= joi.number().integer();
const name= joi.string().min(3).max(25);
const lastName = joi.string().min(3).max(25);
const phone = joi.string();
const userId= joi.number().integer();

const createCustomerSchema = joi.object({
  name: name.required(),
  phone: phone,
  lastName: lastName.required(),
  userId: userId.required(),
});

const updateCustomerSchema = joi.object({
  name: name,
  phone: phone,
  lastName: lastName,
  userId: userId
});

const getCustomerSchema = joi.object({
  id: id.required(),
});

module.exports = {getCustomerSchema, updateCustomerSchema, createCustomerSchema}
