import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Scroll down slightly after a delay to hide address bar on mobile
if (window.matchMedia('(max-width: 600px)').matches) {
  setTimeout(() => {
    window.scrollTo(0, 1);
  }, 2000);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
