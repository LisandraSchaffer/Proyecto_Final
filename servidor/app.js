const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./config/db'); 

const carritoRoutes = require('./routes/carrito'); 
const authRoutes = require('./routes/auth'); 
const authMiddleware = require('./middlewares/authMiddleware');

const app = express();

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
