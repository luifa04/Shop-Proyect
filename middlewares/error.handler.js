function logErrors(err, req, res, next){
 console.log(err)
 next(err)
}

function boomHandler(err, req, res, next){
  if(err.isBoom){
    const {output} = err;
    res.status(output.statusCode).json(output.payload)
  }
  next(err);
}

function handler(err, req, res, next){
  console.log('erro handler')
 res.status(500).json({
   message: err.message,
   stack: err.stack
 })
}

module.exports = {logErrors, handler, boomHandler}
