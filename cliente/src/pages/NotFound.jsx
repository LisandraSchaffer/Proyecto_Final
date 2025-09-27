import { Link } from "react-router-dom";
import { Layout } from "../components/Layout";
import "../styles/NotFound.css";

const NotFound = () => {
  return (
    <Layout>
      <section className="notfound">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-subtitle">¡Página no encontrada!</p>
        <p className="notfound-text">
          Lo sentimos, la página que estás buscando no existe.
        </p>
        <p className="notfound-text">Verificá la URL o volvé al inicio.</p>
        <Link to="/" className="notfound-link">
          Ir a inicio
        </Link>
      </section>
    </Layout>
  );
};

export default NotFound;
