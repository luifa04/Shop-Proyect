const express = require('express')
const categoriesService= require('./../service/categories.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {getCategorieSchema, updateCategorieSchema, createCategorieSchema} = require('./../schemas/categorie.shema')

const router = express.Router();
const service = new categoriesService();

router.get('/',async (req,res) =>{
  const users = await service.find();

   res.json(users);
 });

 router.get('/:id',
   validatorhandler(getCategorieSchema,'params'),
   async (req,res,next) =>{
   try {
     const { id } = req.params;
     const categorie = await service.findOne(id);

     res.json(categorie);
   } catch (error) {
     next(error);

   }
 });

 router.post('/',
   validatorhandler(createCategorieSchema,'body')
   ,async (req, res,next) => {
     try {
       const body = req.body
       const newCategorie = await service.create(body);

       res.status(201).json({newCategorie})
     } catch (error) {
       next(error);
     }

 })

 router.patch('/:id',
   validatorhandler(getCategorieSchema,'params'),
   validatorhandler(updateCategorieSchema,'body')
   ,async (req, res,next)=>{
     try {
       const body = req.body;
       const {id}= req.params;

       res.json(await service.update(id,body));
     } catch (error) {
      next(error)
     }
 })

 router.delete('/:id',
   validatorhandler(getCategorieSchema,'params'),
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
