const connection = require('../config/db');

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

// Lógica para crear un nuevo producto (PROTEGIDA)
exports.createProducto = (req, res) => {
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;
  const sql = 'INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen_url) VALUES (?, ?, ?, ?, ?, ?)';
  connection.query(sql, [nombre, descripcion, precio, stock, categoria, imagen_url], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al crear el producto.' });
    res.status(201).json({ id: result.insertId, ...req.body });
  });
};

// Lógica para actualizar un producto (PROTEGIDA)
exports.updateProducto = (req, res) => {
  const { id } = req.params;
  const { nombre, descripcion, precio, stock, categoria, imagen_url } = req.body;
  const sql = 'UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?, imagen_url = ? WHERE id = ?';
  connection.query(sql, [nombre, descripcion, precio, stock, categoria, imagen_url, id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar el producto.' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto actualizado con éxito.' });
  });
};

// Lógica para eliminar un producto (PROTEGIDA)
exports.deleteProducto = (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM productos WHERE id = ?';
  connection.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el producto.' });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Producto no encontrado.' });
    }
    res.json({ message: 'Producto eliminado con éxito.' });
  });
};