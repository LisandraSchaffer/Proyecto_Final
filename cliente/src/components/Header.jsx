import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.jpeg";
import LoginForm from "./LoginForm";

//usuario para logear admin: mati_master correo:proyecto@email.com contraseña fullstack10

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [userRole, setUserRole] = useState(null); // Nuevo estado para guardar el rol

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole"); // recuperamos el rol guardado
    if (token) {
      setIsLoggedIn(true);
      setUserRole(role); // setea el rol si hay token
    }
  }, []);

  const handleLoginSuccess = (role) => {
    setIsLoggedIn(true);
    setShowLogin(false);
    setUserRole(role);
    localStorage.setItem("userRole", role); // guarda el rol en localStorage al logearse
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userRole"); // borra el rol al desloguearse
    setIsLoggedIn(false);
    setUserRole(null);
  };

  return (
    <header>
      <div>
        <img src={logo} alt="Logo Néctar de Sol" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/SobreNosotros">Sobre Nosotros</Link></li>

          {/* Botón visible solo si el usuario logeado es administrador */}
          {isLoggedIn && userRole === "administrador" && (
            <li>
              <Link to="/AdminPanel">Administrador</Link>
            </li>
          )}

          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={() => setShowLogin(!showLogin)}>
                  Iniciar Sesión
                </button>
              </li>
              <li><Link to="/register">Registrarse</Link></li>
            </>
          )}
        </ul>

        {showLogin && !isLoggedIn && (
          <div>
            <LoginForm
              onSuccess={handleLoginSuccess}
              showCancel={true}
              onCancel={() => setShowLogin(false)}
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;