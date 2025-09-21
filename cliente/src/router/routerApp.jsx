import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// import Home from '../pages/home';
// import Login from '../pages/login';
// import Productos from '../pages/productos';
// import SobreNosotros from '../pages/sobreNosotros';
// import NotFound from '../pages/notFound';

function RouterApp() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* <Route path="/" element={<Home />} /> */}
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/productos" element={<Productos />} /> */}
        {/* <Route path="/sobre-nosotros" element={<SobreNosotros />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default RouterApp;