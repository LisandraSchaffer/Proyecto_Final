const connection = require('../config/db'); // Se mantiene

// Lógica para obtener todos los productos (PÚBLICA)
exports.getAllProductos = (req, res) => {
  const sql = 'SELECT * FROM productos';
  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener los productos.' });
    res.json(results);
  });
};

// Lógica para obtener un producto por ID (PÚBLICA)
exports.getProductoById = (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM productos WHERE id = ?';
  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el producto.' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json(results[0]);
  });
};

// Lógica para crear un nuevo producto (PROTEGIDA + imagen)
exports.createProducto = (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;
  let imagen_url = null;
  let cloudinary_id = null; // Se asume que este campo se usará para almacenamiento externo

  if (req.file) {
    // Si Multer procesó un archivo, usamos la URL local
    imagen_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  }

  const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url, cloudinary_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nombre, descripcion, precio, stock, categoria, imagen_url, cloudinary_id], (err, result) => {
    if (err) {
      console.error(err);
      // Formato de respuesta para el frontend: ['error', 'mensaje']
      return res.status(500).json(['error', 'Error al crear el producto.']);
    }
    // Formato de respuesta para el frontend: ['success', 'mensaje']
    res.status(201).json(['success', 'Producto creado con éxito.']);
  });
};

// Lógica para actualizar un producto (PROTEGIDA)
exports.updateProducto = (req, res) => {
  // CAMBIO CLAVE: El ID viene en el cuerpo (req.body) debido al envío de FormData desde el frontend y el cambio en las rutas.
  const { id } = req.body;
  const { nombre, descripcion, precio, stock, categoria } = req.body;

  let imagen_url = req.body.imagen_url || null; // URL antigua enviada en FormData (si no se sube nueva imagen)

  // 1. Verificar si se subió un nuevo archivo (req.file existe)
  if (req.file) {
    // Se genera la nueva URL
    imagen_url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    // NOTA: Aquí deberías implementar la lógica para eliminar la imagen antigua del servidor/Cloudinary
  }

  // Se usa el ID del cuerpo para la condición WHERE
  const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?, imagen_url = ? WHERE id = ?';
  connection.query(sql, [nombre, descripcion, precio, stock, categoria, imagen_url, id], (err, result) => {
    if (err) {
      console.error(err);
      // Formato de respuesta para el frontend: ['error', 'mensaje']
      return res.status(500).json(['error', 'Error al actualizar el producto.']);
    }
    if (result.affectedRows === 0) {
      return res.status(404).json(['error', 'Producto no encontrado.']);
    }
    // Formato de respuesta para el frontend: ['success', 'mensaje']
    res.json(['success', 'Producto actualizado con éxito.']);
  });
};

// Lógica para eliminar un producto (PROTEGIDA)
exports.deleteProducto = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productos WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) {
      console.error(err);
      // CORRECCIÓN: Usar el formato ['error', 'mensaje'] para consistencia del frontend
      return res.status(500).json(['error', 'Error al eliminar el producto.']);
    }
    if (result.affectedRows === 0) {
      // CORRECCIÓN: Usar el formato ['error', 'mensaje']
      return res.status(404).json(['error', 'Producto no encontrado.']);
    }
    // CORRECCIÓN: Usar el formato ['success', 'mensaje']
    res.json(['success', 'Producto eliminado con éxito.']);
  });
};