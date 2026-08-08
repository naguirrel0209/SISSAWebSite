import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout.jsx';
import RouteLoader from './components/ui/RouteLoader.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const Nosotros = lazy(() => import('./pages/Nosotros.jsx'));
const Servicios = lazy(() => import('./pages/Servicios.jsx'));
const MedioDetalle = lazy(() => import('./pages/MedioDetalle.jsx'));
const Oportunidades = lazy(() => import('./pages/Oportunidades.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));
const PublicSurveyPage = lazy(() => import('./modules/surveys/pages/PublicSurveyPage.jsx'));
const AdminLoginPage = lazy(() => import('./modules/surveys/pages/AdminLoginPage.jsx'));
const AdminDashboardPage = lazy(() => import('./modules/surveys/pages/AdminDashboardPage.jsx'));
const AdminClientsPage = lazy(() => import('./modules/surveys/pages/AdminClientsPage.jsx'));
const AdminCampaignsPage = lazy(() => import('./modules/surveys/pages/AdminCampaignsPage.jsx'));
const AdminResultsPage = lazy(() => import('./modules/surveys/pages/AdminResultsPage.jsx'));
const ProtectedAdminRoute = lazy(() => import('./modules/surveys/components/ProtectedAdminRoute.jsx'));
const SurveysAdminLayout = lazy(() => import('./modules/surveys/components/SurveysAdminLayout.jsx'));

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route path="/encuesta/:token" element={<PublicSurveyPage />} />
        <Route path="/encuestas-admin/login" element={<AdminLoginPage />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/encuestas-admin" element={<SurveysAdminLayout />}>
            <Route index element={<AdminDashboardPage />} />
            <Route path="clientes" element={<AdminClientsPage />} />
            <Route path="campanas" element={<AdminCampaignsPage />} />
            <Route path="resultados" element={<AdminResultsPage />} />
          </Route>
        </Route>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/servicios/:medioId" element={<MedioDetalle />} />
          <Route path="/operaciones" element={<Navigate to="/servicios" replace />} />
          <Route path="/oportunidades" element={<Oportunidades />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
