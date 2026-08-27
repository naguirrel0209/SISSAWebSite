import type { SurveyContext, SurveyInvitation } from "@/types/sis";
import { getCampaignById } from "./campaignsService";
import { getClientById } from "./clientsService";
import { STORAGE_KEYS, readCollection, writeCollection } from "./storage";

const TOKEN_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function makeToken(): string {
  const characters = Array.from({ length: 6 }, () => TOKEN_ALPHABET[Math.floor(Math.random() * TOKEN_ALPHABET.length)]).join("");
  return `SIS-${characters}`;
}

function normalizeInvitation(invitation: SurveyInvitation): SurveyInvitation {
  if (invitation.status === "pending" && new Date(invitation.expiresAt) < new Date()) return { ...invitation, status: "expired" };
  return invitation;
}

export function getInvitations(): SurveyInvitation[] {
  const invitations = readCollection<SurveyInvitation>(STORAGE_KEYS.invitations);
  const normalized = invitations.map(normalizeInvitation);
  if (JSON.stringify(invitations) !== JSON.stringify(normalized)) writeCollection(STORAGE_KEYS.invitations, normalized);
  return normalized;
}

export function getInvitationByToken(token: string): SurveyInvitation | undefined {
  return getInvitations().find((invitation) => invitation.token.toUpperCase() === token.toUpperCase());
}

export function createInvitation(campaignId: string, clientId: string, expiresAt: string): SurveyInvitation {
  const existing = new Set(getInvitations().map((invitation) => invitation.token));
  let token = makeToken();
  while (existing.has(token)) token = makeToken();
  const invitation: SurveyInvitation = { id: crypto.randomUUID(), campaignId, clientId, token, status: "pending", createdAt: new Date().toISOString(), expiresAt };
  writeCollection(STORAGE_KEYS.invitations, [...getInvitations(), invitation]);
  return invitation;
}

export function updateInvitation(id: string, patch: Partial<Omit<SurveyInvitation, "id" | "createdAt" | "token">>): SurveyInvitation | undefined {
  const invitations = getInvitations();
  const current = invitations.find((invitation) => invitation.id === id);
  if (!current) return undefined;
  const updated = { ...current, ...patch };
  writeCollection(STORAGE_KEYS.invitations, invitations.map((invitation) => (invitation.id === id ? updated : invitation)));
  return updated;
}

export function getSurveyContextByToken(token: string): SurveyContext | undefined {
  const invitation = getInvitationByToken(token);
  if (!invitation) return undefined;
  const campaign = getCampaignById(invitation.campaignId);
  const client = getClientById(invitation.clientId);
  return campaign && client ? { invitation, campaign, client } : undefined;
}

