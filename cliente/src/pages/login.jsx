import { Layout } from "../components/Layout";
import "../styles/Login.css";
import { LoginForm } from "../components/LoginForm";
const Login = () => {

  return (
    <Layout>
      <section className="login">
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <LoginForm />
          <p className="login-register-text">
            ¿No tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Login;