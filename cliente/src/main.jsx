import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterApp from "./router/routerApp"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)