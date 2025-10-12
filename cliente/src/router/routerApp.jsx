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

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Productos" element={<Productos />} />
          <Route path="SobreNosotros" element={<SobreNosotros />} />
          <Route path="/Register" element={<Register />} />
        </Route>
        {/* --- RUTAS PROTEGIDAS PARA ADMIN --- */}
        <Route element={<ProtectedRoute />}>
          <Route path="/AdminPanel" element={<AdminPanel />} />
        </Route>
        {/* --- RUTA PARA PÁGINAS NO ENCONTRADAS --- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;