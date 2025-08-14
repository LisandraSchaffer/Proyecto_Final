const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito');

// Rutas para el carrito de compras (públicas)
router.post('/', carritoController.createCarrito);
router.post('/:carritoId/items', carritoController.addItem);
router.get('/:carritoId', carritoController.getCarrito);
router.put('/:carritoId/items/:itemId', carritoController.updateItem);
router.delete('/:carritoId/items/:itemId', carritoController.deleteItem);

module.exports = router;