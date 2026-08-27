import { Navigate, Outlet } from 'react-router-dom';
import { useAppData } from '@/contexts/AppDataContext';

export function ProtectedSurveyRoute() {
  const { isAuthenticated, isReady } = useAppData();

  if (!isReady) {
    return <div className="grid min-h-screen place-items-center bg-[#f5f7fa] text-sm text-slate-500">Preparando espacio de trabajo...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/encuestas-admin/login" replace />;
  }

  return <Outlet />;
}
