import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Hide mobile browser address bar on landscape orientation
const hideMobileAddressBar = () => {
  if (window.matchMedia('(max-height: 600px) and (orientation: landscape)').matches) {
    // Wait a few seconds, then scroll down to hide address bar
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 3000); // 3 second delay
  }
};

// Trigger on initial load
window.addEventListener('load', hideMobileAddressBar);

// Trigger whenever orientation changes to landscape
window.addEventListener('orientationchange', hideMobileAddressBar);
window.addEventListener('resize', hideMobileAddressBar);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
