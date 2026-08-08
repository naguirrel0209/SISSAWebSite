import { useEffect, useMemo, useState } from 'react';
import { Copy } from 'lucide-react';
import { AdminPageHeader, EmptyState, InlineError, SkeletonBlock, StatusBadge } from '../components/AdminPanel.jsx';
import {
  generateSurveyInvitations,
  listCampaigns,
  listClients,
  listInvitationLinks,
  saveCampaign,
  setCampaignStatus,
} from '../services/adminSurveyService.js';
import { exportRowsToCsv, exportRowsToExcel } from '../utils/exportData.js';
import { formatDate, formatDateTime } from '../utils/surveyCalculations.js';

const EMPTY_CAMPAIGN = {
  id: null,
  name: '',
  period_year: new Date().getFullYear(),
  period_month: new Date().getMonth() + 1,
  starts_at: new Date().toISOString().slice(0, 10),
  expires_at: '',
  status: 'active',
};

function getSurveyUrl(token) {
  return `https://naguirrel0209.github.io/SISSAWebSite/encuesta/${token}`;
}

function toDateInput(value) {
  if (!value) return '';
  return new Date(value).toISOString().slice(0, 10);
}

const LINK_COLUMNS = [
  { label: 'Cliente', value: (row) => row.clients?.name ?? row.client_name ?? '' },
  { label: 'Codigo', value: (row) => row.clients?.code ?? row.client_code ?? '' },
  { label: 'Estado', value: (row) => row.status },
  { label: 'Creado', value: (row) => formatDateTime(row.created_at) },
  { label: 'Vence', value: (row) => formatDate(row.expires_at) },
  { label: 'Respondido', value: (row) => (row.completed_at ? formatDateTime(row.completed_at) : '') },
  { label: 'Enlace', value: (row) => getSurveyUrl(row.token) },
];

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState([]);
  const [clients, setClients] = useState([]);
  const [links, setLinks] = useState([]);
  const [form, setForm] = useState(EMPTY_CAMPAIGN);
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [selectedClients, setSelectedClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [linksLoading, setLinksLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const activeClients = useMemo(() => clients.filter((client) => client.active), [clients]);
  const selectedCampaignRecord = campaigns.find((campaign) => campaign.id === selectedCampaign);
  const selectedClientSet = useMemo(() => new Set(selectedClients), [selectedClients]);
  const duplicatePeriod = campaigns.some((campaign) => (
    campaign.id !== form.id
    && Number(campaign.period_year) === Number(form.period_year)
    && Number(campaign.period_month) === Number(form.period_month)
  ));

  const loadLinks = (campaignId = selectedCampaign) => {
    if (!campaignId) {
      setLinks([]);
      return Promise.resolve();
    }

    setLinksLoading(true);
    return listInvitationLinks(campaignId)
      .then(setLinks)
      .catch(() => setError('No fue posible cargar los enlaces de la campana.'))
      .finally(() => setLinksLoading(false));
  };

  const loadData = () => {
    setLoading(true);
    Promise.all([listCampaigns(), listClients()])
      .then(([campaignRows, clientRows]) => {
        setCampaigns(campaignRows);
        setClients(clientRows);
        const nextCampaign = selectedCampaign || campaignRows[0]?.id || '';
        setSelectedCampaign(nextCampaign);
        return loadLinks(nextCampaign);
      })
      .catch(() => setError('No fue posible cargar campanas y clientes.'))
      .finally(() => setLoading(false));
  };

  useEffect(loadData, []);

  useEffect(() => {
    loadLinks(selectedCampaign);
  }, [selectedCampaign]);

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleEdit = (campaign) => {
    setError('');
    setNotice('');
    setForm({
      id: campaign.id,
      name: campaign.name ?? '',
      period_year: campaign.period_year,
      period_month: campaign.period_month,
      starts_at: toDateInput(campaign.starts_at),
      expires_at: toDateInput(campaign.expires_at),
      status: campaign.status,
    });
  };

  const handleClientSelection = (event) => {
    const { value, checked } = event.target;
    setSelectedClients((current) => (
      checked ? [...current, value] : current.filter((id) => id !== value)
    ));
  };

  const selectAllClients = () => {
    setSelectedClients(activeClients.map((client) => client.id));
  };

  const clearClientSelection = () => {
    setSelectedClients([]);
  };

  const handleSaveCampaign = async (event) => {
    event.preventDefault();
    setError('');
    setNotice('');

    if (!form.name.trim() || !form.starts_at || !form.expires_at) {
      setError('Nombre, fecha de inicio y fecha de vencimiento son obligatorios.');
      return;
    }

    if (new Date(form.expires_at) <= new Date(form.starts_at)) {
      setError('La fecha de vencimiento debe ser posterior a la fecha de inicio.');
      return;
    }

    if (duplicatePeriod) {
      setError('Ya existe una campana para ese periodo.');
      return;
    }

    setSaving(true);
    try {
      const saved = await saveCampaign(form);
      setCampaigns((current) => {
        const exists = current.some((campaign) => campaign.id === saved.id);
        const next = exists
          ? current.map((campaign) => (campaign.id === saved.id ? saved : campaign))
          : [saved, ...current];

        return next.sort((a, b) => (
          Number(b.period_year) - Number(a.period_year)
          || Number(b.period_month) - Number(a.period_month)
        ));
      });
      setSelectedCampaign(saved.id);
      setForm(EMPTY_CAMPAIGN);
      setNotice('Campana guardada correctamente.');
      await loadLinks(saved.id);
    } catch {
      setError('No fue posible guardar la campana.');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (campaign, status) => {
    setError('');
    setNotice('');
    setStatusUpdatingId(campaign.id);

    try {
      await setCampaignStatus(campaign.id, status);
      setCampaigns((current) => current.map((item) => (
        item.id === campaign.id ? { ...item, status } : item
      )));
      setNotice('Estado de campana actualizado.');
    } catch {
      setError('No fue posible actualizar el estado de la campana.');
    } finally {
      setStatusUpdatingId('');
    }
  };

  const handleGenerate = async () => {
    setError('');
    setNotice('');

    if (!selectedCampaign || !selectedClients.length) {
      setError('Seleccione una campana y al menos un cliente.');
      return;
    }

    setGenerating(true);
    try {
      const rows = await generateSurveyInvitations(selectedCampaign, selectedClients);
      setLinks(rows);
      setSelectedClients([]);
      setNotice(`${rows.length} enlace(s) disponibles para la campana seleccionada.`);
    } catch {
      setError('No fue posible generar los enlaces.');
    } finally {
      setGenerating(false);
    }
  };

  const copyLink = async (token) => {
    await navigator.clipboard.writeText(getSurveyUrl(token));
    setNotice('Enlace copiado.');
  };

  const copyAllLinks = async () => {
    const content = links.map((row) => `${row.clients?.name ?? row.client_name}: ${getSurveyUrl(row.token)}`).join('\n');
    await navigator.clipboard.writeText(content);
    setNotice('Enlaces copiados.');
  };

  const exportLinks = (format) => {
    if (format === 'csv') {
      exportRowsToCsv(links, LINK_COLUMNS, 'enlaces-encuestas.csv');
      return;
    }

    exportRowsToExcel(links, LINK_COLUMNS, 'enlaces-encuestas.xls');
  };

  return (
    <>
      <AdminPageHeader
        eyebrow="Campanas"
        title="Campanas mensuales"
        description="Cree periodos de evaluacion, administre estados y genere enlaces privados por cliente."
        breadcrumb="Encuestas / Campanas"
      />

      <InlineError message={error} />
      {notice && <p className="mt-3 rounded-md border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-green-100">{notice}</p>}

      <section className="mt-4 grid gap-6 xl:grid-cols-[24rem_1fr]">
        <form className="glass-panel h-fit p-5" onSubmit={handleSaveCampaign}>
          <h3 className="text-lg font-bold text-white">{form.id ? 'Editar campana' : 'Nueva campana'}</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-white">Nombre</label>
              <input id="name" name="name" value={form.name} onChange={handleFormChange} className="mt-2 w-full border px-4 py-3" placeholder="Encuesta de satisfaccion - Agosto 2026" required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="period_year" className="text-sm font-semibold text-white">Ano</label>
                <input id="period_year" name="period_year" type="number" value={form.period_year} onChange={handleFormChange} className="mt-2 w-full border px-4 py-3" required />
              </div>
              <div>
                <label htmlFor="period_month" className="text-sm font-semibold text-white">Mes</label>
                <input id="period_month" name="period_month" type="number" min="1" max="12" value={form.period_month} onChange={handleFormChange} className="mt-2 w-full border px-4 py-3" required />
              </div>
            </div>
            <div>
              <label htmlFor="starts_at" className="text-sm font-semibold text-white">Fecha de inicio</label>
              <input id="starts_at" name="starts_at" type="date" value={form.starts_at} onChange={handleFormChange} className="mt-2 w-full border px-4 py-3" required />
            </div>
            <div>
              <label htmlFor="expires_at" className="text-sm font-semibold text-white">Fecha de vencimiento</label>
              <input id="expires_at" name="expires_at" type="date" value={form.expires_at} onChange={handleFormChange} className="mt-2 w-full border px-4 py-3" required />
            </div>
            <div>
              <label htmlFor="status" className="text-sm font-semibold text-white">Estado</label>
              <select id="status" name="status" value={form.status} onChange={handleFormChange} className="mt-2 w-full border px-4 py-3">
                <option value="draft">Borrador</option>
                <option value="active">Activa</option>
                <option value="completed">Cerrada</option>
                <option value="expired">Vencida</option>
                <option value="cancelled">Cancelada</option>
              </select>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="submit" className="btn-primary flex-1" disabled={saving}>{saving ? 'Guardando...' : 'Guardar campana'}</button>
              {form.id && <button type="button" className="btn-secondary" onClick={() => setForm(EMPTY_CAMPAIGN)}>Cancelar</button>}
            </div>
          </div>
        </form>

        <div className="space-y-6">
          <section className="glass-panel p-5">
            <h3 className="text-lg font-bold text-white">Campanas existentes</h3>
            {loading ? (
              <SkeletonBlock rows={4} />
            ) : campaigns.length ? (
              <div className="mt-4 overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Campana</th>
                      <th>Periodo</th>
                      <th>Estado</th>
                      <th>Vence</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.map((campaign) => (
                      <tr key={campaign.id}>
                        <td>{campaign.name}</td>
                        <td>{campaign.period_month}/{campaign.period_year}</td>
                        <td><StatusBadge status={campaign.status}>{campaign.status}</StatusBadge></td>
                        <td>{formatDate(campaign.expires_at)}</td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={() => handleEdit(campaign)}>Editar</button>
                            {campaign.status !== 'active' && (
                              <button type="button" className="btn-secondary min-h-0 px-3 py-2" disabled={statusUpdatingId === campaign.id} onClick={() => handleStatusChange(campaign, 'active')}>Activar</button>
                            )}
                            {campaign.status !== 'completed' && (
                              <button type="button" className="btn-secondary min-h-0 px-3 py-2" disabled={statusUpdatingId === campaign.id} onClick={() => handleStatusChange(campaign, 'completed')}>Cerrar</button>
                            )}
                            {campaign.status !== 'cancelled' && (
                              <button type="button" className="btn-secondary min-h-0 px-3 py-2" disabled={statusUpdatingId === campaign.id} onClick={() => handleStatusChange(campaign, 'cancelled')}>Cancelar</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="No hay campanas" body="Cree una campana mensual para generar invitaciones." />
            )}
          </section>

          <section className="glass-panel p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Generar invitaciones</h3>
                <p className="mt-1 text-sm text-muted-text">Seleccione campana, clientes y genere enlaces unicos.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={selectAllClients}>Seleccionar todos</button>
                <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={clearClientSelection}>Limpiar</button>
              </div>
            </div>

            {loading ? (
              <SkeletonBlock rows={4} />
            ) : campaigns.length && activeClients.length ? (
              <>
                <label htmlFor="selectedCampaign" className="mt-4 block text-sm font-semibold text-white">Campana</label>
                <select id="selectedCampaign" value={selectedCampaign} onChange={(event) => setSelectedCampaign(event.target.value)} className="mt-2 w-full border px-4 py-3">
                  {campaigns.map((campaign) => (
                    <option key={campaign.id} value={campaign.id}>{campaign.name}</option>
                  ))}
                </select>
                {selectedCampaignRecord && (
                  <p className="mt-2 text-sm text-muted-text">
                    Estado: {selectedCampaignRecord.status} | Vence: {formatDate(selectedCampaignRecord.expires_at)}
                  </p>
                )}

                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {activeClients.map((client) => (
                    <label key={client.id} className="flex items-center gap-3 rounded-md border border-border-cyber bg-white/[0.035] px-3 py-3 text-sm text-white">
                      <input type="checkbox" value={client.id} checked={selectedClientSet.has(client.id)} onChange={handleClientSelection} className="h-4 w-4" />
                      {client.name}
                    </label>
                  ))}
                </div>

                <button type="button" className="btn-primary mt-5 w-full sm:w-auto" onClick={handleGenerate} disabled={generating}>
                  {generating ? 'Generando...' : 'Generar invitaciones'}
                </button>
              </>
            ) : (
              <EmptyState title="Faltan datos" body="Necesita al menos una campana y un cliente activo." />
            )}
          </section>

          <section className="glass-panel p-5">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">Enlaces de la campana</h3>
                <p className="mt-1 text-sm text-muted-text">{links.length} enlace(s) disponibles.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={copyAllLinks} disabled={!links.length}>Copiar varios</button>
                <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={() => exportLinks('csv')} disabled={!links.length}>CSV</button>
                <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={() => exportLinks('xls')} disabled={!links.length}>Excel</button>
              </div>
            </div>

            {linksLoading ? (
              <div className="mt-4"><SkeletonBlock rows={5} /></div>
            ) : links.length ? (
              <div className="mt-4 overflow-x-auto">
                <table>
                  <thead>
                    <tr>
                      <th>Cliente</th>
                      <th>Estado</th>
                      <th>Creacion</th>
                      <th>Vencimiento</th>
                      <th>Respondida</th>
                      <th>Enlace</th>
                    </tr>
                  </thead>
                  <tbody>
                    {links.map((row) => (
                      <tr key={row.invitation_id ?? row.id}>
                        <td>{row.clients?.name ?? row.client_name}</td>
                        <td><StatusBadge status={row.status}>{row.status}</StatusBadge></td>
                        <td>{formatDateTime(row.created_at)}</td>
                        <td>{formatDate(row.expires_at)}</td>
                        <td>{row.completed_at ? formatDateTime(row.completed_at) : '-'}</td>
                        <td>
                          <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={() => copyLink(row.token)}>
                            <Copy className="h-4 w-4" aria-hidden="true" />
                            Copiar enlace
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState title="Sin enlaces" body="Genere invitaciones para la campana seleccionada." />
            )}
          </section>
        </div>
      </section>
    </>
  );
}
