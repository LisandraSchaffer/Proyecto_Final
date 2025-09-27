import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.jpeg"

const Header = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo Néctar de Sol" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Productos">Productos</Link></li>
          <li><Link to="/SobreNosotros">Sobre Nosotros</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
          <li><Link to="/register">Registrarse</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export { Header };