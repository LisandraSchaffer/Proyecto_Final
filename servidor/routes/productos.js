const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig');

// Rutas públicas (cualquiera puede ver los productos)
router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);

// Rutas protegidas (solo el administrador puede acceder)
// 1. Crear Producto: Usa 'upload.single' para procesar el campo 'imagen'
router.post('/', authMiddleware, upload.single('imagen'), productosController.createProducto);

// 2. Actualizar Producto: Debe ser de tipo 'PUT' y usar 'upload.single' para recibir el archivo.
router.put('/', authMiddleware, upload.single('imagen'), productosController.updateProducto);

// 3. Eliminar Producto: El ID se sigue enviando por parámetro de URL.
router.delete('/:id', authMiddleware, productosController.deleteProducto);

// 4. Ruta para subir imágenes: ELIMINADA. (Se asume que la lógica está integrada arriba)
// La ruta '/upload' era redundante.

module.exports = router;