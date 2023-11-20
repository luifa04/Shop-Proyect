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
