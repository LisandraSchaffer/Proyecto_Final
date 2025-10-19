const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connection = require('./config/db');

const carritoRoutes = require('./routes/carrito');
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');

const app = express();

// --- CONFIGURACIÓN DE MIDDLEWARES ---

// 1. Configuración CORS DETALLADA (Permite que el frontend en 5173 se conecte)
app.use(cors({
  origin: 'http://localhost:5173', // Confirma que tu React está en este puerto (Vite)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));


// 2. Logging de peticiones
app.use(morgan('dev'));

// 3. Manejo de JSON (Solo se ejecuta si la petición NO es multipart/form-data)
app.use(express.json());

// 4. Servicio de archivos estáticos (Para servir las imágenes subidas)
app.use('/uploads', express.static('uploads'));

// --- RUTAS ---
app.use('/api/auth', authRoutes);
app.use('/api/auth/carrito', carritoRoutes);

// Las rutas de productos, donde Multer interceptará 'multipart/form-data',
// se definen aquí, después de express.json.
app.use('/api/productos', productosRoutes);

// Ruta base
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
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