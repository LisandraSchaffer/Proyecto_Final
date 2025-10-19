const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  // Bearer token
  console.log('Authorization header completo:', authHeader);

  // Usamos Optional Chaining (`?.`) y el método `trim()` para mayor seguridad
  const token = authHeader.split(' ')[1]?.trim();

  const secretKey = 'MiClaveSecreta';

  console.log('Token recibido:', token);
  console.log('Clave secreta utilizada:', secretKey);

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Error de verificación de token:', error);
    // CAMBIO CLAVE: Se cambia el código de error de 400 a 401 para semántica correcta.
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};

module.exports = authMiddleware;