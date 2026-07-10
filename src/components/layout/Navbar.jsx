import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/site.js';
import { brandLogo } from '../../data/media.js';

const contactItem = NAV_ITEMS.find((item) => item.path === '/contacto');
const primaryNavItems = NAV_ITEMS.filter((item) => !['/', '/contacto'].includes(item.path));

const navLinkClass = ({ isActive }) =>
  [
    'nav-premium-link rounded-md px-3 py-2 text-sm font-semibold !text-[#f7f2e8] transition-colors duration-200 hover:!text-[#f3d9a2] focus-visible:!text-white',
    isActive ? 'nav-premium-link--active' : '',
  ].join(' ');

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
      className={`nav-premium-header fixed inset-x-0 top-0 z-50 border-b border-primary-cyan-bright/25 bg-[#4f3b25]/94 shadow-command backdrop-blur-xl transition-all duration-300 ${isScrolled ? 'bg-[#44321f]/96' : ''}`}
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
          <span className={`flex items-center justify-center overflow-hidden rounded-md border border-primary-cyan-bright/35 bg-[#f7f2e8]/92 p-0.5 shadow-cyan-soft transition-all duration-300 ${isScrolled ? 'h-11 w-11' : 'h-14 w-14 sm:h-16 sm:w-16'}`}>
            <img src={brandLogo} alt="" className="h-full w-full object-contain" width="64" height="64" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="nav-premium-brand-title text-sm font-bold tracking-wide !text-white">SIS S.A.</span>
            <span className="nav-premium-brand-subtitle mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.18em] !text-[#f3d9a2] sm:block">
              Sistema Integral de Seguridad
            </span>
          </span>
        </NavLink>

        <div className="hidden items-center gap-2 lg:flex">
          <div className="flex items-center gap-1">
            {primaryNavItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
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
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[#b08a4a]/60 bg-[#f7f2e8]/8 text-[#f7f2e8] transition-colors duration-200 hover:border-[#f3d9a2] hover:text-[#f3d9a2] lg:hidden"
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
          className="border-t border-primary-cyan-bright/25 bg-[#44321f]/97 px-5 py-3 backdrop-blur-xl lg:hidden"
          initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {[NAV_ITEMS[0], ...primaryNavItems].map((item, index) => (
              <NavLink
                ref={index === 0 ? firstMobileLinkRef : undefined}
                key={item.path}
                to={item.path}
                className={navLinkClass}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
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
