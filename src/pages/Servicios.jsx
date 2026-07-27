import {
  ArrowDown,
  Building2,
  Camera,
  Check,
  ClipboardCheck,
  Fingerprint,
  Hotel,
  House,
  RadioTower,
  ShieldCheck,
  ShoppingBag,
  Truck,
  UsersRound,
  Warehouse,
} from 'lucide-react';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import AssetImage from '../components/ui/AssetImage.jsx';
import { PAGE_META } from '../constants/site.js';
import { institutionalImages } from '../data/media.js';

const integralMeans = [
  {
    id: 'medios-humanos',
    code: '01',
    title: 'Medios humanos',
    summary:
      'Guardias, vigilantes, custodios y patrullas preparados para prevenir, disuadir y responder.',
    description:
      'El recurso humano es el elemento que evalúa cada incidencia y reacciona conforme a las funciones, protocolos y condiciones definidas para el puesto.',
    icon: UsersRound,
    image: institutionalImages.guardiasCasual,
    details: [
      {
        title: 'Guardias o vigilantes de seguridad',
        items: [
          'Seguridad y vigilancia operativa.',
          'Prevención, disuasión y respuesta.',
          'Gestión y cumplimiento de normas.',
        ],
      },
      {
        title: 'Custodios y patrullas',
        items: [
          'Escolta de mercancías y acompañamiento de rutas.',
          'Disuasión antes y durante el traslado.',
          'Geolocalización activa y resguardo ante fallas mecánicas.',
        ],
      },
      {
        title: 'Uniformes, armamento y capacitación',
        items: [
          'Uniformes institucionales registrados ante la DIGESSP.',
          'Armamento asignado según el puesto, el riesgo y la normativa aplicable.',
          'Formación legal en Seguridad y Salud en el Trabajo, junto con políticas y lineamientos internos.',
        ],
      },
      {
        title: 'Jornadas de servicio',
        items: [
          'Turnos rotativos de 24 horas de trabajo por 24 horas de descanso.',
          'Jornadas continuas o discontinuas de 12 horas.',
          'Esquemas específicos establecidos en el Plan de Trabajo anual.',
        ],
      },
    ],
  },
  {
    id: 'medios-tecnicos-activos',
    code: '02',
    title: 'Medios técnicos activos',
    summary:
      'Tecnología capaz de detectar, analizar y emitir alertas ante una amenaza o situación de peligro.',
    description:
      'Estos recursos fortalecen la observación y el control operativo, facilitando la detección temprana y el seguimiento de eventos.',
    icon: Camera,
    image: institutionalImages.tecnologia,
    details: [
      {
        title: 'Cámaras inteligentes',
        items: [
          'Venta e instalación de videovigilancia para hogares, comercios y empresas.',
          'Configuración de acuerdo con las condiciones y necesidades del entorno.',
        ],
      },
      {
        title: 'Sistemas de alarma',
        items: [
          'Alarmas de última tecnología para comercios y residencias.',
          'Diseño de soluciones ajustadas a las necesidades de seguridad.',
        ],
      },
      {
        title: 'GPS',
        items: [
          'Venta, instalación y monitoreo de sistemas de rastreo.',
          'Ubicación en tiempo real para vehículos particulares y flotas comerciales.',
        ],
      },
    ],
  },
  {
    id: 'medios-tecnicos-pasivos',
    code: '03',
    title: 'Medios técnicos pasivos',
    summary:
      'Elementos físicos orientados a disuadir, retardar, detener o canalizar el avance de una amenaza.',
    description:
      'Las medidas pasivas refuerzan el perímetro y organizan el ingreso para reducir vulnerabilidades antes de que ocurra un incidente.',
    icon: Fingerprint,
    image: institutionalImages.fachada,
    details: [
      {
        title: 'Control de accesos',
        items: [
          'Organización del ingreso y salida de personas, vehículos y proveedores.',
          'Medidas adaptadas al flujo y nivel de exposición de cada instalación.',
        ],
      },
      {
        title: 'Protección perimetral',
        items: [
          'Suministro e instalación de alambre de púas en postes de concreto, madera o estructuras metálicas.',
          'Barreras orientadas a disuadir y retardar accesos no autorizados.',
        ],
      },
    ],
  },
  {
    id: 'medios-organizativos',
    code: '04',
    title: 'Medios organizativos',
    summary:
      'Planes y procedimientos que indican al personal cómo actuar y convierten los recursos en una solución coordinada.',
    description:
      'La organización define las responsabilidades, acciones y respuestas necesarias para que la inversión en seguridad produzca resultados y reduzca pérdidas.',
    icon: ClipboardCheck,
    image: institutionalImages.oficinasAdministrativas,
    details: [
      {
        title: 'Planificación integral',
        items: [
          'Planes de seguridad integral.',
          'Análisis de riesgo.',
          'Planes de contingencia.',
        ],
      },
      {
        title: 'Control y seguimiento',
        items: [
          'Procedimientos de acceso.',
          'Auditorías de seguridad.',
          'Actualización de medidas según las condiciones de la operación.',
        ],
      },
    ],
  },
];

const methodology = [
  {
    title: 'Diagnóstico',
    description: 'Evaluación inicial del entorno, nivel de riesgo y necesidades específicas del cliente.',
  },
  {
    title: 'Planificación',
    description: 'Integración de medios humanos, técnicos y organizativos en un dispositivo coordinado.',
  },
  {
    title: 'Ejecución',
    description: 'Implementación del servicio con funciones, recursos y protocolos claramente definidos.',
  },
  {
    title: 'Supervisión',
    description: 'Seguimiento, reportes y ajustes para mantener la efectividad del sistema.',
  },
];

const sectors = [
  { name: 'Corporativo', icon: Building2 },
  { name: 'Residencial', icon: House },
  { name: 'Bancario', icon: ShieldCheck },
  { name: 'Industrial', icon: Warehouse },
  { name: 'Logístico', icon: Truck },
  { name: 'Hotelero', icon: Hotel },
  { name: 'Comercial', icon: ShoppingBag },
  { name: 'Institucional', icon: RadioTower },
];

export default function Servicios() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.servicios} />
      <PageHeader
        eyebrow="Sistema Integral de Seguridad · SIS S.A."
        title="Personas, tecnología y procedimientos en una sola estrategia"
        description="SIS S.A. integra medios humanos, técnicos y organizativos debidamente coordinados para proteger personas, bienes, instalaciones y procesos productivos con el nivel de seguridad que cada operación necesita."
        assetSrc={institutionalImages.oficinasAdministrativas.src}
        assetAlt={institutionalImages.oficinasAdministrativas.alt}
        assetObjectPosition={institutionalImages.oficinasAdministrativas.objectPosition}
        assetCaption="Coordinación integral SIS S.A."
      />

      <section className="section-shell py-14" aria-labelledby="system-index-title">
        <div className="grid gap-8 border-y border-border-cyber/55 py-10 lg:grid-cols-[0.55fr_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Índice del sistema
            </p>
            <h2 id="system-index-title" className="mt-3 text-3xl font-bold text-text">
              Sistema Integral de Seguridad
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Seleccione un componente para conocer sus funciones, recursos y alcance dentro de la
              solución.
            </p>
          </div>
          <nav className="grid gap-3 sm:grid-cols-2" aria-label="Componentes del Sistema Integral de Seguridad">
            {integralMeans.map(({ id, code, title, summary, icon: Icon }) => (
              <a
                key={id}
                href={`#${id}`}
                className="glass-panel interactive-card group flex min-h-40 flex-col rounded-lg p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="icon-frame" aria-hidden="true">
                    <Icon size={21} />
                  </span>
                  <span className="text-xs font-extrabold text-primary-cyan-bright">{code}</span>
                </div>
                <h3 className="mt-5 text-lg font-bold text-text">{title}</h3>
                <p className="mt-2 text-xs leading-5 text-muted-text">{summary}</p>
                <span className="mt-auto flex items-center gap-2 pt-4 text-xs font-bold text-primary-cyan-bright">
                  Ir al apartado
                  <ArrowDown size={14} className="transition-transform group-hover:translate-y-1" />
                </span>
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-14" aria-label="Componentes del sistema integral">
        <div className="section-shell space-y-8">
          {integralMeans.map(({ id, code, title, description, details, icon: Icon, image }, index) => (
            <article
              key={id}
              id={id}
              className="glass-panel scroll-mt-24 overflow-hidden rounded-lg p-4 sm:p-6"
            >
              <div className={`grid gap-7 lg:grid-cols-[0.8fr_1.2fr] lg:items-start ${index % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                <AssetImage
                  src={image.src}
                  alt={image.alt}
                  objectPosition={image.objectPosition}
                  caption={title}
                  size="tall"
                />
                <div className="p-1 lg:p-3">
                  <div className="flex items-start justify-between gap-4">
                    <span className="icon-frame" aria-hidden="true">
                      <Icon size={21} />
                    </span>
                    <span className="text-sm font-extrabold text-primary-cyan-bright">{code}</span>
                  </div>
                  <h2 className="mt-5 text-3xl font-bold text-text">{title}</h2>
                  <p className="mt-4 text-sm leading-7 text-muted-text">{description}</p>
                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    {details.map((detail) => (
                      <section key={detail.title} className="rounded-md border border-border-cyber/55 bg-background/45 p-4">
                        <h3 className="text-sm font-bold text-text">{detail.title}</h3>
                        <ul className="mt-3 space-y-2">
                          {detail.items.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-xs leading-5 text-muted-text">
                              <Check className="mt-0.5 shrink-0 text-primary-cyan-bright" size={14} strokeWidth={2.2} />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell py-14" aria-labelledby="methodology-title">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Aplicación del sistema
          </p>
          <h2 id="methodology-title" className="mt-3 text-3xl font-bold text-text">
            De la evaluación a la mejora continua
          </h2>
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
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Ámbitos de cobertura
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Sectores que protegemos</h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              El sistema se adapta al flujo, exposición y dinámica operativa de cada entorno.
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

      <CallToAction
        icon={ClipboardCheck}
        eyebrow="Evaluación integral"
        title="Diseñemos el sistema de seguridad adecuado para su operación"
        description="Nuestro equipo puede evaluar el entorno y coordinar los medios humanos, técnicos y organizativos que requiere su empresa, residencia, ruta o instalación."
        actions={[
          { label: 'Solicitar evaluación', to: '/contacto' },
          { label: 'Conocer nuestras operaciones', to: '/operaciones', variant: 'secondary' },
        ]}
      />
    </div>
  );
}
