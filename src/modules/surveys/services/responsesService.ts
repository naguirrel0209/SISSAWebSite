import type { ResponseRecord, SurveyResponse } from "@/types/sis";
import { getCampaignById } from "./campaignsService";
import { getClientById } from "./clientsService";
import { getInvitationByToken, getInvitations, updateInvitation } from "./invitationsService";
import { STORAGE_KEYS, readCollection, writeCollection } from "./storage";
import { getResponseAverage } from "@/utils/metrics";

export interface SurveySubmission {
  token: string;
  answers: [number, number, number, number, number];
  comment?: string;
  contactRequested?: boolean;
}

export function getResponses(): SurveyResponse[] {
  return readCollection<SurveyResponse>(STORAGE_KEYS.responses);
}

export function getResponseRecords(): ResponseRecord[] {
  const invitations = getInvitations();
  return getResponses()
    .map((response) => {
      const client = getClientById(response.clientId);
      const campaign = getCampaignById(response.campaignId);
      const invitation = invitations.find((item) => item.id === response.invitationId);
      if (!client || !campaign || !invitation) return undefined;
      return { ...response, client, campaign, invitation, average: getResponseAverage(response) };
    })
    .filter((record): record is ResponseRecord => Boolean(record))
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
}

export function getResponseRecordById(id: string): ResponseRecord | undefined {
  return getResponseRecords().find((record) => record.id === id);
}

export function submitSurveyResponse(submission: SurveySubmission): SurveyResponse {
  const invitation = getInvitationByToken(submission.token);
  if (!invitation) throw new Error("La invitación no existe.");
  if (invitation.status === "completed") throw new Error("Esta evaluación ya fue completada.");
  if (invitation.status === "expired") throw new Error("Esta evaluación ha vencido.");
  if (invitation.status !== "pending") throw new Error("Esta evaluación no está disponible.");
  if (submission.answers.some((answer) => answer < 1 || answer > 5)) throw new Error("Complete las cinco calificaciones.");
  const response: SurveyResponse = {
    id: crypto.randomUUID(),
    invitationId: invitation.id,
    clientId: invitation.clientId,
    campaignId: invitation.campaignId,
    answers: submission.answers,
    comment: submission.comment?.trim() || undefined,
    contactRequested: submission.contactRequested,
    submittedAt: new Date().toISOString(),
  };
  writeCollection(STORAGE_KEYS.responses, [...getResponses(), response]);
  updateInvitation(invitation.id, { status: "completed", completedAt: response.submittedAt });
  return response;
}

