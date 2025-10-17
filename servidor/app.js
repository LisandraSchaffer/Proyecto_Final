const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./config/db'); 

const carritoRoutes = require('./routes/carrito'); 
const authRoutes = require('./routes/auth'); 
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

// Configuración CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // agregué PUT, DELETE y OPTIONS para el CRUD
  credentials: true, // permite enviar cookies y headers de autorización
  allowedHeaders: ['Content-Type', 'Authorization'], // permitir Authorization header
}));

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Rutas
app.use('/api/auth', authRoutes);          
app.use('/api/auth/carrito', carritoRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando correctamente 🚀');
});

// Manejo de errores genérico
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor.' });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
