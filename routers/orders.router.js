const express = require('express')
const ordersService= require('./../service/orders.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {createOrderSchema, getOrderSchema } = require('./../schemas/order.schema')

const router = express.Router();
const service = new ordersService();

router.get('/',async (req,res) =>{
  const orders = await service.find();

   res.json(orders);
 });

 router.get('/:id',
   validatorhandler(getOrderSchema,'params'),
   async (req,res,next) =>{
   try {
     const { id } = req.params;
     const order = await service.findOne(id);

     res.json(order);
   } catch (error) {
     next(error);

   }
 });

 router.post('/',
   validatorhandler(createOrderSchema,'body')
   ,async (req, res,next) => {
     try {
       const body = req.body
       const newOrder = await service.create(body);

       res.status(201).json({newOrder})
     } catch (error) {
       next(error);
     }

 })

//  router.patch('/:id',
//    validatorhandler(getUserSchema,'params'),
//    validatorhandler(updateUserSchema,'body')
//    ,async (req, res,next)=>{
//      try {
//        const body = req.body;
//        const {id}= req.params;
//        res.json(await service.update(id,body));
//      } catch (error) {
//       next(error)
//      }
//  })

 router.delete('/:id',
   validatorhandler(getOrderSchema,'params'),
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
