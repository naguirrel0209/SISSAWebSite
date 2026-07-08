import Badge from './Badge.jsx';

export default function SectionHeader({ eyebrow, title, description, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'mx-auto text-center' : '';
  return (
    <header className={`max-w-3xl ${alignment} ${className}`.trim()}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-text md:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted-text">{description}</p> : null}
    </header>
  );
}
