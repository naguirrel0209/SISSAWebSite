import { useEffect, useState } from 'react';
import { AdminPageHeader, EmptyState, InlineError, SkeletonBlock, StatusBadge } from '../components/AdminPanel.jsx';
import { listClients, saveClient, setClientActive } from '../services/adminSurveyService.js';

const EMPTY_CLIENT = {
  id: null,
  name: '',
  code: '',
  contact_name: '',
  contact_email: '',
  active: true,
};

export default function AdminClientsPage() {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState(EMPTY_CLIENT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [updatingId, setUpdatingId] = useState('');
  const [confirmDeactivateId, setConfirmDeactivateId] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const loadClients = () => {
    setLoading(true);
    listClients()
      .then(setClients)
      .catch(() => setError('No fue posible cargar clientes.'))
      .finally(() => setLoading(false));
  };

  useEffect(loadClients, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleEdit = (client) => {
    setError('');
    setNotice('');
    setConfirmDeactivateId('');
    setForm({
      id: client.id,
      name: client.name ?? '',
      code: client.code ?? '',
      contact_name: client.contact_name ?? '',
      contact_email: client.contact_email ?? '',
      active: client.active,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('El nombre del cliente es obligatorio.');
      return;
    }

    if (form.contact_email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.contact_email)) {
      setError('Ingrese un correo valido o deje el campo vacio.');
      return;
    }

    setSaving(true);
    try {
      const saved = await saveClient(form);
      setClients((current) => {
        const exists = current.some((client) => client.id === saved.id);
        const next = exists
          ? current.map((client) => (client.id === saved.id ? saved : client))
          : [...current, saved];

        return next.sort((a, b) => a.name.localeCompare(b.name));
      });
      setForm(EMPTY_CLIENT);
      setNotice('Cliente guardado correctamente.');
    } catch {
      setError('No fue posible guardar el cliente.');
    } finally {
      setSaving(false);
    }
  };

  const toggleActive = async (client) => {
    setError('');
    setNotice('');
    setUpdatingId(client.id);
    try {
      await setClientActive(client.id, !client.active);
      setClients((current) => current.map((item) => (
        item.id === client.id ? { ...item, active: !client.active } : item
      )));
      setConfirmDeactivateId('');
      setNotice(client.active ? 'Cliente desactivado correctamente.' : 'Cliente activado correctamente.');
    } catch {
      setError('No fue posible actualizar el estado del cliente.');
    } finally {
      setUpdatingId('');
    }
  };

  return (
    <>
      <AdminPageHeader
        eyebrow="Clientes"
        title="Clientes"
        description="Administre los clientes habilitados para recibir encuestas mensuales."
        breadcrumb="Encuestas / Clientes"
      />

      <InlineError message={error} />
      {notice && <p className="rounded-md border border-success/30 bg-success/10 px-4 py-3 text-sm font-semibold text-green-100">{notice}</p>}

      <section className="mt-4 grid gap-6 xl:grid-cols-[24rem_1fr]">
        <form className="glass-panel h-fit p-5" onSubmit={handleSubmit}>
          <h3 className="text-lg font-bold text-white">{form.id ? 'Editar cliente' : 'Nuevo cliente'}</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-white">Nombre del cliente</label>
              <input id="name" name="name" value={form.name} onChange={handleChange} className="mt-2 w-full border px-4 py-3" required />
            </div>
            <div>
              <label htmlFor="code" className="text-sm font-semibold text-white">Codigo interno opcional</label>
              <input id="code" name="code" value={form.code} onChange={handleChange} className="mt-2 w-full border px-4 py-3" />
            </div>
            <div>
              <label htmlFor="contact_name" className="text-sm font-semibold text-white">Nombre de contacto opcional</label>
              <input id="contact_name" name="contact_name" value={form.contact_name} onChange={handleChange} className="mt-2 w-full border px-4 py-3" />
            </div>
            <div>
              <label htmlFor="contact_email" className="text-sm font-semibold text-white">Correo opcional</label>
              <input id="contact_email" name="contact_email" type="email" value={form.contact_email} onChange={handleChange} className="mt-2 w-full border px-4 py-3" />
            </div>
            <label className="flex items-center gap-3 text-sm font-semibold text-white">
              <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="h-4 w-4" />
              Cliente activo
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="submit" className="btn-primary flex-1" disabled={saving}>{saving ? 'Guardando...' : 'Guardar cliente'}</button>
              {form.id && (
                <button type="button" className="btn-secondary" onClick={() => setForm(EMPTY_CLIENT)}>Cancelar</button>
              )}
            </div>
          </div>
        </form>

        <div className="overflow-x-auto">
          {loading ? (
            <SkeletonBlock rows={5} />
          ) : clients.length ? (
            <table>
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Codigo</th>
                  <th>Contacto</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client.id}>
                    <td>{client.name}</td>
                    <td>{client.code ?? '-'}</td>
                    <td>{client.contact_email ?? client.contact_name ?? '-'}</td>
                    <td>
                      <StatusBadge status={client.active ? 'active' : 'cancelled'}>
                        {client.active ? 'Activo' : 'Inactivo'}
                      </StatusBadge>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={() => handleEdit(client)}>Editar</button>
                        {client.active && confirmDeactivateId !== client.id && (
                          <button
                            type="button"
                            className="btn-secondary min-h-0 px-3 py-2"
                            onClick={() => setConfirmDeactivateId(client.id)}
                            disabled={updatingId === client.id}
                          >
                            Desactivar
                          </button>
                        )}
                        {client.active && confirmDeactivateId === client.id && (
                          <>
                            <button
                              type="button"
                              className="btn-primary min-h-0 px-3 py-2"
                              onClick={() => toggleActive(client)}
                              disabled={updatingId === client.id}
                            >
                              {updatingId === client.id ? 'Procesando...' : 'Confirmar'}
                            </button>
                            <button type="button" className="btn-secondary min-h-0 px-3 py-2" onClick={() => setConfirmDeactivateId('')}>
                              Cancelar
                            </button>
                          </>
                        )}
                        {!client.active && (
                          <button
                            type="button"
                            className="btn-secondary min-h-0 px-3 py-2"
                            onClick={() => toggleActive(client)}
                            disabled={updatingId === client.id}
                          >
                            {updatingId === client.id ? 'Procesando...' : 'Activar'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <EmptyState title="No hay clientes registrados" body="Cree el primer cliente para generar enlaces privados." />
          )}
        </div>
      </section>
    </>
  );
}
