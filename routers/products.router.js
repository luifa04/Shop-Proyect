const express = require('express')
const productsService= require('./../service/products.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {queryProductSchema,createProductSchema, updateProductSchema, getProductSchema} = require('./../schemas/Product.schema')

const router = express.Router();
const service = new productsService();

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener productos
 *     description: |
 *       Obtiene una lista de productos.
 *       Puedes filtrar los productos utilizando parámetros de consulta.
 *     security: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filtrar por categoría de productos.
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Filtrar por precio mínimo.
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Filtrar por precio máximo.
 *     responses:
 *       200:
 *         description: Lista de productos obtenida exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 name: "Producto 1"
 *                 category: "Electrónica"
 *                 price: 99.99
 *               - id: 2
 *                 name: "Producto 2"
 *                 category: "Ropa"
 *                 price: 49.99
 *       400:
 *         description: Error en los parámetros de la consulta.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     description: |
 *       Obtiene información detallada de un producto por su ID.
 *     security: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del producto obtenidos exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Producto 1"
 *               category: "Electrónica"
 *               price: 99.99
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: |
 *       Crea un nuevo producto en la tienda.
 *     security: []
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'  # Reemplaza con la referencia al esquema de tu producto
 *     responses:
 *       201:
 *         description: Producto creado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Nuevo Producto"
 *               category: "Electrónica"
 *               price: 99.99
 *       400:
 *         description: Error en los datos de entrada.
 *       500:
 *         description: Error interno del servidor.
 */
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

/**
 * @swagger
 * /products/{id}:
 *   patch:
 *     summary: Actualizar un producto por ID
 *     description: |
 *       Actualiza la información de un producto por su ID.
 *     security: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'  # Reemplaza con la referencia al esquema de tu producto
 *     responses:
 *       200:
 *         description: Producto actualizado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               name: "Producto Actualizado"
 *               category: "Electrónica"
 *               price: 129.99
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id',
  validatorhandler(getProductSchema,'params'),
  validatorhandler(updateProductSchema,'body')
  ,async (req, res)=>{
  const body = req.body;
  const {id}= req.params;
  res.json(await service.update(id,body));
})

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto por ID
 *     description: |
 *       Elimina un producto por su ID.
 *     security: []
 *     tags:
 *       - Products
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               message: "Producto eliminado correctamente"
 *       404:
 *         description: Producto no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id',
  validatorhandler(getProductSchema,'params'),
  (req, res)=>{
  const {id}= req.params;
  res.json(service.delete(id));
})

module.exports = router;
