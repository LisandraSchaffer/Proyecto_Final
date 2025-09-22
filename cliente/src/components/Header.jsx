import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav>
      <div className="logo">
        {/* Logo aquí */}
      </div>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};

export { Header };