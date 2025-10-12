import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Reutiliza la lógica del Header para obtener el rol del token
const getRoleFromToken = (token) => {
  if (!token) return null;
  if (token === "admin-token") {
    return 'admin';
  }
  return 'user';
};

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const userRole = getRoleFromToken(token);

  // Si el rol no es 'admin', redirige al usuario a la página de inicio
  if (userRole !== 'admin') {
    return <Navigate to="/" replace />;
  }

  // Si el rol es 'admin', permite el acceso a la ruta solicitada
  return <Outlet />;
};

export default ProtectedRoute;