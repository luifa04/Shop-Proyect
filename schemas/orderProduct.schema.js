const joi= require('joi')

const orderId= joi.number().integer();
const productId = joi.number().integer();
const amount = joi.number().integer().min(0);


const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required()
});

module.exports = {addItemSchema}
