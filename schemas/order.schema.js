const joi= require('joi')

const id= joi.number().integer();
const customerId = joi.number().integer();

const createOrderSchema = joi.object({
  customerId: customerId.required(),
});

const getOrderSchema = joi.object({
  id: id.required(),
});

module.exports = {getOrderSchema, createOrderSchema}
