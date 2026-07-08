export default function Badge({ children, className = '' }) {
  return <p className={`eyebrow ${className}`.trim()}>{children}</p>;
}
