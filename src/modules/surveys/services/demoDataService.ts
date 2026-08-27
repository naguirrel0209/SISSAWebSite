import { demoCampaigns, demoClients, demoInvitations, demoResponses } from "@/data/demoData";
import { STORAGE_KEYS, writeCollection } from "./storage";

const DEMO_VERSION = "2";

export function initializeDemoData(): void {
  const initialized = window.localStorage.getItem(STORAGE_KEYS.initialized) === "true";
  const currentVersion = window.localStorage.getItem(STORAGE_KEYS.demoVersion);
  if (initialized && currentVersion === DEMO_VERSION) return;
  resetDemoData();
}

export function resetDemoData(): void {
  writeCollection(STORAGE_KEYS.clients, demoClients);
  writeCollection(STORAGE_KEYS.campaigns, demoCampaigns);
  writeCollection(STORAGE_KEYS.invitations, demoInvitations);
  writeCollection(STORAGE_KEYS.responses, demoResponses);
  window.localStorage.setItem(STORAGE_KEYS.initialized, "true");
  window.localStorage.setItem(STORAGE_KEYS.demoVersion, DEMO_VERSION);
  window.dispatchEvent(new Event("sis_insight_updated"));
}
