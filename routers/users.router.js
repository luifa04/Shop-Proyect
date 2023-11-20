const express = require('express')
const userService= require('./../service/users.service')
const {validatorhandler} = require('./../middlewares/validator.handler')
const {getUserSchema, updateUserSchema, createUserSchema} = require('./../schemas/user.schema');
const { tr } = require('faker/lib/locales');

const router = express.Router();
const service = new userService();

router.get('/',async (req,res) =>{
 const users = await service.find();

  res.json(users);
});

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
 *      post:
 *        summary: Creates a user.
 *        tags: [Usuario]
 *        responses:
 *          '201':
 *            description: Created
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
