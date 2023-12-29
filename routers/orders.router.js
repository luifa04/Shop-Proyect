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

 /**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Obtener un pedido por ID
 *     description: Obtiene información detallada de un pedido por su ID.
 *     tags:
 *       - Orders
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del pedido obtenidos exitosamente.
 *       404:
 *         description: Pedido no encontrado.
 */
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

 /**
 * @swagger
 * /orders:
 *   post:
 *     summary: Crear un nuevo pedido
 *     description: Crea un nuevo pedido.
 *     tags:
 *       - Orders
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'  # Reemplaza con la referencia al esquema de tu pedido
 *     responses:
 *       201:
 *         description: Pedido creado exitosamente.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 */
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

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Eliminar un pedido por ID
 *     description: Elimina un pedido por su ID.
 *     tags:
 *       - Orders
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del pedido a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Pedido eliminado exitosamente.
 *       404:
 *         description: Pedido no encontrado.
 */
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
