export const STORAGE_KEYS = {
  clients: "sis_insight_clients",
  campaigns: "sis_insight_campaigns",
  invitations: "sis_insight_invitations",
  responses: "sis_insight_responses",
  session: "sis_insight_session",
  initialized: "sis_insight_initialized",
  demoVersion: "sis_insight_demo_version",
} as const;

export function readCollection<T>(key: string): T[] {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T[]) : [];
  } catch {
    return [];
  }
}

export function writeCollection<T>(key: string, data: T[]): void {
  window.localStorage.setItem(key, JSON.stringify(data));
  window.dispatchEvent(new Event("sis_insight_updated"));
}

export function readValue<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

export function writeValue<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event("sis_insight_updated"));
}
