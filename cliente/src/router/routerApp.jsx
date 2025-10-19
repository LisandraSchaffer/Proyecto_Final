import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Productos from '../pages/Productos';
import SobreNosotros from '../pages/SobreNosotros';
import NotFound from '../pages/NotFound';
import Register from '../pages/register';
import AdminPanel from '../pages/AdminPanel';
import Carrito from '../pages/Carrito.jsx'; 
import ResumenCompra from '../pages/ResumenCompra.jsx'; 
import Layout from '../components/Layout';

function RouterApp() {
  const ProtectedRoute = () => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");

    if (!token) {
      return <Navigate to="/login" replace />;
    }

    if (role !== "administrador") {
      return <Navigate to="/" replace />;
    }

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
          <Route path="carrito" element={<Carrito />} /> {}
          <Route path="resumen" element={<ResumenCompra />} /> {}

          {/* Rutas protegidas dentro del layout */}
          <Route element={<ProtectedRoute />}>
            <Route path="AdminPanel" element={<AdminPanel />} />
          </Route>
        </Route>

        {/* --- RUTAS FUERA DEL LAYOUT --- */}
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;
