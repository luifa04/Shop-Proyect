const express = require('express')
const ordersProductsService= require('./../service/ordersProducts')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {addItemSchema } = require('./../schemas/orderProduct.schema')

const router = express.Router();
const service = new ordersProductsService();

router.get('/',async (req,res) =>{
 const ordersProducts = await service.find();

  res.json(ordersProducts);
});

router.get('/:id',
  async (req,res,next) =>{
  try {
    const { id } = req.params;
    const item = await service.findOne(id);

    res.json(item);
  } catch (error) {
    next(error);

  }
});

router.post('/',
  validatorhandler(addItemSchema,'body')
  ,async (req, res,next) => {
    try {
      const body = req.body
      const newItem = await service.create(body);

      res.status(201).json({newItem})
    } catch (error) {
      next(error);
    }
})

module.exports = router;
