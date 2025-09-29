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


module.exports = router;
