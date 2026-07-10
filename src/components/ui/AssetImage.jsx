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
      className={`group relative overflow-hidden rounded-md border border-primary-cyan-bright/25 bg-surface-high/45 shadow-[0_16px_34px_rgba(18,22,20,0.12)] ${heights[size] ?? heights.default} ${className}`.trim()}
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
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#121614]/90 via-[#121614]/45 to-transparent" aria-hidden="true" />
          <figcaption className="absolute inset-x-0 bottom-0 p-4 text-xs font-bold uppercase tracking-[0.14em] text-[#f7f2e8]">
            {caption}
          </figcaption>
        </>
      ) : null}
    </figure>
  );
}
