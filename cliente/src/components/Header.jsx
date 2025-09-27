// src/components/Header.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import logo from "../assets/logo.jpeg";
import { LoginForm } from "./LoginForm";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <header>
      <div className="logo">
        <img src={logo} alt="Logo Néctar de Sol" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/Productos">Productos</Link></li>
          <li><Link to="/SobreNosotros">Sobre Nosotros</Link></li>

          {isLoggedIn ? (
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Cerrar Sesión
              </button>
            </li>
          ) : (
            <>
              <li>
                <button onClick={() => setShowLogin(!showLogin)} className="login-btn">
                  Iniciar Sesión
                </button>
              </li>
              <li><Link to="/register">Registrarse</Link></li>
            </>
          )}
        </ul>

        {showLogin && !isLoggedIn && (
          <div className="login-form">
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

export { Header };