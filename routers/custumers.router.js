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


 /**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Obtener un cliente por ID
 *     description: Obtiene información detallada de un cliente por su ID.
 *     tags:
 *       - Customers
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del cliente obtenidos exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 */
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

 /**
 * @swagger
 * /customers:
 *   post:
 *     summary: Crear un nuevo cliente
 *     description: Crea un nuevo cliente.
 *     tags:
 *       - Customers
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'  # Reemplaza con la referencia al esquema de tu cliente
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 */
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

 /**
 * @swagger
 * /customers/{id}:
 *   patch:
 *     summary: Actualizar un cliente por ID
 *     description: Actualiza información de un cliente por su ID.
 *     tags:
 *       - Customers
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Customer'  # Reemplaza con la referencia al esquema de tu cliente
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 */
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

 /**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Eliminar un cliente por ID
 *     description: Elimina un cliente por su ID.
 *     tags:
 *       - Customers
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Cliente eliminado exitosamente.
 *       404:
 *         description: Cliente no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
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
