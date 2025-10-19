const controller = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Importar los middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Ruta de login (acceso para todos)
router.post('/login', controller.login);

// Ruta de registro 
router.post('/registro', controller.registerUsuario);

// Ruta protegida solo para administradores
router.get('/admin/dashboard', authMiddleware, isAdmin, (req, res) => {
  res.json({ mensaje: 'Bienvenido al panel de administración' });
});

// Ruta protegida solo para clientes
router.get('/cliente/perfil', authMiddleware, (req, res) => {
  if (req.usuario.rol !== 'cliente') {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  res.json({ mensaje: 'Este es tu perfil como cliente' });
});

module.exports = router;