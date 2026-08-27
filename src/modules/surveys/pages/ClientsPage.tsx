/** Sentinel Tactical visual reference: client records are disciplined, editable entries in the command perimeter. */
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Search, Plus, Pencil, Power, UsersRound, X } from "lucide-react";
import { toast } from "sonner";
import { AdminLayout } from "@/layouts/AdminLayout";
import { useAppData } from "@/contexts/AppDataContext";
import { SERVICE_OPTIONS, type Client } from "@/types/sis";

type ClientDraft = { commercialName: string; legalName: string; contactName: string; email: string; phone: string; serviceType: string; };
const emptyDraft: ClientDraft = { commercialName: "", legalName: "", contactName: "", email: "", phone: "", serviceType: SERVICE_OPTIONS[0] };

function ClientPanel({ client, onClose }: { client?: Client; onClose: () => void }) {
  const { createClient, updateClient } = useAppData();
  const [draft, setDraft] = useState<ClientDraft>(emptyDraft);
  useEffect(() => { setDraft(client ? { commercialName: client.commercialName, legalName: client.legalName ?? "", contactName: client.contactName ?? "", email: client.email ?? "", phone: client.phone ?? "", serviceType: client.serviceType } : emptyDraft); }, [client]);
  const set = (field: keyof ClientDraft, value: string) => setDraft((previous) => ({ ...previous, [field]: value }));
  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.commercialName.trim()) { toast.error("El nombre comercial es obligatorio."); return; }
    if (draft.email && !/^\S+@\S+\.\S+$/.test(draft.email)) { toast.error("Ingrese un correo electrónico válido."); return; }
    if (client) { updateClient(client.id, draft); toast.success("Cliente actualizado"); } else { createClient(draft); toast.success("Cliente creado correctamente"); }
    onClose();
  };
  return <div className="fixed inset-0 z-50 flex justify-end bg-[#030612]/60 backdrop-blur-sm"><aside className="animate-panel-in flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#0d1730] shadow-2xl"><header className="flex items-center justify-between border-b border-white/10 p-6"><div><p className="eyebrow">Registro de cliente</p><h3 className="mt-1 font-display text-xl font-semibold text-white">{client ? "Editar cliente" : "Nuevo cliente"}</h3></div><button className="icon-button" onClick={onClose} aria-label="Cerrar formulario"><X size={18} /></button></header><form onSubmit={submit} className="flex flex-1 flex-col overflow-y-auto p-6"><div className="space-y-4"><label className="field-label">Nombre comercial *<input value={draft.commercialName} onChange={(e) => set("commercialName", e.target.value)} required /></label><label className="field-label">Razón social<input value={draft.legalName} onChange={(e) => set("legalName", e.target.value)} /></label><label className="field-label">Contacto<input value={draft.contactName} onChange={(e) => set("contactName", e.target.value)} /></label><label className="field-label">Correo electrónico<input type="email" value={draft.email} onChange={(e) => set("email", e.target.value)} /></label><label className="field-label">Teléfono<input value={draft.phone} onChange={(e) => set("phone", e.target.value)} /></label><label className="field-label">Servicio principal<select value={draft.serviceType} onChange={(e) => set("serviceType", e.target.value)}>{SERVICE_OPTIONS.map((option) => <option key={option}>{option}</option>)}</select></label></div><div className="mt-auto flex gap-3 pt-8"><button type="button" className="secondary-button flex-1" onClick={onClose}>Cancelar</button><button type="submit" className="primary-button flex-1">{client ? "Guardar cambios" : "Crear cliente"}</button></div></form></aside></div>;
}

export default function ClientsPage() {
  const { clients, toggleClientStatus } = useAppData();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [activeClient, setActiveClient] = useState<Client | undefined>();
  const [panelOpen, setPanelOpen] = useState(false);
  const filtered = useMemo(() => clients.filter((client) => (status === "all" || client.status === status) && `${client.commercialName} ${client.email ?? ""} ${client.serviceType}`.toLowerCase().includes(search.toLowerCase())), [clients, search, status]);
  return <AdminLayout><div className="relative z-10 mx-auto max-w-7xl"><section className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><div><p className="eyebrow text-[#18c6be]">Directorio protegido</p><h2 className="mt-2 font-display text-3xl font-bold text-white">Clientes</h2><p className="mt-2 text-sm text-slate-400">Administre las cuentas que participan en las evaluaciones de servicio.</p></div><button className="primary-button" onClick={() => { setActiveClient(undefined); setPanelOpen(true); }}><Plus size={17} />Crear cliente</button></section><section className="sentinel-surface overflow-hidden"><div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row"><label className="input-wrap flex-1"><Search size={16} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar por cliente, correo o servicio" aria-label="Buscar clientes" /></label><select className="filter-select" value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filtrar por estado"><option value="all">Todos los estados</option><option value="active">Activos</option><option value="inactive">Inactivos</option></select></div><div className="overflow-x-auto"><table className="data-table"><thead><tr><th>Cliente</th><th>Contacto</th><th>Servicio</th><th>Estado</th><th className="text-right">Acciones</th></tr></thead><tbody>{filtered.map((client) => <tr key={client.id}><td><p className="font-medium text-white">{client.commercialName}</p><p className="mt-1 text-xs text-slate-500">{client.legalName || "Sin razón social"}</p></td><td><p>{client.contactName || "—"}</p><p className="mt-1 text-xs text-slate-500">{client.email || "Sin correo"}</p></td><td>{client.serviceType}</td><td><span className={`status-badge ${client.status === "active" ? "status-active" : "status-muted"}`}>{client.status === "active" ? "Activo" : "Inactivo"}</span></td><td><div className="flex justify-end gap-2"><button className="icon-button" onClick={() => { setActiveClient(client); setPanelOpen(true); }} aria-label={`Editar ${client.commercialName}`}><Pencil size={15} /></button><button className="icon-button" onClick={() => { toggleClientStatus(client.id); toast.success(client.status === "active" ? "Cliente desactivado" : "Cliente activado"); }} aria-label={client.status === "active" ? "Desactivar cliente" : "Activar cliente"}><Power size={15} /></button></div></td></tr>)}</tbody></table></div>{!filtered.length && <div className="grid min-h-48 place-items-center p-8 text-center"><UsersRound className="mb-3 text-slate-600" size={28} /><p className="text-sm text-slate-400">No encontramos clientes con estos filtros.</p></div>}</section>{panelOpen && <ClientPanel client={activeClient} onClose={() => setPanelOpen(false)} />}</div></AdminLayout>;
}

