import { Mail, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, SITE } from '../../constants/site.js';

const contactItems = [
  { label: SITE.phone, href: SITE.phoneHref, icon: Phone },
  { label: SITE.email, href: SITE.emailHref, icon: Mail },
  { label: SITE.address, href: null, icon: MapPin },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-cyber/70 bg-surface/45 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.1fr_1.4fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary-cyan/35 bg-surface-high/70 text-primary-cyan-bright">
              <ShieldCheck size={22} strokeWidth={1.8} />
            </span>
            <div>
              <p className="text-sm font-bold text-text">SIS S.A. / Corporación SIS</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-muted-text">
                Seguridad técnica institucional
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-muted-text">Seguridad técnica institucional con disciplina operativa y atención profesional.</p>
          <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="Navegación del pie de página">
            {NAV_ITEMS.map((item) => <Link key={item.path} to={item.path} className="text-sm text-muted-text transition-colors hover:text-primary-cyan-bright">{item.label}</Link>)}
          </nav>
        </div>

        <div className="grid gap-3 text-sm text-muted-text sm:grid-cols-2">
          {contactItems.map(({ label, href, icon: Icon }) => {
            const content = (
              <>
                <Icon size={17} className="shrink-0 text-primary-cyan-bright" />
                <span className="min-w-0 break-all">{label}</span>
              </>
            );

            return href ? (
              <a
                key={label}
                href={href}
                className="flex items-center gap-3 rounded-md border border-border-cyber/55 bg-surface-high/35 px-4 py-3 transition-colors duration-200 hover:border-primary-cyan/60 hover:text-text"
              >
                {content}
              </a>
            ) : (
              <div
                key={label}
                className="flex items-center gap-3 rounded-md border border-border-cyber/55 bg-surface-high/35 px-4 py-3"
              >
                {content}
              </div>
            );
          })}
          <p className="text-xs text-muted-text sm:col-span-2">
            © 2026 SIS S.A. / Corporación SIS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
