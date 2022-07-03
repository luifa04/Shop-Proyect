const UserService = require('./users.service')
const bcrypt = require('bcrypt')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')
const {config} = require('./../config/config')
const nodeMailer = require('nodemailer')


const service = new UserService;

class authService{
  async getUser(email, password){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized()
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(isMatch === false){
      throw boom.unauthorized()
    }
    delete user.dataValues.password
    return user;
  }

  singToken(user){
    const payload = {
         sub: user.id,
         role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return({
         user,
         token
    })
  }

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if(!user){
      throw boom.unauthorized()
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, {expiresIn: '15min'});
    const link = `http://myfronend.com/recovery?recovery=${token}`;
    await service.update(user.id , {recoveryToken: token});
    const mail= {
      from: config.email,
      to: user.email,
      subject: "correo prueba",
      html: `<b>link for recovery your password = ${link} </b>`,
    }
    const rta = await this.sendEmail(mail)
    return rta;
  }

  async changePassword(token, newPassword){
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub)
      if(user.recoveryToken !== token){
        throw boom.unauthorized()
      }
      const hash = await bcrypt.hash(newPassword, 10)
      await service.update(user.id , {recoveryToken: null , password: hash})
      return {message: "your password was changed"}
    } catch (error) {
     throw boom.unauthorized()
    }
  }

  async sendEmail(infoEmail){
    const transporter = nodeMailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth:{
        user: config.email,
        pass: config.passwordEmail
      }
    })
    await transporter.sendMail(infoEmail);
    return { message: 'mail sended'};
  }
}

module.exports = authService;
