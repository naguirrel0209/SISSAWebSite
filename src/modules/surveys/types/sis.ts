export type ClientStatus = 'active' | 'inactive';
export type CampaignStatus = 'active' | 'closed' | 'cancelled';
export type InvitationStatus = 'pending' | 'completed' | 'expired' | 'cancelled';

export interface Client {
  id: string;
  commercialName: string;
  legalName: string;
  contactName: string;
  email: string;
  phone: string;
  serviceType: string;
  status: ClientStatus;
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  clientId: string;
  serviceType: string;
  period: string;
  expirationDate: string;
  status: CampaignStatus;
  createdAt: string;
}

export interface SurveyInvitation {
  id: string;
  campaignId: string;
  clientId: string;
  token: string;
  status: InvitationStatus;
  createdAt: string;
  expiresAt: string;
  completedAt?: string;
}

export interface SurveyResponse {
  id: string;
  invitationId: string;
  clientId: string;
  campaignId: string;
  answers: [number, number, number, number, number];
  comment?: string;
  contactRequested?: boolean;
  submittedAt: string;
}

export interface SurveyContext {
  invitation: SurveyInvitation;
  campaign: Campaign;
  client: Client;
}

export type ResponseRecord = SurveyResponse & {
  client: Client;
  campaign: Campaign;
  invitation: SurveyInvitation;
  average: number;
};

export const SERVICE_OPTIONS = [
  'Seguridad Privada',
  'Custodio en Ruta',
  'Monitoreo 24/7',
  'Logística Segura',
  'Capacitación',
] as const;

export const SURVEY_QUESTIONS = [
  '¿Cómo califica la calidad general del servicio recibido?',
  '¿Cómo califica el profesionalismo del personal asignado?',
  '¿Cómo califica el cumplimiento de procedimientos y protocolos?',
  '¿Cómo califica la atención y capacidad de respuesta ante solicitudes?',
  '¿Qué tan satisfecho se encuentra con Corporación SIS en general?',
] as const;
