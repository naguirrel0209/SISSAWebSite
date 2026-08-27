/** Service Clarity: metrics communicate a single clear status with accessible text and a quiet accent. */
import type { LucideIcon } from "lucide-react";

export function MetricCard({ label, value, note, icon: Icon, accent = "cyan" }: { label: string; value: string; note: string; icon: LucideIcon; accent?: "cyan" | "amber" | "rose" | "steel" }) {
  return <article className={`metric-card metric-${accent}`}><div><p className="metric-label">{label}</p><p className="metric-value">{value}</p><p className="metric-note">{note}</p></div><div className="metric-icon"><Icon size={20} /></div></article>;
}

