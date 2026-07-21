import {
  Building2,
  CarFront,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Medal,
  RadioTower,
  Sparkles,
  UsersRound,
  X,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import AssetImage from '../components/ui/AssetImage.jsx';
import { PAGE_META } from '../constants/site.js';
import { institutionalImages, uniforms as uniformPhotos } from '../data/media.js';

const infrastructure = [
  {
    title: 'Instalaciones',
    description:
      'Instalaciones corporativas diseñadas para la coordinación administrativa, operativa y atención institucional.',
    icon: Building2,
    image: institutionalImages.fachada,
  },
  {
    title: 'Oficinas administrativas',
    description:
      'Espacios de gestión, planificación y seguimiento para garantizar una operación ordenada y profesional.',
    icon: UsersRound,
    image: institutionalImages.oficinasAdministrativas,
  },
  {
    title: 'Centro de operaciones',
    description:
      'Área destinada al control, monitoreo y coordinación de servicios estratégicos de seguridad.',
    icon: RadioTower,
    image: institutionalImages.operaciones,
  },
  {
    title: 'Flota vehicular',
    description:
      'Vehículos operativos destinados al apoyo, supervisión, patrullaje y logística de seguridad.',
    icon: CarFront,
    image: institutionalImages.patrullaRuta,
  },
];

const uniforms = [
  {
    title: 'Uniforme Casual',
    image: uniformPhotos.casual,
    usage: 'Se utiliza en atención institucional, actividades administrativas, visitas corporativas y funciones de representación donde se requiere presencia formal sin carácter operativo intensivo.',
    idealGuard: 'Ideal para guardias de recepción, control de accesos corporativos, atención al cliente y apoyo administrativo.',
    description:
      'Presentación institucional para actividades administrativas, atención corporativa y funciones de representación.',
  },
  {
    title: 'Uniforme de Gala',
    image: uniformPhotos.gala,
    usage: 'Se utiliza en eventos protocolarios, servicios de alto perfil, actos institucionales y puestos donde la imagen formal de seguridad debe ser prioritaria.',
    idealGuard: 'Ideal para guardias de protocolo, seguridad ejecutiva, eventos corporativos y presencia institucional de alto nivel.',
    description:
      'Imagen formal destinada a eventos, actos protocolarios y presencia institucional de alto nivel.',
  },
  {
    title: 'Uniforme de Fatiga',
    image: uniformPhotos.fatiga,
    usage: 'Se utiliza en operaciones de campo, patrullaje, presencia preventiva, supervisión operativa y servicios que requieren mayor movilidad y resistencia.',
    idealGuard: 'Ideal para guardias operativos, patrulleros, supervisores de campo y personal asignado a cobertura táctica.',
    description:
      'Indumentaria operativa diseñada para funciones de campo, patrullaje, control y presencia táctica.',
  },
];

const values = [
  {
    title: 'Disciplina',
    description:
      'El cumplimiento de protocolos, órdenes y procedimientos asegura una operación confiable y profesional.',
    icon: CheckCircle2,
    code: '01',
  },
  {
    title: 'Lealtad',
    description:
      'El compromiso con nuestros clientes, colaboradores e institución fortalece la confianza en cada servicio.',
    icon: Medal,
    code: '02',
  },
  {
    title: 'Innovación',
    description:
      'La incorporación de tecnología, procesos y mejora continua permite responder a nuevos desafíos de seguridad.',
    icon: Sparkles,
    code: '03',
  },
];

const institutionalCarousel = [
  {
    ...institutionalImages.fachada,
    caption: 'Instalaciones SIS S.A.',
  },
  {
    ...institutionalImages.oficinasAdministrativas,
    caption: 'Oficinas administrativas',
  },
  {
    ...institutionalImages.guardiaPatrulla,
    caption: 'Presencia operativa institucional',
  },
  {
    ...institutionalImages.patrullaRuta,
    caption: 'Cobertura y patrullaje',
  },
];

const missionVision = [
  {
    title: 'Misión',
    description:
      'Satisfacer las necesidades de nuestros clientes de manera eficiente y oportuna, con recurso humano profesional y tecnología avanzada, para la tranquilidad de su familia y sus bienes.',
  },
  {
    title: 'Visión',
    description:
      'Ser la corporación de seguridad privada líder en Guatemala con proyección internacional, brindando soluciones prácticas a la vanguardia de la tecnología.',
  },
];

function InstitutionalCarousel() {
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();
  const current = institutionalCarousel[active];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActive((currentIndex) => (currentIndex + 1) % institutionalCarousel.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  return (
    <div className="glass-panel rounded-lg p-4">
      <figure className="relative min-h-[22rem] overflow-hidden rounded-md sm:min-h-[30rem]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: current.objectPosition ?? 'center' }}
            loading={active === 0 ? 'eager' : 'lazy'}
            fetchPriority={active === 0 ? 'high' : undefined}
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          />
        </AnimatePresence>
        <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#121614]/85 via-[#121614]/45 to-transparent p-4 pt-20 text-xs font-bold uppercase tracking-[0.14em] text-[#f7f2e8]">
          {current.caption}
        </figcaption>
      </figure>
    </div>
  );
}

export default function Nosotros() {
  const [activeUniformIndex, setActiveUniformIndex] = useState(null);
  const uniformHoverTimer = useRef(null);
  const activeUniform = activeUniformIndex === null ? null : uniforms[activeUniformIndex];

  const clearUniformHoverTimer = () => {
    if (uniformHoverTimer.current) {
      window.clearTimeout(uniformHoverTimer.current);
      uniformHoverTimer.current = null;
    }
  };

  const scheduleUniformPreview = (index) => {
    clearUniformHoverTimer();
    uniformHoverTimer.current = window.setTimeout(() => {
      setActiveUniformIndex(index);
      uniformHoverTimer.current = null;
    }, 3000);
  };

  useEffect(() => clearUniformHoverTimer, []);

  const showPreviousUniform = () => {
    setActiveUniformIndex((current) => (current === null ? uniforms.length - 1 : (current - 1 + uniforms.length) % uniforms.length));
  };

  const showNextUniform = () => {
    setActiveUniformIndex((current) => (current === null ? 0 : (current + 1) % uniforms.length));
  };

  return (
    <div className="w-full">
      <Seo {...PAGE_META.nosotros} />
      <PageHeader
        eyebrow="Corporación SIS · Perfil institucional"
        title="Seguridad estratégica con disciplina operativa"
        description="SIS S.A. desarrolla soluciones integrales de seguridad con enfoque técnico, presencia institucional y capacidad operativa para proteger personas, instalaciones y operaciones críticas."
        visual={<InstitutionalCarousel />}
      />

      <section className="section-shell py-14">
        <div className="grid gap-8 border-y border-border-cyber/55 py-10 md:grid-cols-[0.42fr_1fr] md:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Quiénes somos
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Presencia, prevención y respuesta</h2>
          </div>
          <p className="text-base leading-8 text-muted-text md:text-lg">
            SIS S.A. es una corporación guatemalteca dedicada a brindar servicios de seguridad
            privada, monitoreo, logística segura y protección especializada. Su operación se
            fundamenta en disciplina, prevención, control y respuesta profesional, integrando
            personal capacitado, protocolos operativos y tecnología aplicada a la seguridad.
          </p>
        </div>
        <div className="grid gap-5 pb-10 md:grid-cols-2">
          {missionVision.map(({ title, description }) => (
            <article key={title} className="glass-panel rounded-lg p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
                Identidad institucional
              </p>
              <h3 className="mt-3 text-2xl font-bold text-text">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-muted-text md:text-base">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Capacidad institucional
          </p>
          <h2 className="mt-3 text-3xl font-bold text-text">Infraestructura operativa</h2>
          <p className="mt-4 text-sm leading-7 text-muted-text">
            Espacios y recursos preparados para sostener la gestión, supervisión y coordinación de
            servicios especializados.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {infrastructure.map(({ title, description, icon: Icon, image }) => (
            <article
              key={title}
              className="glass-panel grid gap-5 rounded-lg p-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center"
            >
              <AssetImage
                src={image.src}
                alt={image.alt}
                objectPosition={image.objectPosition}
                caption={title}
                size="compact"
              />
              <div className="p-1 sm:pr-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary-cyan/35 bg-primary-cyan/10 text-primary-cyan-bright">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <h3 className="mt-4 text-lg font-bold text-text">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-text">{description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-14">
        <div className="section-shell">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Presentación y función
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Uniformes institucionales</h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Categorías preparadas para incorporar únicamente el catálogo fotográfico oficial de
              SIS S.A.
            </p>
          </div>
          <div className="relative">
            <AnimatePresence initial={false}>
              {activeUniform ? (
                <motion.article
                  key={activeUniform.title}
                  className="glass-panel absolute inset-x-0 top-0 z-20 grid gap-5 rounded-lg p-4 shadow-command md:grid-cols-[0.95fr_1.05fr] md:items-center md:p-5"
                  initial={{ opacity: 0, y: 18, scale: 0.96 }}
                  animate={{ opacity: 1, y: -18, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.22, ease: 'easeOut' }}
                  aria-live="polite"
                >
                  <div className="absolute right-3 top-3 z-10 flex gap-2">
                    <button type="button" onClick={showPreviousUniform} className="icon-frame bg-background/90" aria-label="Ver uniforme anterior">
                      <ChevronLeft size={18} />
                    </button>
                    <button type="button" onClick={showNextUniform} className="icon-frame bg-background/90" aria-label="Ver uniforme siguiente">
                      <ChevronRight size={18} />
                    </button>
                    <button type="button" onClick={() => setActiveUniformIndex(null)} className="icon-frame bg-background/90" aria-label="Cerrar vista de uniforme">
                      <X size={18} />
                    </button>
                  </div>
                  <figure className="relative min-h-[26rem] overflow-hidden rounded-md border border-primary-cyan-bright/25 bg-background/65 md:min-h-[32rem]">
                    <img
                      src={activeUniform.image.src}
                      alt={activeUniform.image.alt}
                      className="absolute inset-0 h-full w-full object-contain"
                      style={{ objectPosition: activeUniform.image.objectPosition ?? 'center' }}
                      loading="lazy"
                    />
                  </figure>
                  <div className="p-2 pr-28 md:p-5 md:pr-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
                      Vista de uniforme
                    </p>
                    <h3 className="mt-3 text-3xl font-bold text-text">{activeUniform.title}</h3>
                    <div className="mt-5 grid gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-cyan-bright">
                          Cuándo se utiliza
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted-text">{activeUniform.usage}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-cyan-bright">
                          Ideal para
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted-text">{activeUniform.idealGuard}</p>
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-cyan-bright">
                          Descripción
                        </p>
                        <p className="mt-2 text-sm leading-7 text-muted-text">{activeUniform.description}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ) : null}
            </AnimatePresence>
            <div className="grid gap-5 md:grid-cols-3">
            {uniforms.map((uniform, index) => {
              const { title, description, image } = uniform;
              return (
              <article
                key={title}
                className="glass-panel rounded-lg p-4 transition duration-200 hover:-translate-y-1 hover:border-primary-cyan/55 focus-visible:-translate-y-1"
                tabIndex={0}
                onMouseEnter={() => scheduleUniformPreview(index)}
                onMouseLeave={clearUniformHoverTimer}
                onFocus={() => setActiveUniformIndex(index)}
              >
                <AssetImage
                  src={image.src}
                  alt={image.alt}
                  objectPosition={image.objectPosition}
                  caption={title}
                  size="portrait"
                />
                <div className="px-1 pb-2 pt-5">
                  <h3 className="text-lg font-bold text-text">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-text">{description}</p>
                </div>
              </article>
              );
            })}
          </div>
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Principios institucionales
          </p>
          <h2 className="mt-3 text-3xl font-bold text-text">Valores que guían nuestra operación</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {values.map(({ title, description, icon: Icon, code }) => (
            <article
              key={title}
              className="glass-panel group relative overflow-hidden rounded-lg p-6 transition duration-200 hover:-translate-y-1 hover:border-primary-cyan/55"
            >
              <span className="absolute right-5 top-4 text-4xl font-extrabold text-primary-cyan/10">
                {code}
              </span>
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary-cyan/35 bg-primary-cyan/10 text-primary-cyan-bright">
                <Icon size={22} strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-xl font-bold text-text">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-text">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <CallToAction eyebrow="Compromiso SIS S.A." title="Una institución preparada para proteger" description="Nuestra labor se desarrolla con visión estratégica, criterio técnico y vocación de servicio, manteniendo el compromiso de proteger con responsabilidad, presencia y profesionalismo." actions={[{ label: 'Conocer servicios', to: '/servicios' }]} />
    </div>
  );
}
