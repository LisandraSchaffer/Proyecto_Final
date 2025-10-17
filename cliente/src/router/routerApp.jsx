import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Productos from '../pages/Productos';
import SobreNosotros from '../pages/SobreNosotros';
import NotFound from '../pages/NotFound';
import Register from '../pages/register';
import AdminPanel from '../pages/AdminPanel';
import Layout from '../components/Layout';
import ProtectedRoute from '../components/ProtectedRoute';
import { Navigate, Outlet } from 'react-router-dom';

function RouterApp() {
  const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    // Si no hay token, redirige al login
    if (!token) {
      return <Navigate to="/login" replace />;
    }

    // Si el usuario no es administrador, redirige a la página principal
    if (role !== "administrador") {
      return <Navigate to="/" replace />;
    }

    // Si tiene token y rol administrador, mostramos la ruta protegida
    return <Outlet />;
  };
  return (
    <BrowserRouter>
      <Routes>
        {/* --- RUTAS NO PROTEGIDAS --- */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="SobreNosotros" element={<SobreNosotros />} />
          <Route path="register" element={<Register />} />

          {/* Rutas protegidas dentro del layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="AdminPanel" element={<AdminPanel />} />
          </Route>
        </Route>

        {/* --- RUTAS PROTEGIDAS --- */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>);
} export default RouterApp;