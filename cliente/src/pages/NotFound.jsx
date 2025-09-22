import { Link } from "react-router-dom"
import { Layout } from "../components/Layout";

const NotFound = () => {
  return (
    <Layout>
      <section>
        <h1>404</h1>
        <p>¡Página no encontrada!</p>
        <p>Lo sentimos, la página que estás buscando no existe.</p>
        <p>Verificá la URL o volvé al inicio.</p>
        <Link to="/">Ir a inicio</Link>
      </section>
    </Layout>
  )
}
export default NotFound; 