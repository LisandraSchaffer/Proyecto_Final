const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Lógica para el inicio de sesión (admin o usuario)
exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE username = ?';
  
  connection.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });
    if (results.length === 0) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }
    
    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    // Generar token con rol incluido
    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      'MiClaveSecreta',
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
};

// Lógica para obtener el perfil (respuesta distinta según el rol)
exports.getPerfil = (req, res) => {
  const { username, rol } = req.user;

  if (rol === 'admin') {
    res.json({
      message: `Bienvenido administrador ${username}. Esta es tu ruta protegida.`,
      acceso: 'completo',
      rol: 'admin'
    });
  } else {
    res.json({
      message: `Hola ${username}, esta es tu ruta protegida como usuario.`,
      acceso: 'limitado',
      rol: 'user'
    });
  }
};
