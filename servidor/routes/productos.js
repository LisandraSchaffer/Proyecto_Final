const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos');
const authMiddleware = require('../middlewares/authMiddleware');

// Rutas públicas (cualquiera puede ver los productos)
router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);

// Rutas protegidas (solo el administrador puede acceder)
router.post('/', authMiddleware, productosController.createProducto);
router.put('/:id', authMiddleware, productosController.updateProducto);
router.delete('/:id', authMiddleware, productosController.deleteProducto);

module.exports = router;