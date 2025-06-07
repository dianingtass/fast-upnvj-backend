const path = require('path');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API FAST UPNVJ',
      version: '1.0.0',
      description: 'Dokumentasi API untuk sistem peminjaman fasilitas di kampus',
    },
    servers: [
      { url: 'https://fast-upnvj-backend.vercel.app/' },
      { url: 'https://localhost:3000/' },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      },
      schemas: {
        // ... (schemas tetap sama seperti yang Anda tulis)
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: [path.join(__dirname, '../routes/*.js')], // ← path absolute, lebih aman
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
