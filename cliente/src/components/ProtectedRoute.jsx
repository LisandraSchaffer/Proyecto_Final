import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  let userRole = null;
  try {
    const decoded = jwtDecode(token);
    userRole = decoded.rol;
  } catch (error) {
    console.error("Error al decodificar el token:", error);
    return <Navigate to="/" replace />;
  }

  if (userRole !== "administrador") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
