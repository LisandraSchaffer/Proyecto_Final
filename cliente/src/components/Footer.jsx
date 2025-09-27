import { Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <img
            src="/ruta-al-logo.png"
            alt="Logo Tienda"
            className="footer-logo"
          />
          <h4>Nectar de Sol</h4>
          <p>La competencia de mercadolibre.</p>
        </div>

        <div className="footer-links">
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Nectar de Sol. Sitio desarrollado por
          Schaffer Lisandra y Enriquez Matias. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export { Footer };