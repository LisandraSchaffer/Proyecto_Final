const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

// LOGIN
exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE username = ?';

  connection.query(sql, [username], (err, results) => {
    if (err) {
      console.error('Error en login:', err);
      return res.status(500).json({ error: 'Error del servidor.' });
    }

    if (
      results.length === 0 ||
      !bcrypt.compareSync(password, results[0].password)
    ) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos.' });
    }

    const user = results[0];
    const token = jwt.sign(
      { id: user.id, username: user.username },
      'MiClaveSecreta',
      { expiresIn: '1h' }
    );

    console.log('Login exitoso para:', user.username);
    res.json({ token });
  });
};

// REGISTRO
exports.registerUsuario = async (req, res) => {
  const { username, email, contraseña, confirmarContraseña } = req.body;
 

  // Validaciones
  if (!username || !email || !contraseña || !confirmarContraseña) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      error: 'El nombre de usuario debe tener entre 3 y 20 caracteres, sin espacios ni símbolos especiales.'
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'El correo electrónico no es válido.' });
  }

  if (contraseña !== confirmarContraseña) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
  }

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(contraseña)) {
    return res.status(400).json({
      error: 'La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.'
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    const sql = 'INSERT INTO usuarios (username, email, password, rol) VALUES (?, ?, ?, ?)';

    connection.query(sql, [username, email, hashedPassword, 'usuario'], (err, result) => {
      if (err) {

        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({ error: 'El nombre de usuario o el correo electrónico ya están registrados.' });
        }
        return res.status(500).json({ error: 'Error al registrar el usuario.' });
      }

      res.status(201).json({ mensaje: 'Usuario registrado con éxito.' });
    });
  } catch (error) {
    console.error('Error interno del servidor:', error);
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
