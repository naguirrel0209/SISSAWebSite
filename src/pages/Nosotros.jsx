import {
  Building2,
  CarFront,
  CheckCircle2,
  Medal,
  RadioTower,
  Shirt,
  Sparkles,
  UsersRound,
} from 'lucide-react';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import AssetPlaceholder from '../components/ui/AssetPlaceholder.jsx';
import { PAGE_META } from '../constants/site.js';

const infrastructure = [
  {
    title: 'Fachada oficial',
    description:
      'Instalaciones corporativas diseñadas para la coordinación administrativa, operativa y atención institucional.',
    icon: Building2,
  },
  {
    title: 'Oficinas administrativas',
    description:
      'Espacios de gestión, planificación y seguimiento para garantizar una operación ordenada y profesional.',
    icon: UsersRound,
  },
  {
    title: 'Centro de operaciones',
    description:
      'Área destinada al control, monitoreo y coordinación de servicios estratégicos de seguridad.',
    icon: RadioTower,
  },
  {
    title: 'Flota vehicular',
    description:
      'Vehículos operativos destinados al apoyo, supervisión, patrullaje y logística de seguridad.',
    icon: CarFront,
  },
];

const uniforms = [
  {
    title: 'Uniforme Casual',
    description:
      'Presentación institucional para actividades administrativas, atención corporativa y funciones de representación.',
  },
  {
    title: 'Uniforme de Gala',
    description:
      'Imagen formal destinada a eventos, actos protocolarios y presencia institucional de alto nivel.',
  },
  {
    title: 'Uniforme de Fatiga',
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

export default function Nosotros() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.nosotros} />
      <PageHeader eyebrow="Corporación SIS · Perfil institucional" title="Seguridad estratégica con disciplina operativa" description="SIS S.A. desarrolla soluciones integrales de seguridad con enfoque técnico, presencia institucional y capacidad operativa para proteger personas, instalaciones y operaciones críticas." assetLabel="Fotografía institucional real pendiente" />

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
          {infrastructure.map(({ title, description, icon: Icon }) => (
            <article
              key={title}
              className="glass-panel grid gap-5 rounded-lg p-4 sm:grid-cols-[0.9fr_1.1fr] sm:items-center"
            >
              <AssetPlaceholder label={`${title}: fotografía real pendiente`} icon={Icon} size="compact" />
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

          <div className="grid gap-5 md:grid-cols-3">
            {uniforms.map(({ title, description }) => (
              <article key={title} className="glass-panel rounded-lg p-4">
                <AssetPlaceholder label={`${title}: fotografía real pendiente`} icon={Shirt} size="compact" />
                <div className="px-1 pb-2 pt-5">
                  <h3 className="text-lg font-bold text-text">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-text">{description}</p>
                </div>
              </article>
            ))}
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
