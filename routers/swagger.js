const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Shop-Project',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        jwt: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
        },
      },
    },
    security: [
      {
        jwt: [],
      },
    ],
  },
  // Rutas de archivos con JSDoc
  apis: ['./routers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    swaggerOptions: {
      // Mostrar el botón de "Authorize" por defecto
      plugins: [
        {
          statePlugins: {
            spec: {
              wrapSelectors: {
                allowTryItOutFor: () => () => true,
              },
            },
          },
        },
      ],
      // Configuración adicional para el botón de "Authorize"
      displayOperationId: true,
    },
  }));
};

module.exports = swaggerDocs;

