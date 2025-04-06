
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

// Add dark class to html element for dark theme
document.documentElement.classList.add('dark');

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>
  );
} else {
  console.error("Root element with id 'root' not found");
}
