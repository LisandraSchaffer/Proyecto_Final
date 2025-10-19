import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { Navigate } from "react-router-dom";
import "../styles/ResumenCompra.css"; 

const ResumenCompra = () => {
  const { carrito } = useContext(CarritoContext);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token || role !== "cliente") {
    return <Navigate to="/login" replace />;
  }

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <section className="resumen-compra">
      <h2>✨ Resumen de tu pedido ✨</h2>
      <ul>
        {carrito.map((item) => (
          <li key={item.id}>
            <strong>{item.nombre}</strong> - ${item.precio} x {item.cantidad}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> ${total}</p>
      <p>Para coordinar la compra, contactanos por:</p>
      <div className="contact-links">
        <a
          href="https://wa.me/549XXXXXXXXXX"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
};

export default ResumenCompra;
