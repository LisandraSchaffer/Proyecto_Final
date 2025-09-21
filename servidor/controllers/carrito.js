const connection = require('../config/db');

// Crea un nuevo carrito
exports.createCarrito = (req, res) => {
    const sql = 'INSERT INTO carritos () VALUES ()';
    connection.query(sql, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al crear el carrito.' });
        res.status(201).json({ id: result.insertId, items: [] });
    });
};

// Obtiene los ítems de un carrito por su ID
exports.getCarrito = (req, res) => {
    const { carritoId } = req.params;
    const sql = `
        SELECT ci.id, ci.producto_id, p.nombre, p.precio, p.imagen_url, ci.cantidad
        FROM carrito_items ci
        JOIN productos p ON ci.producto_id = p.id
        WHERE ci.carrito_id = ?
    `;
    connection.query(sql, [carritoId], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al obtener el carrito.' });
        res.json({ id: carritoId, items: results });
    });
};

// Añade un ítem a un carrito existente
exports.addItem = (req, res) => {
    const { carritoId } = req.params;
    const { producto_id, cantidad } = req.body;

    const checkStockSql = 'SELECT stock FROM productos WHERE id = ?';
    connection.query(checkStockSql, [producto_id], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error al verificar el stock.' });
        if (results.length === 0 || results[0].stock < cantidad) {
            return res.status(400).json({ error: 'Stock insuficiente.' });
        }

        const sql = 'INSERT INTO carrito_items (carrito_id, producto_id, cantidad) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE cantidad = cantidad + ?';
        connection.query(sql, [carritoId, producto_id, cantidad, cantidad], (err, result) => {
            if (err) return res.status(500).json({ error: 'Error al agregar el ítem.' });
            res.status(201).json({ message: 'Ítem agregado al carrito.', id: result.insertId });
        });
    });
};

// Actualiza la cantidad de un ítem en el carrito
exports.updateItem = (req, res) => {
    const { itemId } = req.params;
    const { cantidad } = req.body;
    const sql = 'UPDATE carrito_items SET cantidad = ? WHERE id = ?';
    connection.query(sql, [cantidad, itemId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al actualizar el ítem.' });
        res.json({ message: 'Cantidad de ítem actualizada.' });
    });
};

// Elimina un ítem del carrito
exports.deleteItem = (req, res) => {
    const { itemId } = req.params;
    const sql = 'DELETE FROM carrito_items WHERE id = ?';
    connection.query(sql, [itemId], (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al eliminar el ítem.' });
        res.json({ message: 'Ítem eliminado del carrito.' });
    });
};