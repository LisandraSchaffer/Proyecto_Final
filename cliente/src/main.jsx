import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterApp from "./router/routerApp"
import { ToastContainer, toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
    <ToastContainer />
  </StrictMode>,
)