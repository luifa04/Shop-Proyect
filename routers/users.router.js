const express = require('express')
const userService= require('./../service/users.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {getUserSchema, updateUserSchema, createUserSchema} = require('./../schemas/user.schema');
const { tr } = require('faker/lib/locales');

const router = express.Router();
const service = new userService();


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuario]
 *     security: []
 *     description: Obtiene una lista de todos los usuarios registrados.
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 email: "usuario1@example.com"
 *               - id: 2
 *                 email: "usuario2@example.com"
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/',async (req,res) =>{
 const users = await service.find();

  res.json(users);
});


/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuario]
 *     security: []
 *     description: Obtiene información detallada de un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del usuario obtenidos exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: "usuario1@example.com"
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id',
  validatorhandler(getUserSchema,'params'),
  async (req,res,next) =>{
  try {
    const { id } = req.params;
    const user = await service.findOne(id);

    res.json(user);
  } catch (error) {
    next(error);

  }
});

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuario]
 *     description: Crea un nuevo usuario en el sistema.
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               role:
 *                 type: string
 *                 enum: [customer, admin]  # Asegúrate de que los roles sean los permitidos en tu aplicación
 *                 description: Rol del usuario.
 *             required:
 *               - email
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: "mateolopez1646@yahoo.com"
 *               role: "customer"
 *       400:
 *         description: Error en los datos de entrada.
 *       500:
 *         description: Error interno del servidor.
 */
router.post('/',
  validatorhandler(createUserSchema,'body')
  ,async (req, res,next) => {
    try {
      const body = req.body
      const newUser = await service.create(body);

      res.status(201).json({newUser})
    } catch (error) {
      next(error);
    }

})

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuario]
 *     security: []
 *     description: Actualiza información de un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'  # Asegúrate de tener una referencia adecuada al esquema de tu usuario
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               email: "usuario_actualizado@example.com"
 *       404:
 *         description: Usuario no encontrado.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 *       500:
 *         description: Error interno del servidor.
 */
router.patch('/:id',
  validatorhandler(getUserSchema,'params'),
  validatorhandler(updateUserSchema,'body')
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
 * /users/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuario]
 *     security: []
 *     description: Elimina un usuario por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Usuario eliminado exitosamente.
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete('/:id',
  validatorhandler(getUserSchema,'params'),
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
