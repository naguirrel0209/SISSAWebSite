import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronDown, Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/site.js';
import { brandLogo } from '../../data/media.js';
import { securityMeans } from '../../data/securityMeans.js';

const contactItem = NAV_ITEMS.find((item) => item.path === '/contacto');
const primaryNavItems = NAV_ITEMS.filter((item) => !['/', '/contacto'].includes(item.path));
const servicesItem = NAV_ITEMS.find((item) => item.path === '/servicios');

const navLinkClass = ({ isActive }) =>
  [
    'nav-premium-link px-3 py-2 text-sm font-semibold transition-colors duration-200',
    isActive ? 'nav-premium-link--active' : '',
  ].join(' ');

function ServicesDropdown() {
  return (
    <div className="group relative">
      <NavLink
        to={servicesItem.path}
        className={({ isActive }) =>
          [
            'nav-premium-link inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors duration-200',
            isActive ? 'nav-premium-link--active' : '',
          ].join(' ')
        }
      >
        {servicesItem.label}
        <ChevronDown
          size={14}
          className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
          aria-hidden="true"
        />
      </NavLink>
      <div className="invisible absolute left-0 top-full z-50 w-64 translate-y-2 pt-2 opacity-0 transition duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
        <div className="rounded-lg border border-border-cyber/70 bg-background/96 p-2 shadow-command backdrop-blur-xl">
          <NavLink
            to="/servicios"
            className={({ isActive }) =>
              [
                'block rounded-md px-3 py-3 text-sm font-bold transition-colors duration-200',
                isActive
                  ? 'bg-primary-cyan/14 text-text'
                  : 'text-muted-text hover:bg-white/5 hover:text-text',
              ].join(' ')
            }
          >
            Ver todos los servicios
          </NavLink>
          <div className="my-2 h-px bg-border-cyber" />
          {securityMeans.map((mean) => (
            <NavLink
              key={mean.id}
              to={mean.path}
              className={({ isActive }) =>
                [
                  'grid grid-cols-[2rem_1fr] items-center gap-3 rounded-md px-3 py-2.5 transition-colors duration-200',
                  isActive
                    ? 'bg-primary-cyan/14 text-text'
                    : 'text-muted-text hover:bg-white/5 hover:text-text',
                ].join(' ')
              }
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-md border border-primary-cyan/25 bg-primary-cyan/10 text-[10px] font-extrabold text-primary-cyan-bright">
                {mean.code}
              </span>
              <span className="min-w-0 text-sm font-bold leading-5">
                {mean.title}
              </span>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuId = useId();
  const menuButtonRef = useRef(null);
  const firstMobileLinkRef = useRef(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    firstMobileLinkRef.current?.focus();
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      className="nav-premium-header fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <nav className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-all duration-300 sm:px-6 lg:px-8 ${isScrolled ? 'h-16' : 'h-20'}`}>
        <NavLink
          to="/"
          className="nav-premium-brand group flex items-center gap-3 !text-white transition-colors duration-200"
          onClick={() => setIsOpen(false)}
          aria-label="Ir al inicio de SIS S.A."
        >
          <span className={`flex items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/95 p-0.5 shadow-cyan-soft transition-all duration-300 ${isScrolled ? 'h-11 w-11' : 'h-14 w-14 sm:h-16 sm:w-16'}`}>
            <img src={brandLogo} alt="" className="h-full w-full object-contain" width="64" height="64" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="nav-premium-brand-title text-sm font-bold tracking-wide !text-white">SIS S.A.</span>
            <span className="nav-premium-brand-subtitle mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.18em] sm:block">
              Sistema Integral de Seguridad
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1">
            {primaryNavItems.map((item) =>
              item.path === '/servicios' ? (
                <ServicesDropdown key={item.path} />
              ) : (
                <NavLink key={item.path} to={item.path} className={navLinkClass}>
                  {item.label}
                </NavLink>
              ),
            )}
          </div>
          <NavLink
            to={contactItem.path}
            className="nav-premium-cta ml-2 inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-bold !text-white transition duration-200"
          >
            Contáctanos
          </NavLink>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/5 text-slate-100 transition-colors duration-200 hover:border-primary-cyan-bright/40 hover:bg-primary-cyan/10 hover:text-white lg:hidden"
          aria-label={isOpen ? 'Cerrar navegación' : 'Abrir navegación'}
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={menuId}
            className="border-t border-white/8 bg-background/95 px-5 py-4 backdrop-blur-xl lg:hidden"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-1">
              {[NAV_ITEMS[0], ...primaryNavItems].map((item, index) => {
                if (item.path === '/servicios') {
                  return (
                    <div key={item.path} className="rounded-lg border border-border-cyber/45 bg-white/[0.025] p-2">
                      <NavLink
                        ref={index === 0 ? firstMobileLinkRef : undefined}
                        to={item.path}
                        className={navLinkClass}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                      <div className="mt-2 grid gap-1 border-t border-border-cyber/45 pt-2">
                        {securityMeans.map((mean) => (
                          <NavLink
                            key={mean.id}
                            to={mean.path}
                            className={({ isActive }) =>
                              [
                                'rounded-md px-4 py-2 text-sm font-semibold transition-colors duration-200',
                                isActive
                                  ? 'bg-primary-cyan/14 text-text'
                                  : 'text-muted-text hover:bg-white/5 hover:text-text',
                              ].join(' ')
                            }
                            onClick={() => setIsOpen(false)}
                          >
                            {mean.title}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <NavLink
                    ref={index === 0 ? firstMobileLinkRef : undefined}
                    key={item.path}
                    to={item.path}
                    className={navLinkClass}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                );
              })}
              <NavLink
                to={contactItem.path}
                className="nav-premium-cta mt-2 inline-flex h-10 items-center justify-center rounded-md border px-4 text-sm font-bold !text-white"
                onClick={() => setIsOpen(false)}
              >
                Contáctanos
              </NavLink>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
