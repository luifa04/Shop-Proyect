const { Strategy }= require('passport-local')
const boom = require('@hapi/boom')
const AuthService = require('./../../../service/auth.service');
const bcrypt = require('bcrypt')


const service = new AuthService;

const localStrategy = new Strategy({
  usernameField : 'email',
  passwordField : 'password'
}
  ,async (email, password,done) =>{
  try {
    const user = await service.getUser(email, password);
    done(null,user)
  } catch (error) {
    done(error, false)
  }
})

module.exports = localStrategy;
