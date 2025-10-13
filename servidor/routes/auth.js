const express = require('express');
const router = express.Router();

// Importar el controlador de autenticación
const authController = require('../controllers/auth');

// Importar los middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Ruta de login (acceso para todos)
router.post('/login', authController.login);

// Ruta de registro 
router.post('/registro', authController.registerUsuario);

// Exportar el router al final
module.exports = router;
