const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop-Proyect',
      version: '1.0.0'
    },
  },
  // Rutas de archivos con JSDoc
  apis: ['./routers/*.js'],
};


const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = {swaggerDocs}
