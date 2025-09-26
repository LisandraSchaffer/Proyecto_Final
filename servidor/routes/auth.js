const express = require('express');
const router = express.Router();

// Importar el controlador de autenticación
const authController = require('../controllers/auth');

// Importar los middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Ruta de login (acceso para todos)
router.post('/login', authController.login);

// Ruta protegida solo para administradores
router.get('/admin/perfil', authMiddleware, isAdmin, authController.getPerfil);

// Ruta protegida para cualquier usuario logueado
router.get('/usuario/perfil', authMiddleware, authController.getPerfil);

module.exports = router;
