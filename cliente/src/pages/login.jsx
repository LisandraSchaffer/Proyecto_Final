import { Layout } from "../components/Layout";
import { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        setError('');
        alert('Login exitoso');
      
      } else {
        setError(data.error || 'Error desconocido');
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
    }
  };

  return (
    <Layout>
      <section>
        <h1>Pagina de Login de Usuarios</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Ingresar</button>
        </form>

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </section>
    </Layout>
  );
};

export default Login;
