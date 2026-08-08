import { useEffect, useMemo, useState } from 'react';
import { AdminPageHeader, AlertCard, EmptyState, InlineError, SkeletonBlock, StatusBadge } from '../components/AdminPanel.jsx';
import { listInvitationsWithResponses } from '../services/adminSurveyService.js';
import { exportRowsToCsv, exportRowsToExcel } from '../utils/exportData.js';
import {
  formatDateTime,
  getRecommendationSegment,
  normalizeResponseRows,
} from '../utils/surveyCalculations.js';

const RESULT_COLUMNS = [
  { label: 'Cliente', value: (row) => row.clients?.name ?? '' },
  { label: 'Campana', value: (row) => row.survey_campaigns?.name ?? '' },
  { label: 'Estado', value: (row) => row.status },
  { label: 'Fecha respuesta', value: (row) => formatDateTime(row.response?.submitted_at) },
  { label: 'Promedio', value: (row) => row.average ?? '' },
  { label: 'Recomendacion', value: (row) => row.response?.q5_recommendation ?? '' },
  { label: 'Segmento', value: (row) => row.recommendationSegment },
  { label: 'Seguimiento', value: (row) => (row.requiresFollowUp ? 'Si' : 'No') },
  { label: 'Problema', value: (row) => row.response?.problem_comment ?? '' },
  { label: 'Mejora', value: (row) => row.response?.improvement_comment ?? '' },
];

export default function AdminResultsPage() {
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    campaign: 'all',
    status: 'all',
    followUp: 'all',
    sort: 'date_desc',
  });

  useEffect(() => {
    listInvitationsWithResponses()
      .then((data) => {
        const normalized = normalizeResponseRows(data);
        setRows(normalized);
        setSelected(normalized.find((row) => row.response) ?? normalized[0] ?? null);
      })
      .catch(() => setError('No fue posible cargar resultados.'))
      .finally(() => setLoading(false));
  }, []);

  const campaigns = useMemo(() => {
    const map = new Map();
    rows.forEach((row) => {
      if (row.survey_campaigns?.id) map.set(row.survey_campaigns.id, row.survey_campaigns.name);
    });
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [rows]);

  const filteredRows = useMemo(() => {
    const search = filters.search.trim().toLowerCase();
    const next = rows.filter((row) => {
      const client = row.clients?.name?.toLowerCase() ?? '';
      const campaign = row.survey_campaigns?.name?.toLowerCase() ?? '';
      const matchesSearch = !search || client.includes(search) || campaign.includes(search);
      const matchesCampaign = filters.campaign === 'all' || row.survey_campaigns?.id === filters.campaign;
      const matchesStatus = filters.status === 'all' || row.status === filters.status;
      const matchesFollowUp = filters.followUp === 'all'
        || (filters.followUp === 'yes' ? row.requiresFollowUp : !row.requiresFollowUp);

      return matchesSearch && matchesCampaign && matchesStatus && matchesFollowUp;
    });

    return next.sort((a, b) => {
      if (filters.sort === 'average_asc') return (a.average ?? 99) - (b.average ?? 99);
      if (filters.sort === 'average_desc') return (b.average ?? -1) - (a.average ?? -1);
      if (filters.sort === 'nps_asc') return (a.response?.q5_recommendation ?? 99) - (b.response?.q5_recommendation ?? 99);
      if (filters.sort === 'nps_desc') return (b.response?.q5_recommendation ?? -1) - (a.response?.q5_recommendation ?? -1);

      return new Date(b.response?.submitted_at ?? b.created_at) - new Date(a.response?.submitted_at ?? a.created_at);
    });
  }, [filters, rows]);

  const updateFilter = (event) => {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const exportResults = (format) => {
    if (format === 'csv') {
      exportRowsToCsv(filteredRows, RESULT_COLUMNS, 'resultados-encuestas.csv');
      return;
    }

    exportRowsToExcel(filteredRows, RESULT_COLUMNS, 'resultados-encuestas.xls');
  };

  return (
    <>
      <AdminPageHeader
        eyebrow="Resultados"
        title="Respuestas y seguimiento"
        description="Consulte estados, promedios, comentarios y casos que requieren atencion."
        breadcrumb="Encuestas / Resultados"
        action={(
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-secondary" onClick={() => exportResults('csv')} disabled={!filteredRows.length}>Exportar CSV</button>
            <button type="button" className="btn-secondary" onClick={() => exportResults('xls')} disabled={!filteredRows.length}>Exportar Excel</button>
          </div>
        )}
      />

      <InlineError message={error} />

      {loading ? (
        <SkeletonBlock rows={6} />
      ) : rows.length ? (
        <>
          {rows.some((row) => row.requiresFollowUp) && (
            <div className="mb-4">
              <AlertCard
                title="Hay respuestas que requieren seguimiento"
                body="Use el filtro de seguimiento para revisar unicamente los casos criticos."
                action={<button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={() => setFilters((current) => ({ ...current, followUp: 'yes' }))}>Ver seguimientos</button>}
              />
            </div>
          )}

          <section className="glass-panel mb-5 grid gap-3 p-4 md:grid-cols-2 xl:grid-cols-5">
            <div>
              <label htmlFor="search" className="text-sm font-semibold text-white">Buscar</label>
              <input id="search" name="search" value={filters.search} onChange={updateFilter} className="mt-2 w-full border px-4 py-3" placeholder="Cliente o campana" />
            </div>
            <div>
              <label htmlFor="campaign" className="text-sm font-semibold text-white">Campana</label>
              <select id="campaign" name="campaign" value={filters.campaign} onChange={updateFilter} className="mt-2 w-full border px-4 py-3">
                <option value="all">Todas</option>
                {campaigns.map((campaign) => <option key={campaign.id} value={campaign.id}>{campaign.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="text-sm font-semibold text-white">Estado</label>
              <select id="status" name="status" value={filters.status} onChange={updateFilter} className="mt-2 w-full border px-4 py-3">
                <option value="all">Todos</option>
                <option value="active">Pendiente</option>
                <option value="completed">Respondida</option>
                <option value="expired">Vencida</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
            <div>
              <label htmlFor="followUp" className="text-sm font-semibold text-white">Seguimiento</label>
              <select id="followUp" name="followUp" value={filters.followUp} onChange={updateFilter} className="mt-2 w-full border px-4 py-3">
                <option value="all">Todos</option>
                <option value="yes">Requiere</option>
                <option value="no">Normal</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort" className="text-sm font-semibold text-white">Ordenar</label>
              <select id="sort" name="sort" value={filters.sort} onChange={updateFilter} className="mt-2 w-full border px-4 py-3">
                <option value="date_desc">Fecha reciente</option>
                <option value="average_desc">Promedio mayor</option>
                <option value="average_asc">Promedio menor</option>
                <option value="nps_desc">NPS mayor</option>
                <option value="nps_asc">NPS menor</option>
              </select>
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1fr_26rem]">
            <div className="overflow-x-auto">
              {filteredRows.length ? (
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Periodo</th>
                      <th>Estado</th>
                      <th>Fecha de respuesta</th>
                      <th>Promedio</th>
                      <th>Recomendacion</th>
                      <th>Seguimiento</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <button
                            type="button"
                            className="text-left font-semibold text-white underline-offset-4 hover:underline"
                            onClick={() => setSelected(row)}
                          >
                            {row.clients?.name ?? 'Cliente sin nombre'}
                          </button>
                        </td>
                        <td>{row.survey_campaigns?.name ?? '-'}</td>
                        <td><StatusBadge status={row.status}>{row.status}</StatusBadge></td>
                        <td>{formatDateTime(row.response?.submitted_at)}</td>
                        <td>{row.average ?? '-'}</td>
                        <td>{row.response?.q5_recommendation ?? '-'}</td>
                        <td>{row.requiresFollowUp ? <StatusBadge status="follow_up">Requiere seguimiento</StatusBadge> : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <EmptyState title="Sin resultados" body="No hay registros que coincidan con los filtros seleccionados." />
              )}
            </div>

            <ResponseDetail selected={selected} />
          </section>
        </>
      ) : (
        <EmptyState title="No hay enlaces generados" body="Los resultados apareceran cuando existan invitaciones y respuestas." />
      )}
    </>
  );
}

function ResponseDetail({ selected }) {
  if (!selected) {
    return (
      <aside className="glass-panel h-fit p-5">
        <p className="text-sm leading-6 text-muted-text">Seleccione una respuesta para ver el detalle.</p>
      </aside>
    );
  }

  const response = selected.response;

  return (
    <aside className="glass-panel h-fit p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-cyan-bright">Detalle</p>
          <h3 className="mt-2 text-xl font-bold text-white">{selected.clients?.name}</h3>
          <p className="mt-1 text-sm text-muted-text">{selected.survey_campaigns?.name}</p>
        </div>
        {selected.requiresFollowUp && <StatusBadge status="follow_up">Seguimiento</StatusBadge>}
      </div>

      <dl className="mt-5 space-y-3 text-sm">
        <Detail label="Fecha" value={formatDateTime(response?.submitted_at)} />
        <Detail label="Estado" value={selected.status} />
        <Detail label="Promedio" value={selected.average ?? '-'} />
        <Detail label="NPS / recomendacion" value={response ? `${response.q5_recommendation} (${getRecommendationSegment(response.q5_recommendation)})` : '-'} />
        <Detail label="Pregunta 1" value={response?.q1_rating ?? '-'} />
        <Detail label="Pregunta 2" value={response?.q2_rating ?? '-'} />
        <Detail label="Pregunta 3" value={response?.q3_rating ?? '-'} />
        <Detail label="Pregunta 4" value={response?.q4_rating ?? '-'} />
        <Detail label="Pregunta 5" value={response?.q5_recommendation ?? '-'} />
        <Detail label="Problema reportado" value={response?.problem_comment || 'Sin comentario'} />
        <Detail label="Comentario / recomendacion" value={response?.improvement_comment || 'Sin comentario'} />
      </dl>
    </aside>
  );
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="font-semibold text-white">{label}</dt>
      <dd className="mt-1 whitespace-pre-wrap text-muted-text">{value}</dd>
    </div>
  );
}
