import AssetPlaceholder from '../ui/AssetPlaceholder.jsx';
import AssetImage from '../ui/AssetImage.jsx';
import Badge from '../ui/Badge.jsx';

export default function PageHeader({
  eyebrow,
  title,
  description,
  assetLabel,
  assetIcon,
  assetSrc,
  assetAlt,
  assetCaption,
  assetObjectPosition,
  children,
  visual,
}) {
  return (
    <section className="section-shell page-section pt-12 md:pt-16" aria-labelledby="page-title">
      <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
        <div className="max-w-3xl py-6">
          <Badge className="mb-5">{eyebrow}</Badge>
          <h1 id="page-title" className="text-4xl font-bold leading-[1.06] text-text sm:text-5xl lg:text-[3.5rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-text sm:text-lg">{description}</p>
          {children}
        </div>
        {visual ? visual : (
        <div className="glass-panel rounded-lg p-3">
          {assetSrc ? (
            <AssetImage
              src={assetSrc}
              alt={assetAlt}
              caption={assetCaption}
              objectPosition={assetObjectPosition}
              size="tall"
              loading="eager"
              fetchPriority="high"
            />
          ) : (
            <AssetPlaceholder label={assetLabel} icon={assetIcon} size="tall" />
          )}
        </div>
        )}
      </div>
    </section>
  );
}
