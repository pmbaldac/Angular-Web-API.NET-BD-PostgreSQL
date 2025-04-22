const express = require('express');
const cors = require('cors');
const app = express();

var allowedOrigins = ['http://localhost:4200',
    'http://localhost:9096/api/ENI_LINKED_ORDERS_ECOM'];

// Configuración de CORS
app.use(cors({
  origin: 'http://localhost:4200', // Permitir solicitudes desde este origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
  credentials: true,
  exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar']
}));

// Ruta de la API
app.get('/api/ENI_LINKED_ORDERS_ECOM', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); // Asegurar que el encabezado esté presente
  res.json([
    // Tu respuesta JSON aquí
  ]);
});

// Iniciar el servidor
app.listen(9096, () => {
  console.log('Server running on port 9096');
});