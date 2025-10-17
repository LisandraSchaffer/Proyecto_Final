import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast, Bounce } from "react-toastify"; // Importamos Toastify

const API_URL = "http://localhost:3000/api/auth/login";

const LoginForm = ({ onSuccess, showCancel = false, onCancel }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);

        //nuevo, se guarda el rol en localstore pada poder comparar y mostrar accesos según roll
        localStorage.setItem("userRole", decoded.rol);

        // Notificación de login exitoso con Toastify
        toast.success("Login Exitoso!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setTimeout(() => {
          if (decoded.rol === "administrador") {
            window.location.href = "/";
          }

          //aca pasa el rol y se evalua que onda
          if (onSuccess) {
            onSuccess(decoded.rol);
          }
        }, 1000);
      } else {
        // Notificación de error si las credenciales son incorrectas
        toast.error("No se pudo iniciar sesión", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });

        setError(data.error || "Credenciales incorrectas");
      }
    } catch (err) {
      // Notificación de error si hay problemas con el servidor
      toast.error("No se pudo iniciar sesión", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setError("Error de conexión con el servidor. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className={`login-form-modal ${isLoading ? "loading" : ""}`}
    >
      <h3>Iniciar Sesión</h3>
      <div className="form-group">
        <label htmlFor="username">Usuario</label>
        <input
          id="username"
          type="text"
          placeholder="Tu nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Tu contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading}
        />
      </div>

      {error && <p className="login-error">{error}</p>}

      <div className="form-actions">
        <button type="submit" className="btn-login" disabled={isLoading}>
          {isLoading ? "Ingresando..." : "Ingresar"}
        </button>

        {showCancel && onCancel && (
          <button
            type="button"
            className="btn-cancel"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default LoginForm;