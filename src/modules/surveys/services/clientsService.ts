import type { Client, ClientStatus } from "@/types/sis";
import { STORAGE_KEYS, readCollection, writeCollection } from "./storage";

export type ClientInput = Omit<Client, "id" | "createdAt" | "status"> & { status?: ClientStatus };

export function getClients(): Client[] {
  return readCollection<Client>(STORAGE_KEYS.clients);
}

export function getClientById(id: string): Client | undefined {
  return getClients().find((client) => client.id === id);
}

export function createClient(input: ClientInput): Client {
  const client: Client = { ...input, id: crypto.randomUUID(), createdAt: new Date().toISOString(), status: input.status ?? "active" };
  writeCollection(STORAGE_KEYS.clients, [...getClients(), client]);
  return client;
}

export function updateClient(id: string, patch: Partial<Omit<Client, "id" | "createdAt">>): Client | undefined {
  const clients = getClients();
  const current = clients.find((client) => client.id === id);
  if (!current) return undefined;
  const updated = { ...current, ...patch };
  writeCollection(STORAGE_KEYS.clients, clients.map((client) => (client.id === id ? updated : client)));
  return updated;
}

export function toggleClientStatus(id: string): Client | undefined {
  const client = getClientById(id);
  return client ? updateClient(id, { status: client.status === "active" ? "inactive" : "active" }) : undefined;
}

