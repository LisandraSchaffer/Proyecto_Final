const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Importar los middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Ruta de login (acceso para todos)
router.post('/login', (req, res) => {
  const { email, username, password } = req.body;
  const identificador = email || username;

  const query = 'SELECT id FROM usuarios WHERE (email = ? OR username = ?) AND password = ?';
  connection.query(query, [identificador, identificador, password], (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos.' });
    if (resultados.length === 0) return res.status(401).json({ error: 'Credenciales inválidas.' });

    const usuarioId = resultados[0].id;
    const token = jwt.sign({ id: usuarioId }, 'MiClaveSecreta', { expiresIn: '1h' });
    res.json({ token });
  });
});

// Ruta de registro 
const authController = require('../controllers/auth');
router.post('/registro', authController.registerUsuario);

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
