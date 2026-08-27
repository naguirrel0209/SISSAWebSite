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
const PublicSurveyPage = lazy(() => import('./modules/surveys/pages/PublicSurveyPage.tsx'));
const SurveyProviders = lazy(() =>
  import('./modules/surveys/components/SurveyProviders.tsx').then((module) => ({
    default: module.SurveyProviders,
  })),
);
const ProtectedSurveyRoute = lazy(() =>
  import('./modules/surveys/components/ProtectedSurveyRoute.tsx').then((module) => ({
    default: module.ProtectedSurveyRoute,
  })),
);
const AdminLoginPage = lazy(() => import('./modules/surveys/pages/LoginPage.tsx'));
const AdminDashboardPage = lazy(() => import('./modules/surveys/pages/DashboardPage.tsx'));
const AdminClientsPage = lazy(() => import('./modules/surveys/pages/ClientsPage.tsx'));
const AdminCampaignsPage = lazy(() => import('./modules/surveys/pages/CampaignsPage.tsx'));
const AdminResultsPage = lazy(() => import('./modules/surveys/pages/ResultsPage.tsx'));

export default function App() {
  return (
    <Suspense fallback={<RouteLoader />}>
      <Routes>
        <Route
          path="/encuesta/:token"
          element={(
            <SurveyProviders>
              <PublicSurveyPage />
            </SurveyProviders>
          )}
        />
        <Route
          path="/encuestas-admin/login"
          element={(
            <SurveyProviders>
              <AdminLoginPage />
            </SurveyProviders>
          )}
        />
        <Route
          element={(
            <SurveyProviders>
              <ProtectedSurveyRoute />
            </SurveyProviders>
          )}
        >
          <Route path="/encuestas-admin" element={<AdminDashboardPage />} />
          <Route path="/encuestas-admin/clientes" element={<AdminClientsPage />} />
          <Route path="/encuestas-admin/campanas" element={<AdminCampaignsPage />} />
          <Route path="/encuestas-admin/resultados" element={<AdminResultsPage />} />
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
