import { STORAGE_KEYS, readValue, writeValue } from "./storage";

interface DemoSession { username: string; startedAt: string; }

// DEMO AUTH ONLY — never use these client-side credentials for real authentication.
const DEMO_CREDENTIALS = { username: "admin", password: "sis2026" };

export function login(username: string, password: string): boolean {
  if (username !== DEMO_CREDENTIALS.username || password !== DEMO_CREDENTIALS.password) return false;
  writeValue<DemoSession>(STORAGE_KEYS.session, { username, startedAt: new Date().toISOString() });
  return true;
}

export function logout(): void {
  window.localStorage.removeItem(STORAGE_KEYS.session);
  window.dispatchEvent(new Event("sis_insight_updated"));
}

export function getSession(): DemoSession | null {
  return readValue<DemoSession>(STORAGE_KEYS.session);
}

