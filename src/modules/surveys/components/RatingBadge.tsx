/** Sentinel Tactical visual reference: semantic result labels use text and restrained accent color. */
import { getRatingLabel } from "@/utils/metrics";

export function RatingBadge({ average, compact = false }: { average: number; compact?: boolean }) {
  const label = getRatingLabel(average);
  const styles = {
    Excelente: "border-cyan-300/25 bg-cyan-400/10 text-cyan-200",
    Satisfactorio: "border-sky-300/25 bg-sky-400/10 text-sky-200",
    Atención: "border-amber-300/25 bg-amber-300/10 text-amber-200",
    Crítico: "border-rose-300/25 bg-rose-400/10 text-rose-200",
  }[label];
  return <span className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.12em] ${styles}`}>{!compact && <span>{average.toFixed(1)}</span>}{label}</span>;
}

