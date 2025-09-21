const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// Lógica para el inicio de sesión del administrador
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
    
    const token = jwt.sign({ id: user.id }, 'MiClaveSecreta', { expiresIn: '1h' });
    res.json({ token });
  });
};

// Lógica para obtener el perfil del administrador
exports.getPerfil = (req, res) => {
  //Lógica de middleware de autenticación
  res.json({ message: 'Ruta de perfil protegida. Funciona con JWT.' });
};