const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Configuración CORS
app.use(cors({
  origin: 'http://localhost:5173', // URL del frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // agregué PUT, DELETE y OPTIONS para el CRUD
  credentials: true, // permite enviar cookies y headers de autorización
  allowedHeaders: ['Content-Type', 'Authorization'], // permitir Authorization header
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos desde la carpeta uploads con ruta absoluta
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const db = require('./config/db');

// Importación de las rutas
const authRoutes = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const carritoRoutes = require('./routes/carrito');

// Usar las rutas
app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/carrito', carritoRoutes);

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});