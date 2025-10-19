import React from "react";

// Agregamos onAgregar para pasar la función del Home
const Card = ({ nombre, precio, descripcion, stock, categoria, imagen_url, onAgregar }) => {

  // Si la URL es completa, la usamos. Si no, asumimos que es un archivo local en /uploads.
  const finalImageUrl = imagen_url
    ? imagen_url.includes('http')
      ? imagen_url
      : `http://localhost:3000/uploads/${imagen_url}`
    : 'placeholder.jpg'; // Usar un placeholder si no hay imagen

  return (
    <div className="product-item">
      <section>
        <img
          src={finalImageUrl}
          alt={nombre}
        />
      </section>
      <div>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
        <p>Descripción: {descripcion}</p>
        <p>Stock: {stock}</p>
        <p>Categoría: {categoria}</p>

        <button onClick={onAgregar}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Card;