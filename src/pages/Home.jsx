import {
  ArrowRight,
  GraduationCap,
  LockKeyhole,
  RadioTower,
  Route,
  ShieldCheck,
  Target,
} from 'lucide-react';
import CallToAction from '../components/sections/CallToAction.jsx';
import FeatureCard from '../components/cards/FeatureCard.jsx';
import Seo from '../components/layout/Seo.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import { PAGE_META } from '../constants/site.js';

const solutions = [
  {
    title: 'Monitoreo 24/7',
    description:
      'Supervisión continua, protocolos de respuesta y vigilancia estratégica para operaciones críticas.',
    icon: RadioTower,
  },
  {
    title: 'Logistica Segura',
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

export default function Home() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.home} />
      <section className="section-shell grid min-h-[calc(100vh-5rem)] items-center gap-10 py-10 md:grid-cols-[1.02fr_0.98fr] md:py-12">
        <div className="max-w-3xl">
          <p className="mb-5 inline-flex rounded-md border border-primary-cyan/30 bg-primary-cyan/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Centro de mando institucional
          </p>
          <h1 className="text-4xl font-extrabold leading-[1.08] text-text sm:text-5xl lg:text-[3.55rem]">
            Vigilancia avanzada y precisión táctica para proteger lo que más importa.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-text sm:text-lg">
            SIS S.A. integra seguridad privada, monitoreo, logística segura y operaciones
            especializadas con enfoque profesional, técnico e institucional.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink to="/contacto">
              Solicitar información <ArrowRight size={17} />
            </ButtonLink>
            <ButtonLink to="/servicios" variant="secondary">
              Ver servicios
            </ButtonLink>
          </div>
        </div>

        <div className="glass-panel relative min-h-[24rem] overflow-hidden rounded-lg p-5">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(125,226,220,0.12),transparent_38%),radial-gradient(circle_at_72%_24%,rgba(47,184,178,0.22),transparent_16rem)]" />
          <div className="relative flex h-full min-h-[21.5rem] flex-col justify-between rounded-md border border-dashed border-primary-cyan/35 bg-background/52 p-6">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-primary-cyan/35 bg-surface-high/75 text-primary-cyan-bright">
                <ShieldCheck size={24} />
              </span>
              <span className="rounded-md border border-border-cyber/60 bg-surface/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-text">
                Activo real requerido
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-text">Fotografía operativa real pendiente</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-muted-text">
                Espacio reservado para fotografía institucional validada por SIS S.A. No se utiliza
                imagen generada ni recurso simulado.
              </p>
            </div>
          </div>
        </div>
      </section>

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
          <div className="flex min-h-56 items-center justify-center rounded-md border border-dashed border-primary-cyan/30 bg-background/50 p-6 text-center">
            <div>
              <Target className="mx-auto text-primary-cyan-bright" size={34} strokeWidth={1.7} />
              <p className="mt-4 text-sm font-bold uppercase tracking-[0.18em] text-muted-text">
                Imagen institucional pendiente de activo real
              </p>
            </div>
          </div>
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

      <CallToAction eyebrow="Contacto operativo" title="¿Necesita una solución de seguridad confiable, técnica y operativa?" description="Conecte con nuestro centro de mando y solicite información sobre los servicios especializados de SIS S.A." actions={[{ label: 'Contactar Centro de Mando', to: '/contacto' }]} />
    </div>
  );
}
