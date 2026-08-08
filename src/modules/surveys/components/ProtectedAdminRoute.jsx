import { Navigate, Outlet, useLocation } from 'react-router-dom';
import RouteLoader from '../../../components/ui/RouteLoader.jsx';
import SurveyStatusScreen from './SurveyStatusScreen.jsx';
import { useAdminSession } from '../hooks/useAdminSession.js';

export default function ProtectedAdminRoute() {
  const location = useLocation();
  const { session, loading, configured } = useAdminSession();

  if (!configured) return <SurveyStatusScreen status="configuration_error" />;

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#07111d]">
        <RouteLoader />
      </div>
    );
  }

  if (!session) {
    return <Navigate to="/encuestas-admin/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
