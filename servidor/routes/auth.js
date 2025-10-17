const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const connection = require('../config/db');

// Importar los middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Ruta de login (acceso para todos)
router.post('/login', (req, res) => {
  const { email, username, password } = req.body;
  const identificador = email || username;

  const query = 'SELECT * FROM usuarios WHERE email = ? OR username = ?';
  connection.query(query, [identificador, identificador], (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error en la base de datos.' });
    if (resultados.length === 0) return res.status(401).json({ error: 'Credenciales inválidas.' });

    const usuario = resultados[0];
    const coincide = bcrypt.compareSync(password, usuario.password);
    if (!coincide) return res.status(401).json({ error: 'Credenciales inválidas.' });

    const token = jwt.sign(
      { id: usuario.id, username: usuario.username, rol: usuario.rol },
      'MiClaveSecreta',
      { expiresIn: '1h' }
    );

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
