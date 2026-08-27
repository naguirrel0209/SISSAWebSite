import type { Campaign, Client, SurveyInvitation, SurveyResponse } from "@/types/sis";

const daysFromNow = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

const daysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

export const demoClients: Client[] = [
  { id: "cli-transportes", commercialName: "Transportes del Centro, S.A.", legalName: "Transportes del Centro, Sociedad Anónima", contactName: "Área de Operaciones", email: "operaciones@transportes-centro.demo", phone: "+502 2200 1101", serviceType: "Custodio en Ruta", status: "active", createdAt: daysAgo(120) },
  { id: "cli-metropolitano", commercialName: "Grupo Metropolitano", legalName: "Grupo Metropolitano, S.A.", contactName: "Dirección Administrativa", email: "administracion@metropolitano.demo", phone: "+502 2200 1102", serviceType: "Seguridad Privada", status: "active", createdAt: daysAgo(102) },
  { id: "cli-distribuidora", commercialName: "Distribuidora Nacional", legalName: "Distribuidora Nacional, S.A.", contactName: "Gerencia de Riesgos", email: "riesgos@distribuidora.demo", phone: "+502 2200 1103", serviceType: "Monitoreo 24/7", status: "active", createdAt: daysAgo(88) },
  { id: "cli-logistica", commercialName: "Logística Integral GT", legalName: "Logística Integral Guatemala, S.A.", contactName: "Centro de Control", email: "control@logistica-gt.demo", phone: "+502 2200 1104", serviceType: "Logística Segura", status: "active", createdAt: daysAgo(71) },
  { id: "cli-maya", commercialName: "Corporación Industrial Maya", legalName: "Corporación Industrial Maya, S.A.", contactName: "Gestión de Planta", email: "planta@industrial-maya.demo", phone: "+502 2200 1105", serviceType: "Seguridad Privada", status: "inactive", createdAt: daysAgo(63) },
  { id: "cli-norte", commercialName: "Servicios Ejecutivos del Norte", legalName: "Servicios Ejecutivos del Norte, S.A.", contactName: "Coordinación General", email: "coordinacion@ejecutivos-norte.demo", phone: "+502 2200 1106", serviceType: "Capacitación", status: "active", createdAt: daysAgo(49) },
];

export const demoCampaigns: Campaign[] = [
  { id: "cam-rutas", name: "Evaluación trimestral de rutas", clientId: "cli-transportes", serviceType: "Custodio en Ruta", period: "T2 2026", createdAt: daysAgo(35), expirationDate: daysFromNow(28), status: "active" },
  { id: "cam-sedes", name: "Control de sedes metropolitanas", clientId: "cli-metropolitano", serviceType: "Seguridad Privada", period: "T2 2026", createdAt: daysAgo(29), expirationDate: daysFromNow(21), status: "active" },
  { id: "cam-monitoreo", name: "Continuidad de monitoreo", clientId: "cli-distribuidora", serviceType: "Monitoreo 24/7", period: "T2 2026", createdAt: daysAgo(24), expirationDate: daysFromNow(14), status: "active" },
  { id: "cam-logistica", name: "Revisión de logística protegida", clientId: "cli-logistica", serviceType: "Logística Segura", period: "T1 2026", createdAt: daysAgo(72), expirationDate: daysAgo(5), status: "closed" },
];

export const demoInvitations: SurveyInvitation[] = [
  { id: "inv-001", campaignId: "cam-rutas", clientId: "cli-transportes", token: "SIS-7QK2M9", status: "pending", createdAt: daysAgo(32), expiresAt: daysFromNow(28) },
  { id: "inv-002", campaignId: "cam-rutas", clientId: "cli-transportes", token: "SIS-F8V3L1", status: "pending", createdAt: daysAgo(30), expiresAt: daysFromNow(28) },
  { id: "inv-003", campaignId: "cam-rutas", clientId: "cli-transportes", token: "SIS-A8K32F", status: "pending", createdAt: daysAgo(4), expiresAt: daysFromNow(28) },
  { id: "inv-004", campaignId: "cam-sedes", clientId: "cli-metropolitano", token: "SIS-P4N7X2", status: "pending", createdAt: daysAgo(25), expiresAt: daysFromNow(21) },
  { id: "inv-005", campaignId: "cam-sedes", clientId: "cli-metropolitano", token: "SIS-C9R5T8", status: "pending", createdAt: daysAgo(20), expiresAt: daysFromNow(21) },
  { id: "inv-006", campaignId: "cam-sedes", clientId: "cli-metropolitano", token: "SIS-M6D1W4", status: "pending", createdAt: daysAgo(5), expiresAt: daysFromNow(21) },
  { id: "inv-007", campaignId: "cam-monitoreo", clientId: "cli-distribuidora", token: "SIS-H3B9Y7", status: "pending", createdAt: daysAgo(19), expiresAt: daysFromNow(14) },
  { id: "inv-008", campaignId: "cam-monitoreo", clientId: "cli-distribuidora", token: "SIS-Z5J8E6", status: "pending", createdAt: daysAgo(17), expiresAt: daysFromNow(14) },
  { id: "inv-009", campaignId: "cam-monitoreo", clientId: "cli-distribuidora", token: "SIS-L2S4G9", status: "expired", createdAt: daysAgo(41), expiresAt: daysAgo(2) },
  { id: "inv-010", campaignId: "cam-logistica", clientId: "cli-logistica", token: "SIS-U7C1Q5", status: "expired", createdAt: daysAgo(68), expiresAt: daysAgo(5) },
  { id: "inv-011", campaignId: "cam-logistica", clientId: "cli-logistica", token: "SIS-E4K6R3", status: "expired", createdAt: daysAgo(66), expiresAt: daysAgo(5) },
  { id: "inv-012", campaignId: "cam-logistica", clientId: "cli-logistica", token: "SIS-V9M2P7", status: "pending", createdAt: daysAgo(8), expiresAt: daysFromNow(9) },
];

export const demoResponses: SurveyResponse[] = [];
