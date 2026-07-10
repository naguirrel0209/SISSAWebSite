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
    <section className="section-shell page-section pt-8 md:pt-12" aria-labelledby="page-title">
      <div className="grid items-center gap-8 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-3xl py-4">
          <Badge className="mb-5">{eyebrow}</Badge>
          <h1 id="page-title" className="text-4xl font-extrabold leading-[1.08] text-text sm:text-5xl lg:text-[3.35rem]">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-text sm:text-lg">{description}</p>
          {children}
        </div>
        {visual ? visual : (
        <div className="glass-panel rounded-lg p-4">
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
