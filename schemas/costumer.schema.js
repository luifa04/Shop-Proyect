const joi= require('joi');

const id= joi.number().integer();
const name= joi.string().min(3).max(25);
const lastName = joi.string().min(3).max(25);
const phone = joi.string();
const userId= joi.number().integer();
const email = joi.string().email();
const password =joi.string();

const createCustomerSchema = joi.object({
  name: name.required(),
  phone: phone.required(),
  lastName: lastName.required(),
  user: joi.object({
    email: email.required(),
    password: password.required()
  }),
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
