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

/**
 * @swagger
 * /items/{id}:
 *   get:
 *     summary: Obtener un ítem por ID
 *     description: Obtiene información detallada de un ítem por su ID.
 *     tags:
 *       - Items
 *     security: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del ítem
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del ítem obtenidos exitosamente.
 *       404:
 *         description: Ítem no encontrado.
 */
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

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Agregar un nuevo ítem
 *     description: Agrega un nuevo ítem.
 *     tags:
 *       - Items
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'  # Reemplaza con la referencia al esquema de tu ítem
 *     responses:
 *       201:
 *         description: Ítem creado exitosamente.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 */
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
