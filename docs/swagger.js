const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'FAST UPNVJ API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi API untuk Backend FAST UPNVJ Capstone Project.',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/*.js')], // ← path absolute, lebih aman
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;