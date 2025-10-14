const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carrito');
const authMiddleware = require('../middlewares/authMiddleware');

// Agregar producto al carrito
router.post('/agregar', authMiddleware, carritoController.agregarAlCarrito);

// Ver contenido del carrito con total
router.get('/', authMiddleware, carritoController.verCarritoConTotal);

// Actualizar cantidad de un ítem
router.put('/item/:id', authMiddleware, carritoController.actualizarCantidad);

// Eliminar un ítem del carrito
router.delete('/item/:id', authMiddleware, carritoController.eliminarItem);

// Vaciar el carrito
router.delete('/vaciar', authMiddleware, carritoController.vaciarCarrito);

module.exports = router;
