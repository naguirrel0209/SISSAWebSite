import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, ShieldCheck, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/site.js';

const contactItem = NAV_ITEMS.find((item) => item.path === '/contacto');
const primaryNavItems = [
  ...NAV_ITEMS.filter((item) => !['/', '/contacto'].includes(item.path)),
  { label: 'Operaciones', path: '/servicios#operaciones' },
];

const navLinkClass = ({ isActive }) =>
  [
    'rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-200',
    isActive ? 'text-primary-cyan-bright' : 'text-muted-text hover:text-primary-cyan-bright',
  ].join(' ');

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border-cyber/55 bg-background/82 shadow-command backdrop-blur-xl"
      initial={reduceMotion ? false : { y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6 lg:px-8">
        <NavLink
          to="/"
          className="group flex items-center gap-3 text-text transition-colors duration-200 hover:text-primary-cyan-bright"
          onClick={() => setIsOpen(false)}
          aria-label="Ir al inicio de SIS S.A."
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md border border-primary-cyan/35 bg-surface-high/70 text-primary-cyan-bright shadow-cyan-soft">
            <ShieldCheck size={22} strokeWidth={1.8} />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide">SIS S.A.</span>
            <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-text sm:block">
              Escudo oficial pendiente
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
            className="ml-2 inline-flex h-10 items-center justify-center rounded-md border border-primary-cyan/45 bg-primary-cyan/14 px-4 text-sm font-bold text-primary-cyan-bright transition duration-200 hover:border-primary-cyan hover:bg-primary-cyan/22"
          >
            Contáctanos
          </NavLink>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border-cyber/80 bg-surface-high/70 text-muted-text transition-colors duration-200 hover:border-primary-cyan hover:text-primary-cyan-bright lg:hidden"
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
          className="border-t border-border-cyber/60 bg-background/95 px-5 py-3 backdrop-blur-xl lg:hidden"
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
              className="mt-2 inline-flex h-10 items-center justify-center rounded-md border border-primary-cyan/45 bg-primary-cyan/14 px-4 text-sm font-bold text-primary-cyan-bright"
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
