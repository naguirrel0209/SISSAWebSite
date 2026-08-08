import { useEffect, useMemo, useState } from 'react';
import { AdminPageHeader, AlertCard, EmptyState, InlineError, SkeletonBlock, StatCard, StatusBadge } from '../components/AdminPanel.jsx';
import DashboardCharts from '../components/DashboardCharts.jsx';
import { getDashboardData } from '../services/adminSurveyService.js';
import {
  calculateResponseStats,
  normalizeResponseRows,
} from '../utils/surveyCalculations.js';

export default function AdminDashboardPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getDashboardData()
      .then((data) => setRows(normalizeResponseRows(data)))
      .catch(() => setError('No fue posible cargar el resumen.'))
      .finally(() => setLoading(false));
  }, []);

  const stats = useMemo(() => {
    return calculateResponseStats(rows);
  }, [rows]);

  const followUpRows = rows.filter((row) => row.requiresFollowUp);

  return (
    <>
      <AdminPageHeader
        eyebrow="Resumen"
        title="Panel de encuestas"
        description="Indicadores generales del Portal de Experiencia del Cliente."
        breadcrumb="Encuestas / Resumen"
      />

      <InlineError message={error} />

      {loading ? (
        <SkeletonBlock rows={6} />
      ) : rows.length ? (
        <>
          {stats.followUp > 0 && (
            <div className="mb-4">
              <AlertCard
                title={`${stats.followUp} respuesta(s) requieren seguimiento`}
                body="Revise los casos con calificaciones bajas, recomendacion baja o problemas reportados."
              />
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard label="Encuestas enviadas" value={stats.sent} />
            <StatCard label="Respondidas" value={stats.responded} />
            <StatCard label="Pendientes" value={stats.pending} />
            <StatCard label="Porcentaje de respuesta" value={`${stats.responseRate}%`} />
            <StatCard label="Promedio general" value={stats.totalAverage ?? 'Sin datos'} helper="Promedio de preguntas 1 a 4." />
            <StatCard label="NPS" value={stats.nps ?? 'Sin datos'} helper="Promotores menos detractores." />
            <StatCard label="Requieren seguimiento" value={stats.followUp} />
            <StatCard label="Problemas reportados" value={stats.problemReports} />
          </div>

          <div className="mt-6">
            <DashboardCharts rows={rows} />
          </div>

          <section className="mt-6 glass-panel p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Actividad reciente</h3>
                <p className="mt-1 text-sm text-muted-text">Ultimos enlaces y respuestas registradas.</p>
              </div>
              {followUpRows.length > 0 && <StatusBadge status="follow_up">Seguimiento: {followUpRows.length}</StatusBadge>}
            </div>
            <div className="mt-4 overflow-x-auto">
              <table>
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Campana</th>
                    <th>Estado</th>
                    <th>Promedio</th>
                    <th>Seguimiento</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.slice(0, 8).map((row) => (
                    <tr key={row.id}>
                      <td>{row.clients?.name ?? 'Cliente sin nombre'}</td>
                      <td>{row.survey_campaigns?.name ?? 'Sin campana'}</td>
                      <td><StatusBadge status={row.status}>{row.status}</StatusBadge></td>
                      <td>{row.average ?? '-'}</td>
                      <td>{row.requiresFollowUp ? <StatusBadge status="follow_up">Requiere seguimiento</StatusBadge> : 'Normal'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : (
        <EmptyState
          title="Aun no hay encuestas generadas"
          body="Cree clientes, una campana mensual y luego genere enlaces privados para empezar a recibir respuestas."
        />
      )}
    </>
  );
}
