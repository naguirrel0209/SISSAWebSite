import { Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { NAV_ITEMS, SITE } from '../../constants/site.js';
import { brandLogo } from '../../data/media.js';

const contactItems = [
  { label: SITE.phone, href: SITE.phoneHref, icon: Phone },
  { label: SITE.email, href: SITE.emailHref, icon: Mail },
  { label: SITE.address, href: null, icon: MapPin },
];

export default function Footer() {
  return (
    <footer className="border-t border-primary-cyan-bright/20 bg-[#121614] text-[#f7f2e8] backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.1fr_1.4fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-md border border-primary-cyan-bright/35 bg-[#f7f2e8]/92 p-1">
              <img src={brandLogo} alt="" className="h-full w-full object-contain" width="40" height="40" loading="lazy" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#f7f2e8]">SIS S.A. / Corporación SIS</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-[#d8d0c1]">
                Seguridad técnica institucional
              </p>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm leading-6 text-[#d8d0c1]">
            Seguridad técnica institucional con disciplina operativa y atención profesional.
          </p>
          <nav className="mt-5 flex flex-wrap gap-x-4 gap-y-2" aria-label="Navegación del pie de página">
            {NAV_ITEMS.map((item) => (
              <Link key={item.path} to={item.path} className="text-sm text-[#d8d0c1] transition-colors hover:text-primary-cyan-bright">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="grid gap-3 text-sm text-[#d8d0c1] sm:grid-cols-2">
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
                className="flex items-center gap-3 rounded-md border border-primary-cyan-bright/25 bg-[#f7f2e8]/6 px-4 py-3 transition-colors duration-200 hover:border-primary-cyan-bright/55 hover:text-[#f7f2e8]"
              >
                {content}
              </a>
            ) : (
              <div
                key={label}
                className="flex items-center gap-3 rounded-md border border-primary-cyan-bright/25 bg-[#f7f2e8]/6 px-4 py-3"
              >
                {content}
              </div>
            );
          })}
          <p className="text-xs text-[#d8d0c1] sm:col-span-2">
            © 2026 SIS S.A. / Corporación SIS. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
