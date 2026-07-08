import ButtonLink from '../ui/ButtonLink.jsx';
import SectionHeader from '../ui/SectionHeader.jsx';

export default function CallToAction({ eyebrow, title, description, actions, icon: Icon }) {
  return (
    <section className="section-shell page-section" aria-label={eyebrow}>
      <div className="glass-panel rounded-lg p-6 text-center md:p-10">
        {Icon ? <Icon className="mx-auto mb-5 text-primary-cyan-bright" size={30} strokeWidth={1.7} aria-hidden="true" /> : null}
        <SectionHeader eyebrow={eyebrow} title={title} description={description} align="center" />
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          {actions.map(({ label, ...action }) => (
            <ButtonLink key={label} {...action}>{label}</ButtonLink>
          ))}
        </div>
      </div>
    </section>
  );
}
