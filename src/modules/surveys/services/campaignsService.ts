import type { Campaign, CampaignStatus } from "@/types/sis";
import { STORAGE_KEYS, readCollection, writeCollection } from "./storage";

export type CampaignInput = Omit<Campaign, "id" | "createdAt" | "status"> & { status?: CampaignStatus };

export function getCampaigns(): Campaign[] {
  return readCollection<Campaign>(STORAGE_KEYS.campaigns);
}

export function getCampaignById(id: string): Campaign | undefined {
  return getCampaigns().find((campaign) => campaign.id === id);
}

export function createCampaign(input: CampaignInput): Campaign {
  const campaign: Campaign = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: input.status ?? "active" };
  writeCollection(STORAGE_KEYS.campaigns, [...getCampaigns(), campaign]);
  return campaign;
}

export function updateCampaign(id: string, patch: Partial<Omit<Campaign, "id" | "createdAt">>): Campaign | undefined {
  const campaigns = getCampaigns();
  const current = campaigns.find((campaign) => campaign.id === id);
  if (!current) return undefined;
  const updated = { ...current, ...patch };
  writeCollection(STORAGE_KEYS.campaigns, campaigns.map((campaign) => (campaign.id === id ? updated : campaign)));
  return updated;
}

export function updateCampaignStatus(id: string, status: CampaignStatus): Campaign | undefined {
  return updateCampaign(id, { status });
}

