const express = require('express');
const router = express.Router();

// Importar el controlador de autenticación
const authController = require('../controllers/auth');

// Rutas de autenticación
router.post('/login', authController.login);
router.get('/perfil', authController.getPerfil);

module.exports = router;