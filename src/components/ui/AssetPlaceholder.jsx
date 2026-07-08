import { ShieldCheck } from 'lucide-react';

const heights = {
  compact: 'min-h-44',
  default: 'min-h-64',
  tall: 'min-h-[22rem]',
};

export default function AssetPlaceholder({
  label,
  icon: Icon = ShieldCheck,
  size = 'default',
  description = 'Activo real o integración oficial requerida',
  className = '',
}) {
  return (
    <div
      className={`asset-placeholder ${heights[size] ?? heights.default} ${className}`.trim()}
      role="img"
      aria-label={label}
    >
      <div className="asset-placeholder__glow" aria-hidden="true" />
      <div className="relative max-w-sm">
        <span className="icon-frame mx-auto" aria-hidden="true">
          <Icon size={22} strokeWidth={1.7} />
        </span>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.16em] text-muted-text">{label}</p>
        <p className="mt-2 text-[11px] leading-5 text-muted-text/75">{description}</p>
      </div>
    </div>
  );
}
