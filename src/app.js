const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index');
require('./db.js');

const server = express();
server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

// Configuración de CORS usando cors middleware
server.use(cors({
  origin: ['http://localhost:3000',
    'https://cliente-eta.vercel.app',
// 'https://5063-181-5-239-36.ngrok-free.app'
  
  ], // Permitir solicitudes solo desde tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  credentials: true // Permitir envío de cookies o autenticación
}));

server.use('/', router);

// Manejo de errores
server.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
