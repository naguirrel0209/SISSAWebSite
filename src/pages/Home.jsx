import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import CallToAction from '../components/sections/CallToAction.jsx';
import { LinkedFeatureCard } from '../components/cards/FeatureCard.jsx';
import Seo from '../components/layout/Seo.jsx';
import AssetImage from '../components/ui/AssetImage.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import { PAGE_META } from '../constants/site.js';
import { gallery } from '../data/operations.js';
import { institutionalImages } from '../data/media.js';
import { securityMeans } from '../data/securityMeans.js';

const trustItems = [
  'Seguridad estratégica',
  'Respuesta profesional',
  'Operación disciplinada',
  'Tecnología táctica',
  'Cobertura institucional',
];

const homeHeroGallery = [gallery[1], gallery[0], ...gallery.slice(2)];

function HeroBanner() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = homeHeroGallery[active];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((currentIndex) => (currentIndex + 1) % homeHeroGallery.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <section
      className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden"
      aria-labelledby="home-title"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.img
          key={current.src}
          src={current.src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: current.objectPosition ?? 'center' }}
          aria-hidden="true"
          fetchPriority={active === 0 ? 'high' : undefined}
          initial={reduceMotion ? false : { opacity: 0, scale: 1.08, x: 0 }}
          animate={
            reduceMotion
              ? { opacity: 1 }
              : { opacity: 1, scale: 1.14, x: active % 2 === 0 ? -18 : 18 }
          }
          exit={{ opacity: 0 }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </AnimatePresence>
      <div
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,18,32,0.98)_0%,rgba(11,18,32,0.84)_46%,rgba(11,18,32,0.38)_100%)]"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(59,130,246,0.20),transparent_24rem)]"
        aria-hidden="true"
      />
      <div className="section-shell relative z-10 py-20">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="eyebrow text-slate-50">Centro de mando institucional</p>
          <h1
            id="home-title"
            className="mt-6 text-4xl font-bold leading-[1.04] text-slate-50 sm:text-5xl lg:text-6xl"
          >
            Seguridad integral para proteger lo que más importa.
          </h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
            SIS S.A. combina presencia operativa, logística segura y respuesta profesional.
          </p>
          <div className="mt-8">
            <ButtonLink to="/contacto">
              Contáctanos <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InstitutionalGallery() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const featured = gallery.slice(0, 5);
  const current = featured[active];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((currentIndex) => (currentIndex + 1) % featured.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, [featured.length, reduceMotion]);

  return (
    <section className="section-shell py-16 md:py-20" aria-labelledby="home-gallery-title">
      <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Registro institucional
          </p>
          <h2 id="home-gallery-title" className="mt-3 text-3xl font-bold text-text">
            Presencia operativa en campo
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-muted-text">
          Una vista más cercana de nuestros equipos, unidades e instalaciones, con presencia real
          en servicios de seguridad y coordinación.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="relative min-h-[26rem] overflow-hidden rounded-lg border border-border-cyber/55 bg-surface shadow-soft sm:min-h-[32rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.img
              key={current.src}
              src={current.src}
              alt={current.alt}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: current.objectPosition ?? 'center' }}
              loading="lazy"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38, ease: 'easeOut' }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(11,18,32,0.90)_100%)]" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              {String(active + 1).padStart(2, '0')} / {String(featured.length).padStart(2, '0')}
            </p>
            <h3 className="mt-2 text-3xl font-bold text-text">{current.category}</h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {featured.map((item, index) => {
            const isSelected = active === index;

            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setActive(index)}
                className={`group grid min-h-24 grid-cols-[4.75rem_1fr] items-center gap-3 rounded-lg border p-2 text-left transition duration-200 ${
                  isSelected
                    ? 'border-primary-cyan-bright bg-primary-cyan/14'
                    : 'border-border-cyber/55 bg-surface/48 hover:border-primary-cyan/45 hover:bg-surface/70'
                }`}
                aria-current={isSelected ? 'true' : undefined}
              >
                <span className="relative h-20 overflow-hidden rounded-md">
                  <img
                    src={item.src}
                    alt=""
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    style={{ objectPosition: item.objectPosition ?? 'center' }}
                    loading="lazy"
                    aria-hidden="true"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-primary-cyan-bright">
                    Galería
                  </span>
                  <span className="mt-1 block text-sm font-bold leading-5 text-text">
                    {item.category}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.home} />
      <HeroBanner />
      <InstitutionalGallery />

      <section className="section-shell pb-14 pt-10 md:pb-16">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Soluciones principales
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Operación táctica integrada</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-text">
            Un sistema que coordina personas, tecnología, barreras físicas y procedimientos para
            proteger cada operación.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {securityMeans.map(({ title, summary, icon: Icon, path }) => (
            <LinkedFeatureCard
              key={title}
              to={path}
              title={title}
              description={summary}
              icon={Icon}
            >
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-primary-cyan-bright">
                Ver detalle <ArrowRight size={14} aria-hidden="true" />
              </span>
            </LinkedFeatureCard>
          ))}
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="glass-panel grid gap-8 rounded-lg p-6 md:grid-cols-[0.85fr_1.15fr] md:p-8">
          <AssetImage
            src={institutionalImages.fachada.src}
            alt={institutionalImages.fachada.alt}
            objectPosition={institutionalImages.fachada.objectPosition}
            caption="Fachada institucional SIS S.A."
            size="default"
          />
          <div className="flex flex-col justify-center">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Corporación SIS
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">
              Disciplina operativa y atención institucional
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-text">
              SIS S.A. desarrolla soluciones integrales de seguridad con enfoque técnico,
              disciplina operativa y atención institucional. Nuestro modelo combina presencia,
              prevención, monitoreo y respuesta para proteger personas, instalaciones y
              operaciones estratégicas.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {trustItems.map((item) => (
            <div
              key={item}
              className="rounded-lg border border-border-cyber/55 bg-surface/48 px-4 py-5 text-sm font-bold text-text backdrop-blur"
            >
              <span className="mb-3 block h-1 w-10 rounded-full bg-primary-cyan" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <CallToAction
        eyebrow="Contacto operativo"
        title="¿Necesita una solución de seguridad confiable, técnica y operativa?"
        description="Conecte con nuestro centro de mando y solicite información sobre los servicios especializados de SIS S.A."
        actions={[{ label: 'Contactar Centro de Mando', to: '/contacto' }]}
      />
    </div>
  );
}
