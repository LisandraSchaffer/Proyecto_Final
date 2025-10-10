const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productos');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../config/multerConfig'); 

// Rutas públicas (cualquiera puede ver los productos)
router.get('/', productosController.getAllProductos);
router.get('/:id', productosController.getProductoById);

// Rutas protegidas (solo el administrador puede acceder)
router.post('/', authMiddleware, upload.single('imagen'), productosController.createProducto);
router.put('/:id', authMiddleware, productosController.updateProducto);
router.delete('/:id', authMiddleware, productosController.deleteProducto);

// Ruta para subir imágenes
router.post('/upload', authMiddleware, upload.single('imagen'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se subió ninguna imagen' });
  }

  const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.status(200).json({
    mensaje: 'Imagen subida exitosamente',
    url: imageUrl
  });
});

module.exports = router;
