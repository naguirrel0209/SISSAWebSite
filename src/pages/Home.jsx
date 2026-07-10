import { ArrowRight, GraduationCap, LockKeyhole, RadioTower, Route } from 'lucide-react';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import CallToAction from '../components/sections/CallToAction.jsx';
import FeatureCard from '../components/cards/FeatureCard.jsx';
import Seo from '../components/layout/Seo.jsx';
import AssetImage from '../components/ui/AssetImage.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import { PAGE_META } from '../constants/site.js';
import { gallery } from '../data/operations.js';
import { institutionalImages } from '../data/media.js';

const solutions = [
  {
    title: 'Control Operacional',
    description:
      'Supervisión continua, protocolos de respuesta y vigilancia estratégica para operaciones críticas.',
    icon: RadioTower,
  },
  {
    title: 'Logística Segura',
    description:
      'Protección y control operativo para rutas, traslados y movimientos de alto valor.',
    icon: Route,
  },
  {
    title: 'Seguridad Privada',
    description:
      'Personal capacitado para resguardar instalaciones, activos, colaboradores y visitantes.',
    icon: LockKeyhole,
  },
  {
    title: 'Capacitación',
    description:
      'Formación técnica y operativa para fortalecer la prevención, reacción y disciplina institucional.',
    icon: GraduationCap,
  },
];

const trustItems = [
  'Seguridad estratégica',
  'Respuesta profesional',
  'Operación disciplinada',
  'Tecnología táctica',
  'Cobertura institucional',
];

function HeroBanner() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = gallery[active];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((currentIndex) => (currentIndex + 1) % gallery.length);
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
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1.14, x: active % 2 === 0 ? -18 : 18 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 5, ease: 'linear' }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,22,20,0.94)_0%,rgba(18,22,20,0.76)_44%,rgba(18,22,20,0.28)_100%)]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_42%,rgba(176,138,74,0.18),transparent_22rem)]" aria-hidden="true" />
      <div className="section-shell relative z-10 py-20">
        <motion.div
          className="max-w-2xl"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
        >
          <p className="eyebrow border-primary-cyan-bright/35 bg-primary-cyan/20 text-[#f8f5ee]">
            Centro de mando institucional
          </p>
          <h1
            id="home-title"
            className="mt-5 text-4xl font-extrabold leading-[1.05] text-[#f8f5ee] sm:text-5xl lg:text-6xl"
          >
            Seguridad integral para proteger lo que más importa.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-[#efe2c7] sm:text-lg">
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

export default function Home() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.home} />
      <HeroBanner />

      <section className="section-shell py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Soluciones principales
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Operación táctica integrada</h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-muted-text">
            Servicios estructurados para proteger instalaciones, movimientos, personas y operaciones
            críticas con supervisión profesional.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map(({ title, description, icon: Icon }) => (
            <FeatureCard key={title} title={title} description={description} icon={Icon} />
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
            <h2 className="mt-3 text-3xl font-bold text-text">Disciplina operativa y atención institucional</h2>
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
