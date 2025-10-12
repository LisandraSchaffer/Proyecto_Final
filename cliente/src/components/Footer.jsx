import { Link } from "react-router-dom";
import "../styles/Footer.css";
import logo from "../assets/logo.jpeg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-main">
        {/* Sección de la marca */}
        <section className="footer-brand">
          <img src={logo} alt="Logo Nectar de Sol" className="footer-logo" />
          <h4 className="footer-title">Nectar de Sol</h4>
          <p>Calidad y servicio en cada producto.</p> {/* Slogan mejorado */}
        </section>

        {/* Sección de navegación principal */}
        <nav className="footer-nav" aria-label="Navegación principal del pie de página">
          <h4 className="footer-title">Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </nav>

        {/* Sección de ayuda y políticas */}
        <nav className="footer-nav" aria-label="Navegación de ayuda y políticas">
          <h4 className="footer-title">Ayuda</h4>
          <ul>
            <li><Link to="/preguntas-frecuentes">Preguntas Frecuentes</Link></li>
            <li><Link to="/terminos-y-condiciones">Términos y Condiciones</Link></li>
            <li><Link to="/politica-de-privacidad">Política de Privacidad</Link></li>
          </ul>
        </nav>

        {/* Sección de redes sociales */}
        <section className="footer-social">
          <h4 className="footer-title">Síguenos</h4>
          <div className="social-icons">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <p>IG</p>
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <p>FB</p>
            </a>
            <a href="https://wa.me/TUNUMERO" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <p>WA</p>
            </a>
          </div>
        </section>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {currentYear} Nectar de Sol. Sitio desarrollado por Schaffer Lisandra y Enriquez Matias. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;