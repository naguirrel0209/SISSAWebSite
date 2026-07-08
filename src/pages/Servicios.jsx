import {
  ArrowRight,
  Banknote,
  Building2,
  Check,
  CircleGauge,
  ClipboardCheck,
  GraduationCap,
  Hotel,
  House,
  LockKeyhole,
  MapPinned,
  RadioTower,
  Route,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UserRoundCheck,
  Warehouse,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import AssetPlaceholder from '../components/ui/AssetPlaceholder.jsx';
import { PAGE_META } from '../constants/site.js';

const services = [
  {
    title: 'Custodio en Ruta',
    description:
      'Protección operativa para transporte de mercancías, rutas críticas y desplazamientos logísticos que requieren control, presencia y respuesta preventiva.',
    applications: ['Rutas de alto valor', 'Transporte de mercancías', 'Acompañamiento operativo', 'Supervisión en tránsito'],
    icon: MapPinned,
  },
  {
    title: 'Seguridad Ejecutiva',
    description:
      'Servicio especializado para protección de ejecutivos, directivos, visitantes y personas que requieren acompañamiento discreto, técnico y profesional.',
    applications: ['Protección personal', 'Acompañamiento ejecutivo', 'Traslados programados', 'Eventos corporativos'],
    icon: UserRoundCheck,
  },
  {
    title: 'Seguridad Bancaria',
    description:
      'Presencia preventiva y control operativo para agencias, puntos de atención, áreas administrativas y entornos financieros.',
    applications: ['Agencias bancarias', 'Áreas de atención', 'Control de ingreso', 'Prevención de incidentes'],
    icon: Banknote,
  },
  {
    title: 'Seguridad Residencial',
    description:
      'Protección para condominios, residenciales, edificios y comunidades privadas mediante presencia, control de accesos y supervisión constante.',
    applications: ['Condominios', 'Garitas de acceso', 'Residenciales privados', 'Supervisión perimetral'],
    icon: House,
  },
  {
    title: 'Seguridad Privada',
    description:
      'Personal capacitado para resguardar instalaciones, activos, colaboradores y visitantes bajo protocolos de prevención, control y respuesta.',
    applications: ['Empresas', 'Bodegas', 'Comercios', 'Instalaciones industriales'],
    icon: LockKeyhole,
  },
  {
    title: 'Monitoreo CCTV Inteligente',
    description:
      'Supervisión visual y apoyo operativo mediante sistemas de monitoreo, cámaras de seguridad y protocolos de alerta.',
    applications: ['Monitoreo 24/7', 'Cámaras de vigilancia', 'Alertas operativas', 'Supervisión remota'],
    icon: RadioTower,
  },
  {
    title: 'Logística Segura',
    description:
      'Soluciones de seguridad para operaciones logísticas, movimiento de activos, traslados y procesos que requieren acompañamiento estratégico.',
    applications: ['Transporte operativo', 'Control de rutas', 'Custodia logística', 'Coordinación de movimientos'],
    icon: Route,
  },
  {
    title: 'Capacitación',
    description:
      'Formación técnica y operativa para fortalecer la disciplina, prevención, reacción y cultura de seguridad dentro de equipos institucionales.',
    applications: ['Protocolos de seguridad', 'Prevención de riesgos', 'Respuesta operativa', 'Cultura institucional'],
    icon: GraduationCap,
  },
];

const methodology = [
  {
    title: 'Diagnóstico',
    description: 'Evaluación inicial del entorno, nivel de riesgo y necesidades específicas del cliente.',
  },
  {
    title: 'Planificación',
    description: 'Diseño de protocolo operativo, asignación de recursos y definición de cobertura.',
  },
  {
    title: 'Ejecución',
    description: 'Implementación del servicio con personal capacitado, supervisión y control operativo.',
  },
  {
    title: 'Supervisión',
    description: 'Seguimiento, reportes, monitoreo y ajustes para mantener la efectividad del servicio.',
  },
];

const sectors = [
  { name: 'Corporativo', icon: Building2 },
  { name: 'Residencial', icon: House },
  { name: 'Bancario', icon: Banknote },
  { name: 'Industrial', icon: Warehouse },
  { name: 'Logístico', icon: Truck },
  { name: 'Hotelero', icon: Hotel },
  { name: 'Comercial', icon: ShoppingBag },
  { name: 'Institucional', icon: ShieldCheck },
];

const trustSignals = [
  'Protocolos operativos',
  'Supervisión constante',
  'Personal capacitado',
  'Respuesta profesional',
  'Monitoreo estratégico',
  'Presencia preventiva',
];

export default function Servicios() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.servicios} />
      <PageHeader eyebrow="Unidades especializadas · SIS S.A." title="Soluciones de seguridad para operaciones críticas" description="SIS S.A. integra personal capacitado, protocolos operativos, monitoreo y presencia táctica para proteger personas, instalaciones, rutas y activos estratégicos." assetLabel="Fotografía operativa real pendiente" />

      <section className="section-shell py-14">
        <div className="grid gap-8 border-y border-border-cyber/55 py-10 md:grid-cols-[0.42fr_1fr] md:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Enfoque de servicio
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Cobertura según su nivel de riesgo</h2>
          </div>
          <p className="text-base leading-8 text-muted-text md:text-lg">
            Nuestros servicios están diseñados para responder a diferentes niveles de riesgo,
            operación y exposición. Cada solución se estructura con base en prevención, control,
            supervisión y respuesta profesional, adaptándose a las necesidades de clientes
            corporativos, residenciales, bancarios, logísticos e institucionales.
          </p>
        </div>
      </section>

      <section id="operaciones" className="section-shell scroll-mt-24 py-14">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Portafolio operativo
          </p>
          <h2 className="mt-3 text-3xl font-bold text-text">Servicios especializados</h2>
          <p className="mt-4 text-sm leading-7 text-muted-text">
            Unidades configurables de acuerdo con el entorno, la cobertura requerida y los
            protocolos definidos para cada operación.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {services.map(({ title, description, applications, icon: Icon }) => (
            <article key={title} className="glass-panel rounded-lg p-4 sm:p-5">
              <AssetPlaceholder label={`${title}: fotografía real pendiente`} icon={Icon} size="compact" />
              <div className="px-1 pb-1 pt-5">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-primary-cyan/35 bg-primary-cyan/10 text-primary-cyan-bright">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3 className="text-xl font-bold text-text">{title}</h3>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted-text">{description}</p>
                <div className="mt-5 grid gap-2 sm:grid-cols-2">
                  {applications.map((application) => (
                    <div key={application} className="flex items-start gap-2 text-xs leading-5 text-muted-text">
                      <Check className="mt-0.5 shrink-0 text-primary-cyan-bright" size={14} strokeWidth={2.2} />
                      <span>{application}</span>
                    </div>
                  ))}
                </div>
                <Link
                  to="/contacto"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary-cyan-bright transition-colors hover:text-text"
                >
                  Solicitar información <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-14">
        <div className="section-shell">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Proceso técnico
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Metodología de operación</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            {methodology.map(({ title, description }, index) => (
              <article key={title} className="relative border-l border-primary-cyan/45 px-5 py-3">
                <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary-cyan-bright">
                  Fase {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-lg font-bold text-text">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-text">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Ámbitos de cobertura
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Sectores que protegemos</h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Soluciones ajustadas al flujo, exposición y dinámica operativa de cada entorno.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {sectors.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="flex min-h-24 flex-col justify-between rounded-lg border border-border-cyber/55 bg-surface/48 p-4 backdrop-blur"
              >
                <Icon size={19} className="text-primary-cyan-bright" strokeWidth={1.8} />
                <span className="mt-4 text-sm font-bold text-text">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="glass-panel grid gap-3 rounded-lg p-5 sm:grid-cols-2 lg:grid-cols-3">
          {trustSignals.map((signal) => (
            <div key={signal} className="flex items-center gap-3 border-b border-border-cyber/35 px-2 py-4">
              <CircleGauge size={18} className="shrink-0 text-primary-cyan-bright" strokeWidth={1.8} />
              <span className="text-sm font-bold text-text">{signal}</span>
            </div>
          ))}
        </div>
      </section>

      <CallToAction icon={ClipboardCheck} eyebrow="Evaluación operativa" title="Solicite una solución de seguridad adaptada a su operación" description="Conecte con nuestro centro de mando para evaluar sus necesidades y definir el servicio adecuado para su empresa, residencia, ruta o instalación." actions={[{ label: 'Contactar Centro de Mando', to: '/contacto' }, { label: 'Ver Nosotros', to: '/nosotros', variant: 'secondary' }]} />
    </div>
  );
}
