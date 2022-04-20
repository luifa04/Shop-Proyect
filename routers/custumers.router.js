const express = require('express')
const CustomerService= require('./../service/customers.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {getCustomerSchema, updateCustomerSchema, createCustomerSchema} = require('./../schemas/costumer.schema')

const router = express.Router();
const service = new CustomerService();

router.get('/',async (req,res) =>{
  const customers = await service.find();

   res.json(customers);
 });

 router.get('/:id',
   validatorhandler(getCustomerSchema,'params'),
   async (req,res,next) =>{
   try {
     const { id } = req.params;
     const customer = await service.findOne(id);

     res.json(customer);
   } catch (error) {
     next(error);

   }
 });

 router.post('/',
   validatorhandler(createCustomerSchema,'body')
   ,async (req, res,next) => {
     try {
       const body = req.body
       const newCustomer = await service.create(body);

       res.status(201).json({newCustomer})
     } catch (error) {
       next(error);
     }

 })

 router.patch('/:id',
   validatorhandler(getCustomerSchema,'params'),
   validatorhandler(updateCustomerSchema,'body')
   ,async (req, res,next)=>{
     try {
       const body = req.body;
       const {id}= req.params;
       const rta = await service.update(id,body)
       res.json(rta);
     } catch (error) {
      next(error)
     }
 })

 router.delete('/:id',
   validatorhandler(getCustomerSchema,'params'),
   async (req, res,next)=>{
     try {
       const {id}= req.params;
       await service.delete(id);
       res.status(201).json({id});
     } catch (error) {
       next(error)
     }
 })

module.exports = router;
