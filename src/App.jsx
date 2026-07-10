import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import RouteLoader from './components/ui/RouteLoader.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Nosotros = lazy(() => import('./pages/Nosotros.jsx'));
const Servicios = lazy(() => import('./pages/Servicios.jsx'));
const Operations = lazy(() => import('./pages/Operations.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/operaciones" element={<Operations />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
