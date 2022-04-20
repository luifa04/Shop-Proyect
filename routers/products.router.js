const express = require('express')
const productsService= require('./../service/products.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {queryProductSchema,createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/Product.schema')

const router = express.Router();
const service = new productsService();

router.get('/',
  validatorhandler(queryProductSchema,'query')
  ,async (req,res,next) =>{
  try {
    const query = req.query;
    const products = await service.find(query);

    res.json(products);
  } catch (error) {
    next(error);
  }

});

router.get('/:id',
  validatorhandler(getProductSchema,'params'),
  async (req,res,next) =>{
  try {
    const { id } = req.params;
    const product = await service.findOne(id);

    res.json(product);
  } catch (error) {
    next(error);

  }
});

router.post('/',
  validatorhandler(createProductSchema,'body')
  ,async (req, res,next) => {
    try {
      const body = req.body
      const newProduct = await service.create(body);

      res.status(201).json({newProduct})
    } catch (error) {
      next(error);
    }
})

router.patch('/:id',
  validatorhandler(getProductSchema,'params'),
  validatorhandler(updateProductSchema,'body')
  ,async (req, res)=>{
  const body = req.body;
  const {id}= req.params;
  res.json(await service.update(id,body));
})

router.delete('/:id',
  validatorhandler(getProductSchema,'params'),
  (req, res)=>{
  const {id}= req.params;
  res.json(service.delete(id));
})

module.exports = router;