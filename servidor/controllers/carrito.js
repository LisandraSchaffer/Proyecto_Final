const connection = require('../config/db');

// Agregar producto al carrito
exports.agregarAlCarrito = (req, res) => {
  const usuarioId = req.user.id;
  const { producto_id, cantidad } = req.body;

  if (!producto_id || !cantidad) {
    return res.status(400).json({ error: 'Producto y cantidad son obligatorios.' });
  }

  const buscarCarrito = 'SELECT id FROM carrito WHERE usuario_id = ?';
  connection.query(buscarCarrito, [usuarioId], (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el carrito.' });

    let carritoId;
    if (resultados.length > 0) {
      carritoId = resultados[0].id;
      insertarOActualizarItem(carritoId);
    } else {
      const crearCarrito = 'INSERT INTO carrito (usuario_id) VALUES (?)';
      connection.query(crearCarrito, [usuarioId], (err, resultado) => {
        if (err) return res.status(500).json({ error: 'Error al crear el carrito.' });
        carritoId = resultado.insertId;
        insertarOActualizarItem(carritoId);
      });
    }

    function insertarOActualizarItem(carritoId) {
      const buscarItem = `
        SELECT id, cantidad FROM carrito_items
        WHERE carrito_id = ? AND producto_id = ?
      `;
      connection.query(buscarItem, [carritoId, producto_id], (err, items) => {
        if (err) return res.status(500).json({ error: 'Error al buscar el producto en el carrito.' });

        if (items.length > 0) {
          const nuevaCantidad = items[0].cantidad + cantidad;
          const actualizar = `
            UPDATE carrito_items SET cantidad = ?
            WHERE id = ?
          `;
          connection.query(actualizar, [nuevaCantidad, items[0].id], (err) => {
            if (err) return res.status(500).json({ error: 'Error al actualizar la cantidad.' });
            res.json({ mensaje: 'Cantidad actualizada en el carrito.' });
          });
        } else {
          const insertar = `
            INSERT INTO carrito_items (carrito_id, producto_id, cantidad)
            VALUES (?, ?, ?)
          `;
          connection.query(insertar, [carritoId, producto_id, cantidad], (err) => {
            if (err) {
                console.error('Error SQL al insertar en carrito_items:', err);
                return res.status(500).json({ error: 'Error al agregar el producto al carrito.' });
              }              
            res.json({ mensaje: 'Producto agregado al carrito.' });
          });
        }
      });
    }
  });
};

// Ver contenido del carrito con total
exports.verCarritoConTotal = (req, res) => {
  const usuarioId = req.user.id;

  const buscarCarrito = 'SELECT id FROM carrito WHERE usuario_id = ?';
  connection.query(buscarCarrito, [usuarioId], (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el carrito.' });
    if (resultados.length === 0) return res.json({ carrito: [], total: 0 });

    const carritoId = resultados[0].id;

    const query = `
      SELECT 
        ci.id AS item_id,
        p.nombre,
        p.precio,
        ci.cantidad,
        (p.precio * ci.cantidad) AS subtotal
      FROM carrito_items ci
      JOIN productos p ON ci.producto_id = p.id
      WHERE ci.carrito_id = ?
    `;

    connection.query(query, [carritoId], (err, items) => {
      if (err) return res.status(500).json({ error: 'Error al obtener los ítems del carrito.' });

      const total = items.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
      res.json({ carrito: items, total });
    });
  });
};

// Actualizar cantidad de un ítem
exports.actualizarCantidad = (req, res) => {
  const itemId = req.params.id;
  const { cantidad } = req.body;

  if (!cantidad) {
    return res.status(400).json({ error: 'Cantidad es obligatoria.' });
  }

  const query = 'UPDATE carrito_items SET cantidad = ? WHERE id = ?';
  connection.query(query, [cantidad, itemId], (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la cantidad.' });
    res.json({ mensaje: 'Cantidad actualizada correctamente.' });
  });
};

// Eliminar un ítem del carrito
exports.eliminarItem = (req, res) => {
  const itemId = req.params.id;

  const query = 'DELETE FROM carrito_items WHERE id = ?';
  connection.query(query, [itemId], (err, resultado) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el ítem.' });
    res.json({ mensaje: 'Ítem eliminado del carrito.' });
  });
};

// Vaciar el carrito
exports.vaciarCarrito = (req, res) => {
  const usuarioId = req.user.id;

  const buscarCarrito = 'SELECT id FROM carrito WHERE usuario_id = ?';
  connection.query(buscarCarrito, [usuarioId], (err, resultados) => {
    if (err) return res.status(500).json({ error: 'Error al buscar el carrito.' });
    if (resultados.length === 0) return res.json({ mensaje: 'Carrito ya está vacío.' });

    const carritoId = resultados[0].id;

    const borrarItems = 'DELETE FROM carrito_items WHERE carrito_id = ?';
    connection.query(borrarItems, [carritoId], (err) => {
      if (err) return res.status(500).json({ error: 'Error al vaciar el carrito.' });
      res.json({ mensaje: 'Carrito vaciado correctamente.' });
    });
  });
};
