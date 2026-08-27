export function formatDate(value: string, options: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short", year: "numeric" }): string {
  return new Intl.DateTimeFormat("es-GT", options).format(new Date(value));
}

export function formatShortDate(value: string): string {
  return formatDate(value, { day: "2-digit", month: "short" });
}

export function surveyLink(token: string): string {
  return `${window.location.origin}${import.meta.env.BASE_URL}encuesta/${token}`;
}

export function toCsvValue(value: string | number | boolean | undefined): string {
  const normalized = value === undefined ? "" : String(value);
  return `"${normalized.replaceAll('"', '""')}"`;
}
