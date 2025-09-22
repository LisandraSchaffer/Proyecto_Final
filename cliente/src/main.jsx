import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import RouterApp from "./router/RouterApp"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterApp />
  </StrictMode>,
)