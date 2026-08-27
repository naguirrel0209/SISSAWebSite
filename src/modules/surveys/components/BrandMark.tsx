/** Service Clarity: temporary brand system in CSS, designed for institutional recognition without external assets. */
import { ShieldCheck } from "lucide-react";

interface BrandMarkProps { compact?: boolean; light?: boolean; }

export function BrandMark({ compact = false, light = false }: BrandMarkProps) {
  return <div className={`brand-lockup ${light ? "brand-lockup-light" : ""}`} aria-label="SIS Insight, Experiencia del Cliente de Corporación SIS"><div className="brand-shield" aria-hidden="true"><ShieldCheck size={compact ? 16 : 18} strokeWidth={2.4} /><span>SIS</span></div>{!compact && <div className="brand-wordmark"><strong>SIS Insight</strong><span>Experiencia del Cliente</span><small>Corporación SIS</small></div>}</div>;
}
