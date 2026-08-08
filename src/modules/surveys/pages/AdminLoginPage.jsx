import { useEffect, useState } from 'react';
import { LockKeyhole } from 'lucide-react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Seo from '../../../components/layout/Seo.jsx';
import { SITE } from '../../../constants/site.js';
import { InlineError } from '../components/AdminPanel.jsx';
import SurveyPortalShell from '../components/SurveyPortalShell.jsx';
import { useAdminSession } from '../hooks/useAdminSession.js';
import { signInAdmin } from '../services/adminSurveyService.js';
import { getSupabaseConfigError } from '../services/supabaseClient.js';

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loading, configured } = useAdminSession();
  const [form, setForm] = useState({ email: '', password: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const from = location.state?.from?.pathname ?? '/encuestas-admin';

  useEffect(() => {
    if (session) navigate(from, { replace: true });
  }, [from, navigate, session]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await signInAdmin(form.email, form.password);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate(from, { replace: true });
  };

  if (!loading && session) return <Navigate to={from} replace />;

  return (
    <SurveyPortalShell compact>
      <Seo
        title={`Administracion de encuestas | ${SITE.name}`}
        description="Acceso interno al Portal de Experiencia del Cliente de Corporacion SIS."
      />
      <section className="glass-panel mx-auto w-full max-w-md p-6 sm:p-8">
        <div className="mb-6">
          <LockKeyhole className="mb-4 h-10 w-10 text-primary-cyan-bright" aria-hidden="true" />
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-cyan-bright">
            Acceso administrativo
          </p>
          <h1 className="mt-2 text-2xl font-bold text-white">Iniciar sesion</h1>
        </div>

        <InlineError message={configured ? error : getSupabaseConfigError()} />

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-white">
              Correo electronico
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={handleChange}
              className="mt-2 w-full border px-4 py-3"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-white">
              Contrasena
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={handleChange}
              className="mt-2 w-full border px-4 py-3"
            />
          </div>
          <button type="submit" className="btn-primary w-full" disabled={!configured || submitting}>
            {submitting ? 'Iniciando sesion...' : 'Iniciar sesion'}
          </button>
        </form>
      </section>
    </SurveyPortalShell>
  );
}
