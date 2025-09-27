import { Layout } from "../components/Layout";
import "../styles/register.css";

const Register = () => {
  return (
    <Layout>
      <section className="registro">
        <div className="registro-container">
          <h2>Crear cuenta</h2>
          <form className="registro-form">
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Tu nombre"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="********"
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmar-password">Confirmar contraseña</label>
              <input
                type="password"
                id="confirmar-password"
                name="confirmar-password"
                placeholder="********"
              />
            </div>

            <button type="submit" className="btn-registro">
              Registrarse
            </button>
          </form>

          <p className="registro-login-text">
            ¿Ya tenes cuenta? <a href="/login">Iniciar sesión</a>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export { Register };