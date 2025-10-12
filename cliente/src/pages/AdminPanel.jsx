import React from 'react';

const AdminPanel = () => {
  // Por ahora, las funciones de los botones no hacen nada
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Funcionalidad para agregar producto no implementada aún.");
  };

  const handleCancel = () => {
    alert("Operación cancelada.");
  };

  return (
    <div className="admin-container">
      <h2>Panel de Administrador</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <h3>Agregar Nuevo Producto</h3>

        <div className="form-group">
          <label htmlFor="producto">Nombre del Producto:</label>
          <input
            type="text"
            id="producto"
            name="producto"
            placeholder="Ej: Miel de Eucalipto 500g"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            placeholder="Ej: 1500.50"
            step="0.01" // Permite decimales para el precio
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock disponible:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            placeholder="Ej: 50"
            required // Solo números enteros
          />
        </div>

        <div className="form-group">
          <label htmlFor="categoria">Categoría:</label>
          <input
            type="text"
            id="categoria"
            name="categoria"
            placeholder="Ej: Mieles Puras"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            rows="4"
            placeholder="Describe las características principales del producto..."
          ></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-agregar">
            Agregar Producto
          </button>
          <button type="button" onClick={handleCancel} className="btn-cancelar">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;