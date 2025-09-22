import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <div>
            <img
              src={null}
              alt="Logo Tienda"
            />
            <h4>Nectar de Sol</h4>
          </div>
          <p>La competencia de mercadolibre.</p>
        </div>

        <div>
          <h4>Enlaces</h4>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
          </ul>
        </div>
      </div>

      <div>
        <p>&copy; {new Date().getFullYear()} Nectar de Sol. Sitio desarrollado por Schaffer Lisandra y Enriquez Matias. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export { Footer };