/** Sentinel Tactical visual reference: invitation links are explicit, copyable operational artifacts. */
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { surveyLink } from "@/utils/format";

export function CopyInvitationLink({ token, minimal = false }: { token: string; minimal?: boolean }) {
  const link = surveyLink(token);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      toast.success("Enlace copiado correctamente");
    } catch {
      toast.error("No fue posible copiar el enlace. Intente nuevamente.");
    }
  };
  if (minimal) return <button onClick={copy} className="icon-button" aria-label={`Copiar enlace de ${token}`}><Copy size={15} /></button>;
  return (
    <div className="mt-3 flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-slate-950/35 px-3 py-2">
      <code className="min-w-0 flex-1 truncate text-xs text-slate-300">{link}</code>
      <button onClick={copy} className="icon-button" aria-label="Copiar enlace"><Copy size={15} /></button>
      <a href={link} target="_blank" rel="noreferrer" className="icon-button" aria-label="Abrir encuesta"><ExternalLink size={15} /></a>
    </div>
  );
}

