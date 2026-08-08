import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/global.css';

const redirectPath = window.location.search.slice(1);

if (redirectPath.startsWith('/')) {
  window.history.replaceState(null, '', `/SISSAWebSite${redirectPath}${window.location.hash}`);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename="/SISSAWebSite">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
