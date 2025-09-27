import { useState } from "react";

export const LoginForm = ({ onSuccess, showCancel = false, onCancel }) => {
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
        if (onSuccess) onSuccess();
      } else {
        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <form onSubmit={handleLogin} className="login-form-inline">
      <div className="form-group">
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="login-error-inline">{error}</p>}

      <button type="submit" className="btn-login-inline">
        Ingresar
      </button>

      {showCancel && onCancel && (
        <button
          type="button"
          className="btn-cancel-inline"
          onClick={onCancel}
        >
          Cancelar
        </button>
      )}
    </form>
  );
};