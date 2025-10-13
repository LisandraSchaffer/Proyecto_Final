import React, { useState } from "react";
import "../styles/register.css";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    contraseña: "",
    confirmarContraseña: "",
    rol: "cliente" // valor por defecto, no visible en el formulario
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/registro", formData);
      alert("Usuario registrado con éxito");
    } catch (err) {
      console.error("Error en el registro:", err);
      const mensaje = err?.response?.data?.error || "Error al registrar usuario";
      alert(mensaje);
    }    
  };

  return (
    <section className="registro">
      <div className="registro-container">
        <h2>Crear cuenta</h2>
        <form className="registro-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              name="username"
              placeholder="Tu nombre"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="ejemplo@email.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="contraseña"
              placeholder="********"
              value={formData.contraseña}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmar-password">Confirmar contraseña</label>
            <input
              type="password"
              id="confirmar-password"
              name="confirmarContraseña"
              placeholder="********"
              value={formData.confirmarContraseña}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn-registro">
            Registrarse
          </button>
        </form>

        <p className="registro-login-text">
          ¿Ya tenés cuenta? <a href="/login">Iniciar sesión</a>
        </p>
      </div>
    </section>
  );
};

export default Register;
