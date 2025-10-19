import { useContext } from "react";
import { CarritoContext } from "../context/CarritoContext.jsx";
import { useNavigate } from "react-router-dom";
import "../styles/Carrito.css"; 

const Carrito = () => {
  const {
    carrito,
    eliminarProducto,
    vaciarCarrito,
    agregarProducto,
    restarProducto, 
  } = useContext(CarritoContext);
  const navigate = useNavigate();

  const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const handleResumenCompra = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token || role !== "cliente") {
      navigate("/login");
    } else {
      navigate("/resumen");
    }
  };

  return (
    <section className="carrito-container">
      <h2 className="carrito-titulo">✨ Tus tesoros elegidos ✨</h2>
      {carrito.length === 0 ? (
        <div className="carrito-alerta">
          <p>🛒 Tu carrito está vacío por ahora...</p>
          <p>¡Explorá nuestros productos y encontrá algo que te encante!</p>
        </div>
      ) : (
        <>
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <span>
                <strong>{item.nombre}</strong> - ${item.precio} x {item.cantidad}
              </span>
              <div className="acciones">
                <button onClick={() => restarProducto(item.id)}>−</button>
                <button onClick={() => agregarProducto(item)}>+</button>
                <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
              </div>
            </div>
          ))}
          <p className="carrito-total"><strong>Total:</strong> ${total}</p>
          <div className="carrito-botones">
            <button onClick={vaciarCarrito}>Vaciar carrito</button>
            <button onClick={handleResumenCompra}>Quiero comprar</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Carrito;
