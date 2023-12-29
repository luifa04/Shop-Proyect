const express = require('express')
const cors = require('cors');
const routerApi = require('./routers');
const {logErrors, handler, boomHandler} = require('./middlewares/error.handler')
const swaggerDocs = require('./routers/swagger');
const path = require('path');

const app = express()
const port = process.env.PORT || 3005

const {checkApiKey}= require('./middlewares/auth.handler');

const passport = require('passport');
app.use(passport.initialize());

app.use(express.json());


app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  swaggerDocs(app)
})


//al dejar esto asi, queda una api publica
// app.use(cors());
//si quiero limir el acceso a determinados origenes hay que hacer la configuracion de abajo
// const whiteList=['http://localhost:8080','puedo seguir agregando origenes']
// const options = {
//   origin: (origin, callback) =>{
//      if(whiteList.includes(origin) || !origin ){
//         callback(null, true);
//      }else{
//        callback(new Error('acceso no permitido'));
//      }
//   }
// }
// app.use(cors(options));

routerApi(app);

require('./utils/auth')

app.use(logErrors);
app.use(boomHandler);
app.use(handler);
