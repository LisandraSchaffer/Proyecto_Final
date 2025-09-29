const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require('../config/db');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE username = ?';

  connection.query(sql, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error del servidor' });

    if (
      results.length === 0 ||
      !bcrypt.compareSync(password, results[0].password)
    ) {
      return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
    }

    const user = results[0];
    const token = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      'MiClaveSecreta',
      { expiresIn: '1h' }
    );

    res.json({ token });
  });
};
