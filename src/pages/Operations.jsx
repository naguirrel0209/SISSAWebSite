import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import SectionHeader from '../components/ui/SectionHeader.jsx';
import { coverageMap } from '../data/media.js';
import {
  commandChain,
  controlFunctions,
  gallery,
  infrastructure,
  operationalCapabilities,
  operationsHeroImage,
  operationsHeroPhoto,
  operationalProcess,
  technologies,
} from '../data/operations.js';

const meta = {
  title: 'Operaciones Estratégicas | SIS S.A.',
  description: 'Conozca la capacidad operacional, tecnológica y de coordinación táctica de SIS S.A. en Guatemala.',
};

function OperationsSeo() {
  useEffect(() => {
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);

    const tags = [
      ['property', 'og:title', meta.title],
      ['property', 'og:description', meta.description],
      ['property', 'og:type', 'website'],
      ['property', 'og:image', operationsHeroPhoto],
      ['name', 'twitter:card', 'summary_large_image'],
      ['name', 'twitter:title', meta.title],
      ['name', 'twitter:description', meta.description],
      ['name', 'twitter:image', operationsHeroPhoto],
    ].map(([attribute, key, content]) => {
      const element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.content = content;
      element.dataset.operationsSeo = 'true';
      document.head.appendChild(element);
      return element;
    });

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.dataset.operationsSeo = 'true';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Operaciones Estratégicas',
      provider: { '@type': 'Organization', name: 'SIS S.A.' },
      areaServed: { '@type': 'Country', name: 'Guatemala' },
      description: meta.description,
    });
    document.head.appendChild(schema);

    return () => [...tags, schema].forEach((element) => element.remove());
  }, []);
  return null;
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

function OperationsHero() {
  const reduceMotion = useReducedMotion();
  return (
    <section className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden" aria-labelledby="operations-title">
      <img
        src={operationsHeroPhoto}
        alt={operationsHeroImage.alt}
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: operationsHeroImage.objectPosition }}
        fetchPriority="high"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,22,20,0.96)_0%,rgba(18,22,20,0.84)_48%,rgba(18,22,20,0.48)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(176,138,74,0.16),transparent_22rem)]" aria-hidden="true" />
      <motion.div className="section-shell relative z-10 py-20" initial={reduceMotion ? false : { opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.65, ease: 'easeOut' }}>
        <div className="max-w-3xl">
          <p className="eyebrow border-primary-cyan-bright/35 bg-primary-cyan/20 text-[#f8f5ee]">Centro de mando institucional</p>
          <h1 id="operations-title" className="mt-5 text-4xl font-extrabold leading-[1.06] text-[#f8f5ee] sm:text-5xl lg:text-6xl">Operaciones Estratégicas</h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#efe2c7] sm:text-lg">Coordinamos recursos humanos, tecnológicos y operacionales mediante protocolos estandarizados para garantizar la continuidad de la seguridad de nuestros clientes.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/contacto">Solicitar Evaluación <ArrowRight size={17} aria-hidden="true" /></ButtonLink>
            <ButtonLink href="#capacidades" variant="secondary">Conocer Capacidades <ChevronDown size={17} aria-hidden="true" /></ButtonLink>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Gallery() {
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
      <SectionHeader eyebrow="Registro institucional" title="Galería Operacional" description="Recursos fotográficos reales de la capacidad humana, logística y física de SIS S.A." />
      <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_15rem]">
        <div className="glass-panel relative min-h-[24rem] overflow-hidden rounded-lg sm:min-h-[32rem] lg:min-h-[34rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img key={item.src} src={item.src} alt={item.alt} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: item.objectPosition ?? 'center' }} loading="lazy" initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} />
          </AnimatePresence>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/75 to-transparent p-6 pt-24">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent-gold">{String(active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</p>
            <h3 className="mt-2 text-2xl font-bold text-text">{item.category}</h3>
          </div>
        </div>
        <div className="glass-panel rounded-lg p-3 lg:h-[34rem]">
          <div className="grid h-full grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-1" aria-label="Indice de fotografias operacionales">
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
                  aria-label={`Ver fotografia ${index + 1}: ${galleryItem.category}`}
                >
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border text-xs font-extrabold ${
                    isSelected
                      ? 'border-accent-gold bg-accent-gold text-background'
                      : 'border-accent-gold/45 text-accent-gold'
                  }`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-bold leading-snug text-text">{galleryItem.category}</span>
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

export default function Operations() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      <OperationsSeo />
      <OperationsHero />

      <section className="section-shell page-section" aria-labelledby="control-title">
        <Reveal className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <p className="eyebrow">Control operacional</p>
            <h2 id="control-title" className="mt-4 text-3xl font-bold leading-tight text-text md:text-4xl">Centro de Monitoreo y Control Operacional</h2>
            <p className="mt-5 text-base leading-8 text-muted-text">El centro de operaciones centraliza la supervisión técnica de los servicios, gestiona eventos y coordina la respuesta de las unidades conforme a protocolos de comunicación, escalamiento y continuidad operacional.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {controlFunctions.map(({ label, icon: Icon }, index) => <Reveal key={label} delay={index * 0.05}><div className="glass-panel flex min-h-28 items-center gap-4 rounded-lg p-5"><span className="icon-frame shrink-0" aria-hidden="true"><Icon size={21} /></span><span className="font-bold text-text">{label}</span></div></Reveal>)}
          </div>
        </Reveal>
      </section>

      <section id="capacidades" className="border-y border-border-cyber/45 bg-surface/25 py-16 scroll-mt-24" aria-labelledby="capabilities-title">
        <div className="section-shell">
          <SectionHeader eyebrow="Dispositivos especializados" title="Capacidades Operacionales" description="Capacidades articuladas bajo criterios técnicos, protocolos institucionales y evaluación previa del riesgo." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {operationalCapabilities.map(({ title, description, icon: Icon }, index) => <Reveal key={title} delay={(index % 4) * 0.05}><article className="glass-panel interactive-card h-full rounded-lg p-5"><span className="icon-frame" aria-hidden="true"><Icon size={21} /></span><h3 className="mt-5 text-lg font-bold leading-6 text-text">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-text">{description}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section-shell page-section" aria-labelledby="process-title">
        <SectionHeader eyebrow="Protocolo de despliegue" title="Proceso Operacional" description="Secuencia institucional aplicada desde la recepción del requerimiento hasta la mejora continua del dispositivo." />
        <div className="relative mt-10 grid gap-4 lg:grid-cols-6">
          <motion.div className="absolute left-8 right-8 top-7 hidden h-px origin-left bg-primary-cyan-bright/55 lg:block" aria-hidden="true" initial={reduceMotion ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.45 }} transition={{ duration: 0.8, ease: 'easeOut' }} />
          {operationalProcess.map((step, index) => <Reveal key={step} delay={index * 0.06}><article className="relative flex h-full items-start gap-4 rounded-lg border border-border-cyber/55 bg-surface/60 p-5 lg:block lg:pt-16"><span className="z-10 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary-cyan/65 bg-background text-xs font-bold text-primary-cyan-bright lg:absolute lg:left-5 lg:top-4">{index + 1}</span><div className="min-w-0"><h3 className="text-sm font-bold leading-6 text-text">{step}</h3>{index < operationalProcess.length - 1 ? <ArrowDown className="mt-4 text-primary-cyan-bright lg:hidden" size={17} aria-hidden="true" /> : null}</div></article></Reveal>)}
        </div>
      </section>

      <Gallery />

      <section className="border-y border-border-cyber/45 bg-surface/25 py-16" aria-labelledby="infrastructure-title">
        <div className="section-shell">
          <SectionHeader eyebrow="Capacidad institucional" title="Infraestructura Operacional" description="Recursos organizacionales que sostienen la coordinación y continuidad de los dispositivos de seguridad." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {infrastructure.map(({ label, icon: Icon }, index) => <Reveal key={label} delay={(index % 3) * 0.06}><article className="glass-panel flex min-h-32 items-center gap-5 rounded-lg p-5"><span className="icon-frame shrink-0" aria-hidden="true"><Icon size={22} /></span><div><p className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-cyan-bright">Capacidad verificada</p><h3 className="mt-2 text-lg font-bold text-text">{label}</h3></div></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section-shell page-section" aria-labelledby="technology-title">
        <SectionHeader eyebrow="Ecosistema técnico" title="Tecnología Integrada" description="Herramientas interoperables para observación, control, comunicación y soporte de decisiones operacionales." />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {technologies.map(({ label, icon: Icon }, index) => <Reveal key={label} delay={(index % 4) * 0.04}><div className="glass-panel interactive-card flex min-h-36 flex-col justify-between rounded-lg p-5"><Icon className="text-primary-cyan-bright" size={23} aria-hidden="true" /><span className="mt-5 text-sm font-bold leading-5 text-text">{label}</span></div></Reveal>)}
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-16" aria-labelledby="command-title">
        <div className="section-shell">
          <SectionHeader eyebrow="Gobernanza operacional" title="Cadena de Mando" description="Flujo definido de coordinación, supervisión, ejecución y retroalimentación." align="center" />
          <div className="mx-auto mt-10 max-w-2xl">
            {commandChain.map(({ label, icon: Icon }, index) => <Reveal key={label} delay={index * 0.05}><div className="flex flex-col items-center"><div className="glass-panel flex w-full items-center gap-4 rounded-lg p-4"><span className="icon-frame shrink-0" aria-hidden="true"><Icon size={20} /></span><span className="font-bold text-text">{label}</span><span className="ml-auto text-xs font-bold text-primary-cyan-bright">{String(index + 1).padStart(2, '0')}</span></div>{index < commandChain.length - 1 ? <div className="h-8 w-px bg-primary-cyan/55" aria-hidden="true" /> : null}</div></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section-shell page-section" aria-labelledby="coverage-title">
        <Reveal className="grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:items-center">
          <div>
            <p className="eyebrow">Despliegue territorial</p>
            <h2 id="coverage-title" className="mt-4 text-3xl font-bold leading-tight text-text md:text-4xl">Cobertura Nacional</h2>
            <p className="mt-5 text-base leading-8 text-muted-text">La coordinación operacional se estructura para atender requerimientos en el territorio nacional, de acuerdo con evaluación técnica, disponibilidad y condiciones del dispositivo.</p>
          </div>
          <div className="glass-panel relative overflow-hidden rounded-lg p-2 sm:p-3">
            <img
              src={coverageMap.src}
              alt={coverageMap.alt}
              className="mx-auto w-full rounded-md object-contain"
              loading="lazy"
              decoding="async"
            />
            <svg viewBox="0 0 720 460" className="hidden" role="img" aria-labelledby="map-title map-desc">
              <title id="map-title">Mapa estilizado de Guatemala</title><desc id="map-desc">Representación vectorial institucional de la cobertura nacional de SIS S.A.</desc>
              <defs><linearGradient id="mapFill" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#e5d8c5"/><stop offset="1" stopColor="#f7f2e8"/></linearGradient><filter id="mapGlow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
              <path d="M182 62 418 51 470 103 546 98 588 154 664 184 641 239 683 281 620 319 604 379 509 370 438 411 376 356 280 378 233 314 158 288 184 227 127 181 205 121Z" fill="url(#mapFill)" stroke="#b9ab98" strokeLinejoin="round" strokeWidth="3"/>
              <path d="M205 121 324 198 428 142 505 207 589 195M184 259 303 232 364 333 462 247 588 306M280 378 321 300 438 411" fill="none" stroke="#2f5f4f" strokeOpacity=".42" strokeWidth="2" strokeDasharray="8 8"/>
              {[[325,183],[397,227],[548,220],[276,294],[431,318]].map(([cx,cy], index) => <g key={`${cx}-${cy}`} filter="url(#mapGlow)"><circle cx={cx} cy={cy} r="14" fill="#2f5f4f" fillOpacity=".18"/><circle cx={cx} cy={cy} r="5" fill="#b08a4a"><animate attributeName="r" values="4;7;4" dur={`${2 + index * .2}s`} repeatCount="indefinite"/></circle></g>)}
            </svg>
            <div className="hidden">Presencia nacional</div>
          </div>
        </Reveal>
      </section>

      <section className="section-shell page-section" aria-label="Solicitar asesoría">
        <Reveal className="glass-panel relative overflow-hidden rounded-lg p-7 text-center sm:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(47,125,109,0.14),transparent_24rem)]" aria-hidden="true" />
          <div className="relative"><ShieldCheck className="mx-auto text-primary-cyan-bright" size={34} aria-hidden="true" /><p className="eyebrow mt-5">Evaluación estratégica</p><h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold leading-tight text-text md:text-4xl">La seguridad comienza con una estrategia.</h2><p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-muted-text">Nuestro equipo diseña soluciones integrales basadas en análisis de riesgo, tecnología y capacidad operativa.</p><div className="mt-8"><ButtonLink to="/contacto">Solicitar Asesoría <ArrowRight size={17} aria-hidden="true" /></ButtonLink></div></div>
        </Reveal>
      </section>
    </div>
  );
}
