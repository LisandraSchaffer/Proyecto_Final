const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ error: 'Acceso denegado. No se proporcionó token.' });
  }

  // Bearer token
  const token = authHeader.replace('Bearer ', '');

  const secretKey = 'MiClaveSecreta';

  console.log('Token recibido:', token);
  console.log('Clave secreta utilizada:', secretKey);

  try {
    const verified = jwt.verify(token, secretKey);
    req.user = verified;
    next();
  } catch (error) {
    console.error('Error de verificación de token:', error);
    res.status(400).json({ error: 'Token inválido.' });
  }
};

module.exports = authMiddleware;