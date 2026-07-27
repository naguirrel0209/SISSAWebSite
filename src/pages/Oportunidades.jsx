import {
  ArrowRight,
  CalendarClock,
  Check,
  Coins,
  GraduationCap,
  Handshake,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import { PAGE_META, SITE } from '../constants/site.js';
import { institutionalImages } from '../data/media.js';

const benefits = [
  {
    title: 'Sueldo competitivo y puntual',
    description: 'Pagos quincenales realizados con puntualidad para brindar estabilidad a nuestro personal.',
    icon: Coins,
  },
  {
    title: 'Prestaciones desde el primer día',
    description: 'IGSS, Bono 14, aguinaldo y vacaciones conforme a las prestaciones establecidas por la ley.',
    icon: ShieldCheck,
  },
  {
    title: 'Estabilidad y crecimiento',
    description: 'Oportunidad de desarrollar experiencia y crecer dentro de una operación formal de seguridad.',
    icon: GraduationCap,
  },
  {
    title: 'Turnos flexibles',
    description: 'Opciones de turnos flexibles a elegir, de acuerdo con las plazas y necesidades operativas disponibles.',
    icon: CalendarClock,
  },
];

const process = [
  {
    title: 'Comuníquese con SIS S.A.',
    description: 'Utilice nuestros canales institucionales para consultar las oportunidades disponibles.',
  },
  {
    title: 'Comparta su información',
    description: 'Indique su experiencia, disponibilidad y un número de teléfono para recibir seguimiento.',
  },
  {
    title: 'Espere la evaluación',
    description: 'El equipo responsable revisará la información y se comunicará si existe una oportunidad adecuada.',
  },
];

const profiles = [
  'Guardias y vigilantes de seguridad',
  'Custodios y personal de ruta',
  'Patrulleros y supervisores de campo',
  'Personal para atención y control de accesos',
];

export default function Oportunidades() {
  return (
    <div className="w-full">
      <Seo {...PAGE_META.oportunidades} />
      <PageHeader
        eyebrow="Oportunidades laborales · SIS S.A."
        title="Únase a nuestro equipo de seguridad"
        description="Buscamos personas responsables, comprometidas y con vocación de servicio que deseen formar parte de una institución guatemalteca dedicada a proteger personas, bienes y operaciones."
        assetSrc={institutionalImages.entrenamiento.src}
        assetAlt={institutionalImages.entrenamiento.alt}
        assetObjectPosition={institutionalImages.entrenamiento.objectPosition}
        assetCaption="Equipo operativo SIS S.A."
      />

      <section className="section-shell py-14" aria-labelledby="benefits-title">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Lo que ofrecemos
          </p>
          <h2 id="benefits-title" className="mt-3 text-3xl font-bold text-text">
            Respaldo para su desarrollo laboral
          </h2>
          <p className="mt-4 text-sm leading-7 text-muted-text">
            En SIS S.A. valoramos el compromiso de nuestro personal y ofrecemos condiciones
            orientadas a la estabilidad, el cumplimiento y el crecimiento.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, description, icon: Icon }, index) => (
            <article key={title} className="glass-panel interactive-card relative overflow-hidden rounded-lg p-6">
              <span className="absolute right-5 top-4 text-4xl font-extrabold text-primary-cyan/10">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="icon-frame" aria-hidden="true">
                <Icon size={22} />
              </span>
              <h3 className="mt-5 text-lg font-bold leading-6 text-text">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-text">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Áreas de oportunidad
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Perfiles operativos</h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Las oportunidades dependen de las plazas y necesidades operativas disponibles. Puede
              consultar por perfiles como:
            </p>
          </div>
          <div className="glass-panel grid gap-3 rounded-lg p-5 sm:grid-cols-2">
            {profiles.map((profile) => (
              <div key={profile} className="flex items-start gap-3 rounded-md border border-border-cyber/45 bg-background/45 p-4">
                <Check className="mt-0.5 shrink-0 text-primary-cyan-bright" size={17} />
                <span className="text-sm font-bold leading-6 text-text">{profile}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-14" aria-labelledby="application-title">
        <div className="grid gap-8 lg:grid-cols-[0.58fr_1fr] lg:gap-12">
          <div>
            <span className="icon-frame" aria-hidden="true">
              <UsersRound size={22} />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Proceso de contacto
            </p>
            <h2 id="application-title" className="mt-3 text-3xl font-bold text-text">
              ¿Cómo postularse?
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Inicie el proceso por nuestros canales oficiales. La disponibilidad de plazas y el
              seguimiento se confirmarán directamente por SIS S.A.
            </p>
            <a
              href={SITE.phoneHref}
              className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary-cyan-bright transition-colors hover:text-text"
            >
              Llamar al {SITE.phone}
              <ArrowRight size={16} />
            </a>
          </div>
          <ol className="space-y-4">
            {process.map(({ title, description }, index) => (
              <li key={title} className="glass-panel flex gap-4 rounded-lg p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary-cyan/55 bg-primary-cyan/10 text-xs font-extrabold text-primary-cyan-bright">
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-bold text-text">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-text">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell py-4">
        <div className="flex items-start gap-4 border-y border-border-cyber/55 py-8">
          <Handshake className="mt-1 shrink-0 text-primary-cyan-bright" size={24} />
          <p className="max-w-4xl text-sm leading-7 text-muted-text">
            SIS S.A. recibe consultas laborales únicamente por sus canales institucionales. La
            participación en un proceso dependerá de la existencia de plazas y de la evaluación
            correspondiente.
          </p>
        </div>
      </section>

      <CallToAction
        icon={UsersRound}
        eyebrow="Sea parte de SIS S.A."
        title="Dé el primer paso para integrarse a nuestro equipo"
        description="Envíe sus datos por el formulario institucional y seleccione “Oportunidades laborales” para que su consulta sea identificada correctamente."
        actions={[
          { label: 'Enviar mis datos', to: '/contacto' },
          { label: 'Llamar a SIS S.A.', href: SITE.phoneHref, variant: 'secondary' },
        ]}
      />
    </div>
  );
}
