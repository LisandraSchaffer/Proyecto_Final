//componente para crear las "tarjetas" para los productos de la web
import React from "react";

//estos son los datos que vienen de la base de datos para los productos
const Card = ({ nombre, precio, descripcion, stock, categoria, imagen_url }) => {
  return (
    <div className="card">
      <section>
        <img
          src={`http://localhost:3000/images/${imagen_url}`}
          alt={nombre}
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      </section>
      <div>
        <h2>{nombre}</h2>
        <p>${precio}</p>
        <p>{descripcion}</p>
        <p>Stock: {stock}</p>
        <p>Categoría: {categoria}</p>
      </div>
    </div>
  );
};

export default Card;
