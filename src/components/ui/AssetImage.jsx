const heights = {
  compact: 'min-h-44',
  default: 'min-h-64',
  tall: 'min-h-[22rem]',
  portrait: 'min-h-80',
};

export default function AssetImage({
  src,
  alt,
  size = 'default',
  caption,
  className = '',
  imageClassName = '',
  objectPosition = 'center',
  loading = 'lazy',
  fetchPriority,
}) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-md border border-white/8 bg-surface-high/45 shadow-[0_18px_42px_rgba(0,0,0,0.24)] ${heights[size] ?? heights.default} ${className}`.trim()}
    >
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.035] ${imageClassName}`.trim()}
        style={{ objectPosition }}
        loading={loading}
        fetchPriority={fetchPriority}
      />
      {caption ? (
        <>
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background/95 via-background/45 to-transparent" aria-hidden="true" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 text-xs font-bold uppercase tracking-[0.14em] text-slate-100">
            {caption}
          </figcaption>
        </>
      ) : null}
    </figure>
  );
}
