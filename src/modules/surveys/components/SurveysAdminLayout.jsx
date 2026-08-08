import { BarChart3, ClipboardList, LogOut, UsersRound } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { SITE } from '../../../constants/site.js';
import { signOutAdmin } from '../services/adminSurveyService.js';

const ADMIN_NAV = [
  { label: 'Resumen', path: '/encuestas-admin', icon: BarChart3, end: true },
  { label: 'Clientes', path: '/encuestas-admin/clientes', icon: UsersRound },
  { label: 'Campanas', path: '/encuestas-admin/campanas', icon: ClipboardList },
  { label: 'Resultados', path: '/encuestas-admin/resultados', icon: ClipboardList },
];

export default function SurveysAdminLayout() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOutAdmin();
    navigate('/encuestas-admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#07111d] text-text">
      <header className="border-b border-border-cyber bg-[#081422]/95">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <img src="/SISSAWebSite/images/brand/logo-sis.png" alt="" className="h-11 w-11 rounded-md object-contain" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-cyan-bright">
                Portal de Experiencia del Cliente
              </p>
              <h1 className="text-lg font-bold text-white">{SITE.name}</h1>
            </div>
          </div>
          <button type="button" className="btn-secondary w-full sm:w-auto" onClick={handleSignOut}>
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Cerrar sesion
          </button>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[15rem_1fr]">
        <nav className="glass-panel h-fit p-2" aria-label="Administracion de encuestas">
          {ADMIN_NAV.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `mb-1 flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
                    isActive
                      ? 'bg-primary-cyan text-white'
                      : 'text-muted-text hover:bg-white/[0.06] hover:text-white'
                  }`
                }
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>
        <main tabIndex="-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
