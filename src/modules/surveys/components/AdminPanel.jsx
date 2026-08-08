export function AdminPageHeader({ eyebrow, title, description, action, breadcrumb }) {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {breadcrumb && <p className="mb-2 text-xs font-semibold text-muted-text">{breadcrumb}</p>}
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-cyan-bright">{eyebrow}</p>
        <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-text">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, helper }) {
  return (
    <article className="glass-panel p-4">
      <p className="text-sm font-semibold text-muted-text">{label}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {helper && <p className="mt-2 text-xs text-muted-text">{helper}</p>}
    </article>
  );
}

const BADGE_STYLES = {
  active: 'border-success/30 bg-success/10 text-green-100',
  completed: 'border-primary-cyan-bright/30 bg-primary-cyan/15 text-blue-100',
  pending: 'border-warning/30 bg-warning/10 text-yellow-100',
  expired: 'border-slate-400/25 bg-slate-400/10 text-slate-100',
  cancelled: 'border-danger/30 bg-danger/10 text-red-100',
  draft: 'border-slate-400/25 bg-slate-400/10 text-slate-100',
  follow_up: 'border-danger/40 bg-danger/15 text-red-100',
  neutral: 'border-border-cyber bg-white/[0.04] text-slate-100',
};

export function StatusBadge({ status, children }) {
  const className = BADGE_STYLES[status] ?? BADGE_STYLES.neutral;

  return (
    <span className={`inline-flex items-center rounded-md border px-2.5 py-1 text-xs font-bold ${className}`}>
      {children ?? status}
    </span>
  );
}

export function SkeletonBlock({ rows = 3 }) {
  return (
    <div className="glass-panel space-y-3 p-5" aria-label="Cargando">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="h-4 animate-pulse rounded-md bg-white/[0.08]"
          style={{ width: `${100 - index * 12}%` }}
        />
      ))}
    </div>
  );
}

export function AlertCard({ title, body, action }) {
  return (
    <div className="rounded-md border border-danger/35 bg-danger/10 p-4">
      <p className="text-sm font-bold text-red-100">{title}</p>
      {body && <p className="mt-1 text-sm leading-6 text-red-100/80">{body}</p>}
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export function EmptyState({ title, body }) {
  return (
    <div className="glass-panel p-6 text-center">
      <p className="text-lg font-bold text-white">{title}</p>
      <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-text">{body}</p>
    </div>
  );
}

export function InlineError({ message }) {
  if (!message) return null;

  return (
    <p className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm font-semibold text-red-100" role="alert">
      {message}
    </p>
  );
}
