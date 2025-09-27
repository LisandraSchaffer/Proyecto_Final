import { Layout } from "../components/Layout";
import { useState } from "react";
import "../styles/Login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setError("");
        alert("Login exitoso");
      } else {
        setError(data.error || "Error desconocido");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <Layout>
      <section className="login">
        <div className="login-container">
          <h2>Iniciar sesión</h2>
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuario</label>
              <input
                type="text"
                id="username"
                placeholder="Tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-login">
              Ingresar
            </button>
          </form>

          {error && <p className="login-error">{error}</p>}

          <p className="login-register-text">
            ¿No tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Login;