const express = require('express')
const passport =require('passport')
const AuthService = require('./../service/auth.service')
const {validatorhandler} = require('./../middlewares/validator.handler');
const { changePassword } = require('../schemas/user.schema');

const router = express.Router();
const service = new AuthService;

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *     responses:
 *       '201':
 *         description: Logged in
 */
router.post('/login',
  passport.authenticate('local', {session: false})
   ,async (req, res,next) => {
     try {
      console.log(req.user)
       const user = req.user;
        res.json(service.singToken(user))
     } catch (error) {
       next(error);
     }
})

/**
 * @swagger
 * /auth/recovery:
 *   post:
 *     summary: Enviar solicitud de recuperación de cuenta
 *     tags: [Auth]
 *     security: []
 *     description: Envia un correo electrónico de recuperación de cuenta al usuario.
 *     requestBody:
 *       description: Datos de entrada para la solicitud de recuperación.
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
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Solicitud de recuperación enviada exitosamente.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 *       404:
 *         description: Usuario no encontrado.
 */
router.post('/recovery',
  async (req, res,next) => {
     try {
       const {email} = req.body;
       const rta = await service.sendRecovery(email)
        res.json(rta)
     } catch (error) {
       next(error);
     }
})


/**
 * @swagger
 * /auth/changePassword:
 *   post:
 *     summary: Cambiar la contraseña del usuario
 *     tags: [Auth]
 *     security: []
 *     description: Cambia la contraseña del usuario utilizando un token de recuperación.
 *     requestBody:
 *       description: Datos de entrada para cambiar la contraseña.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: Token de recuperación enviado al usuario.
 *               newPassword:
 *                 type: string
 *                 description: Nueva contraseña del usuario.
 *             required:
 *               - token
 *               - newPassword
 *     responses:
 *       200:
 *         description: Contraseña cambiada exitosamente.
 *       400:
 *         description: Datos de entrada incorrectos o incompletos.
 *       401:
 *         description: Token de recuperación no válido.
 *       404:
 *         description: Usuario no encontrado.
 */
router.post('/changePassword',
 // validatorhandler(changePassword,'body')
   async (req, res,next) => {
     try {
       const {token, newPassword} = req.body;
       const rta = await service.changePassword(token, newPassword)
        res.json(rta)
     } catch (error) {
       next(error);
     }
})


module.exports = router;
