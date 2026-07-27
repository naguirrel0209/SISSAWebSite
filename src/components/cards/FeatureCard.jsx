export default function FeatureCard({ title, description, icon: Icon, children, className = '' }) {
  return (
    <article className={`glass-panel interactive-card group rounded-lg p-6 ${className}`.trim()}>
      <span className="mb-6 block h-1 w-10 rounded-full bg-primary-cyan-bright/75 transition-all duration-200 group-hover:w-14 group-hover:bg-primary-cyan-bright" />
      {Icon ? <span className="icon-frame mb-5" aria-hidden="true"><Icon size={22} strokeWidth={1.8} /></span> : null}
      <h3 className="text-xl font-bold text-text">{title}</h3>
      {description ? <p className="mt-3 text-sm leading-7 text-muted-text">{description}</p> : null}
      {children}
    </article>
  );
}
