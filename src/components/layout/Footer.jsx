import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, SITE } from '../../constants/site.js';
import { brandLogo } from '../../data/media.js';

const contactItems = [
  { label: SITE.phone, href: SITE.phoneHref, icon: Phone },
  { label: SITE.email, href: SITE.emailHref, icon: Mail },
  { label: SITE.address, href:'https://maps.app.goo.gl/LA5t7bmB9mGh9bxU6', icon: MapPin },
];

export default function Footer() {
  return (
    <footer className="border-t text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:px-6 md:grid-cols-[1.1fr_1.4fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/95 p-1">
              <img src={brandLogo} alt="" className="h-full w-full object-contain" width="40" height="40" loading="lazy" />
            </span>
            <div>
              <p className="text-sm font-bold text-slate-50">SIS S.A. / Corporación SIS</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                Seguridad técnica institucional
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
            Seguridad técnica institucional con disciplina operativa y atención profesional.
          </p>
          <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="Navegación del pie de página">
            {NAV_ITEMS.map((item) => (
              <Link key={item.path} to={item.path} className="text-sm text-slate-400 transition-colors hover:text-primary-cyan-bright">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid gap-3 text-sm text-slate-400 sm:grid-cols-2">
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
                className="flex items-center gap-3 rounded-md border border-white/8 bg-white/[0.025] px-4 py-3 transition-colors duration-200 hover:border-primary-cyan-bright/30 hover:bg-primary-cyan/[0.06] hover:text-slate-50"
              >
                {content}
              </a>
            ) : (
              <div
                key={label}
                className="flex items-center gap-3 rounded-md border border-white/8 bg-white/[0.025] px-4 py-3"
              >
                {content}
              </div>
            );
          })}
          <p className="text-xs text-slate-500 sm:col-span-2">
            © 2026 SIS S.A. / Corporación SIS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
