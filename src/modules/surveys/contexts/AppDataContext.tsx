import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { login as loginService, logout as logoutService, getSession } from "@/services/authService";
import { createClient as createClientService, getClients, toggleClientStatus as toggleClientStatusService, updateClient as updateClientService, type ClientInput } from "@/services/clientsService";
import { createCampaign as createCampaignService, getCampaigns, updateCampaignStatus as updateCampaignStatusService, type CampaignInput } from "@/services/campaignsService";
import { initializeDemoData, resetDemoData } from "@/services/demoDataService";
import { createInvitation, getInvitations } from "@/services/invitationsService";
import { getResponses } from "@/services/responsesService";
import type { CampaignStatus, Client, Campaign, SurveyInvitation, SurveyResponse } from "@/types/sis";

interface AppDataContextValue {
  clients: Client[];
  campaigns: Campaign[];
  invitations: SurveyInvitation[];
  responses: SurveyResponse[];
  isAuthenticated: boolean;
  isReady: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  refresh: () => void;
  resetDemo: () => void;
  createClient: (input: ClientInput) => Client;
  updateClient: (id: string, patch: Partial<Omit<Client, "id" | "createdAt">>) => Client | undefined;
  toggleClientStatus: (id: string) => Client | undefined;
  createCampaignWithInvitation: (input: CampaignInput) => { campaign: Campaign; invitation: SurveyInvitation };
  updateCampaignStatus: (id: string, status: CampaignStatus) => Campaign | undefined;
}

const AppDataContext = createContext<AppDataContextValue | undefined>(undefined);

export function AppDataProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [invitations, setInvitations] = useState<SurveyInvitation[]>([]);
  const [responses, setResponses] = useState<SurveyResponse[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(getSession()));
  const [isReady, setIsReady] = useState(false);

  const refresh = useCallback(() => {
    initializeDemoData();
    setClients(getClients());
    setCampaigns(getCampaigns());
    setInvitations(getInvitations());
    setResponses(getResponses());
    setIsAuthenticated(Boolean(getSession()));
    setIsReady(true);
  }, []);

  useEffect(() => {
    refresh();
    window.addEventListener("storage", refresh);
    window.addEventListener("sis_insight_updated", refresh);
    return () => {
      window.removeEventListener("storage", refresh);
      window.removeEventListener("sis_insight_updated", refresh);
    };
  }, [refresh]);

  const value = useMemo<AppDataContextValue>(() => ({
    clients, campaigns, invitations, responses, isAuthenticated, isReady,
    refresh,
    login: (username, password) => {
      const success = loginService(username, password);
      setIsAuthenticated(success);
      return success;
    },
    logout: () => { logoutService(); setIsAuthenticated(false); },
    resetDemo: () => { resetDemoData(); refresh(); },
    createClient: (input) => { const created = createClientService(input); refresh(); return created; },
    updateClient: (id, patch) => { const updated = updateClientService(id, patch); refresh(); return updated; },
    toggleClientStatus: (id) => { const updated = toggleClientStatusService(id); refresh(); return updated; },
    createCampaignWithInvitation: (input) => {
      const campaign = createCampaignService(input);
      const invitation = createInvitation(campaign.id, campaign.clientId, campaign.expirationDate);
      refresh();
      return { campaign, invitation };
    },
    updateCampaignStatus: (id, status) => { const updated = updateCampaignStatusService(id, status); refresh(); return updated; },
  }), [campaigns, clients, invitations, isAuthenticated, isReady, refresh, responses]);

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData(): AppDataContextValue {
  const context = useContext(AppDataContext);
  if (!context) throw new Error("useAppData debe utilizarse dentro de AppDataProvider.");
  return context;
}

