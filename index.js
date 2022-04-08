const express = require('express')
const cors = require('cors');
const routerApi = require('./routers');
const {logErrors, handler, boomHandler} = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3005


app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

routerApi(app);


//al dejar esto asi, queda una api publica
app.use(cors());
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

app.use(logErrors);
app.use(boomHandler);
app.use(handler);
