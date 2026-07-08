import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';
import ScrollToTop from '../navigation/ScrollToTop.jsx';

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-text">
      <a href="#main-content" className="skip-link">Saltar al contenido principal</a>
      <ScrollToTop />
      <Navbar />
      <main id="main-content" className="w-full flex-1 pt-20" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
