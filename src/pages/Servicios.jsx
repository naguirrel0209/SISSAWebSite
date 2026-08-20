import { useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ChevronDown, ClipboardCheck } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { PAGE_META } from '../constants/site.js';
import { gallery, operationalProcess, operationsHeroImage, operationsHeroPhoto } from '../data/operations.js';
import { securityMeans } from '../data/securityMeans.js';

function ServicesHero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden"
      aria-labelledby="services-title"
    >
      <img
        src={operationsHeroPhoto}
        alt={operationsHeroImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: operationsHeroImage.objectPosition }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.98)_0%,rgba(11,18,32,0.86)_48%,rgba(11,18,32,0.50)_100%)]" />
      <div className="absolute inset-0 ink-grid opacity-20" aria-hidden="true" />
      <motion.div
        className="section-shell relative z-10 py-20"
        initial={reduceMotion ? false : { opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: 'easeOut' }}
      >
        <div className="max-w-3xl">
          <p className="eyebrow text-slate-50">Sistema integral de seguridad</p>
          <h1
            id="services-title"
            className="mt-6 text-4xl font-bold leading-[1.05] text-slate-50 sm:text-5xl lg:text-6xl"
          >
            Servicios estratégicos de seguridad
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Integramos medios humanos, técnicos activos, técnicos pasivos y organizativos para
            proteger personas, bienes, instalaciones y operaciones con coordinación profesional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/contacto">
              Solicitar evaluación <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="#sistema-integral" variant="secondary">
              Ver medios <ChevronDown size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

function MeansIndex() {
  return (
    <section
      id="sistema-integral"
      className="section-shell page-section scroll-mt-24"
      aria-labelledby="system-index-title"
    >
      <div className="mb-8 max-w-3xl">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
          Componentes del servicio
        </p>
        <h2 id="system-index-title" className="mt-3 text-3xl font-bold text-text">
          Cuatro medios, una sola estrategia
        </h2>
        <p className="mt-4 text-sm leading-7 text-muted-text">
          Cada medio puede consultarse por separado para ver su alcance, recursos y función dentro
          del Sistema Integral de Seguridad.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {securityMeans.map(({ id, path, code, title, shortTitle, summary, image }) => (
          <Link
            key={id}
            to={path}
            className="group relative min-h-[22rem] overflow-hidden rounded-lg border border-border-cyber/65 bg-surface shadow-soft transition duration-300 hover:-translate-y-1 hover:border-primary-cyan/45 hover:shadow-command focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-cyan-bright"
            aria-label={`Ver ${title}`}
          >
            <img
              src={image.src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              style={{ objectPosition: image.objectPosition ?? 'center' }}
              loading="lazy"
              aria-hidden="true"
            />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,18,32,0.12)_0%,rgba(11,18,32,0.72)_48%,rgba(11,18,32,0.96)_100%)]" />
            <span className="absolute inset-0 ink-grid opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
            <article className="relative flex h-full min-h-[22rem] flex-col justify-end p-5">
              <div className="mb-auto flex items-start justify-between gap-4">
                <span className="rounded-full border border-white/18 bg-background/55 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-100 backdrop-blur">
                  Medio {code}
                </span>
              </div>
              <h3 className="text-2xl font-bold leading-tight text-text">{shortTitle}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{summary}</p>
              <span className="mt-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-cyan-bright">
                Abrir detalle
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

function OperationalProcess() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-y border-border-cyber/45 bg-surface/25 py-16" aria-labelledby="process-title">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Protocolo de despliegue"
          title="Proceso Operacional"
          description="Secuencia institucional aplicada desde la recepción del requerimiento hasta la mejora continua del dispositivo."
        />
        <div className="relative mt-10 grid gap-4 lg:grid-cols-6">
          <motion.div
            className="absolute left-8 right-8 top-7 hidden h-px origin-left bg-primary-cyan-bright/55 lg:block"
            aria-hidden="true"
            initial={reduceMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          {operationalProcess.map((step, index) => (
            <Reveal key={step} delay={index * 0.06}>
              <article className="relative flex h-full items-start gap-4 rounded-lg border border-border-cyber/55 bg-surface/60 p-5 lg:block lg:pt-16">
                <span className="z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-cyan/65 bg-background text-xs font-bold text-primary-cyan-bright lg:absolute lg:left-5 lg:top-4">
                  {index + 1}
                </span>
                <div className="min-w-0">
                  <h3 className="text-sm font-bold leading-6 text-text">{step}</h3>
                  {index < operationalProcess.length - 1 ? (
                    <ArrowDown
                      className="mt-4 text-primary-cyan-bright lg:hidden"
                      size={17}
                      aria-hidden="true"
                    />
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function OperationalGallery() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const item = gallery[active];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((currentIndex) => (currentIndex + 1) % gallery.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section className="section-shell page-section" aria-labelledby="gallery-title">
      <SectionHeader
        eyebrow="Registro institucional"
        title="Galería Operacional"
        description="Recursos fotográficos reales de la capacidad humana, logística y física de Corporación SIS"
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="glass-panel relative min-h-[24rem] overflow-hidden rounded-lg sm:min-h-[32rem] lg:min-h-[34rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={item.src}
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: item.objectPosition ?? 'center' }}
              loading="lazy"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent p-6 pt-24">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">
              {String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-text">{item.category}</h3>
          </div>
        </div>
        <div className="glass-panel rounded-lg p-3 lg:h-[34rem]">
          <div className="grid h-full grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" aria-label="Índice de fotografías operacionales">
            {gallery.map((galleryItem, index) => {
              const isSelected = active === index;

              return (
                <button
                  key={galleryItem.src}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`group flex min-h-16 items-center gap-3 rounded-md border px-3 py-2 text-left transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-gold ${
                    isSelected
                      ? 'border-accent-gold bg-accent-gold/15 shadow-soft'
                      : 'border-border-cyber/55 bg-white/20 hover:border-accent-gold/70 hover:bg-accent-gold/10'
                  }`}
                  aria-current={isSelected ? 'true' : undefined}
                  aria-label={`Ver fotografía ${index + 1}: ${galleryItem.category}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${
                      isSelected
                        ? 'border-accent-gold bg-accent-gold text-background'
                        : 'border-accent-gold/45 text-accent-gold'
                    }`}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-snug text-text">
                      {galleryItem.category}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Servicios() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.servicios} />
      <ServicesHero />
      <MeansIndex />
      <OperationalProcess />
      <OperationalGallery />
      <CallToAction
        icon={ClipboardCheck}
        eyebrow="Evaluación integral"
        title="Diseñemos el sistema de seguridad adecuado para su operación"
        description="Nuestro equipo puede evaluar el entorno y coordinar los medios humanos, técnicos y organizativos que requiere su empresa, residencia, ruta o instalación."
        actions={[{ label: 'Solicitar evaluación', to: '/contacto' }]}
      />
    </div>
  );
}
