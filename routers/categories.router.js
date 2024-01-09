const express = require('express')
const categoriesService= require('./../service/categories.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {getCategorieSchema, updateCategorieSchema, createCategorieSchema} = require('./../schemas/categorie.shema')
const passport= require('passport')
const {checkRoles} = require('./../middlewares/auth.handler')


const router = express.Router();
const service = new categoriesService();

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Obtener todas las categorías
 *     tags: [Categorias]
 *     description: Obtiene todas las categorías disponibles.
 *     security:
 *       - jwt: []
 *       - roles: ['admin', 'customer']
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *
 */
router.get('/'
  ,passport.authenticate('jwt', {session: false})
  ,checkRoles('admin' , 'customer')
  ,async (req,res) =>{
  const categories = await service.find();

   res.json(categories);
 });

 /**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Obtener una categoría por ID
 *     description: Obtiene información detallada de una categoría por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     tags:
 *       - Categorias
 *     security: []
 *     responses:
 *       200:
 *         description: Detalles de la categoría obtenidos exitosamente.
 *       404:
 *         description: Categoría no encontrada.
 */
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


 /**
 * @swagger
 * /categories:
 *   post:
 *     summary: Crear una nueva categoría
 *     description: Crea una nueva categoría. Requiere autenticación JWT y rol de administrador.
 *     security:
 *       - jwt: []
 *       - roles: ['admin']
 *     tags:
 *       - Admin Only
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categorie'
 *     responses:
 *       201:
 *         description: Categoría creada exitosamente.
 *       401:
 *         description: No autorizado, se requiere autenticación JWT y rol de administrador.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 */
 router.post('/',
    passport.authenticate('jwt', {session: false})
    ,checkRoles('admin')
   ,validatorhandler(createCategorieSchema,'body')
   ,async (req, res,next) => {
     try {
       const body = req.body
       const newCategorie = await service.create(body);

       res.status(201).json({newCategorie})
     } catch (error) {
       next(error);
     }

 })

/**
 * @swagger
 * /categories/{id}:
 *   patch:
 *     summary: Actualizar una categoría por ID
 *     description: Actualiza información de una categoría por su ID.
 *     security: []
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categorie'
 *     responses:
 *       200:
 *         description: Categoría actualizada exitosamente.
 *       404:
 *         description: Categoría no encontrada.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 */
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

 /**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Eliminar una categoría por ID
 *     description: Elimina una categoría por su ID.
 *     tags:
 *       - Categorias
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la categoría a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Categoría eliminada exitosamente.
 *       404:
 *         description: Categoría no encontrada.
 */
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
