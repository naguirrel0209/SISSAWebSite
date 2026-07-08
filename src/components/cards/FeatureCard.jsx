export default function FeatureCard({ title, description, icon: Icon, children, className = '' }) {
  return (
    <article className={`glass-panel interactive-card rounded-lg p-5 ${className}`.trim()}>
      {Icon ? <span className="icon-frame mb-5" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></span> : null}
      <h3 className="text-lg font-bold text-text">{title}</h3>
      {description ? <p className="mt-3 text-sm leading-6 text-muted-text">{description}</p> : null}
      {children}
    </article>
  );
}
