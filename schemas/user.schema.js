const joi= require('joi')

const id= joi.number().integer();
const email= joi.string().email();
const password = joi.string().min(8);
const role = joi.string().min(5);

const createUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = joi.object({
  email: email,
  password: password,
  role: role
});

const getUserSchema = joi.object({
  id: id.required(),
});

const changePassword = joi.object({
  password: password,
})

module.exports = {changePassword,getUserSchema, updateUserSchema, createUserSchema}
