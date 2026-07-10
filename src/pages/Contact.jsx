import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  RadioTower,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useState } from 'react';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import AssetImage from '../components/ui/AssetImage.jsx';
import { PAGE_META, SITE } from '../constants/site.js';
import { institutionalImages } from '../data/media.js';

const contactMethods = [
  {
    label: 'Teléfono',
    value: SITE.phone,
    description:
      'Atención directa para solicitudes institucionales, coordinación operativa y consultas generales.',
    href: SITE.phoneHref,
    icon: Phone,
  },
  {
    label: 'WhatsApp',
    value: 'WhatsApp Encriptado',
    description:
      'Canal de comunicación rápida para requerimientos iniciales y seguimiento de solicitudes.',
    href: null,
    icon: MessageCircleMore,
  },
  {
    label: 'Correo electrónico',
    value: SITE.email,
    description:
      'Recepción formal de solicitudes, propuestas, documentación y requerimientos corporativos.',
    href: SITE.emailHref,
    icon: Mail,
  },
  {
    label: 'Ubicación',
    value: SITE.address,
    description:
      'Oficinas centrales para atención administrativa, coordinación y gestión institucional.',
    href: null,
    icon: MapPin,
  },
];

const serviceOptions = [
  'Seguridad Privada',
  'Custodio en Ruta',
  'Seguridad Ejecutiva',
  'Seguridad Bancaria',
  'Seguridad Residencial',
  'Monitoreo CCTV',
  'Logística Segura',
  'Capacitación',
  'Otro requerimiento',
];

const availability = [
  'Atención institucional',
  'Coordinación operativa',
  'Evaluación de requerimientos',
  'Seguimiento profesional',
];

const fieldClass =
  'mt-2 min-h-12 w-full rounded-md border border-border-cyber/65 bg-background/65 px-4 text-sm text-text outline-none transition placeholder:text-muted-text/55 focus:border-primary-cyan/75 focus:ring-2 focus:ring-primary-cyan/10';

function ContactCard({ method }) {
  const { label, value, description, href, icon: Icon } = method;
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-primary-cyan/35 bg-primary-cyan/10 text-primary-cyan-bright">
          <Icon size={21} strokeWidth={1.8} />
        </span>
        <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-primary-cyan-bright">
          Canal directo
        </span>
      </div>
      <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-muted-text">{label}</p>
      <p className="mt-2 break-all text-base font-bold leading-6 text-text">{value}</p>
      <p className="mt-3 text-sm leading-6 text-muted-text">{description}</p>
    </>
  );

  return href ? (
    <a
      href={href}
      className="glass-panel min-w-0 rounded-lg p-5 transition duration-200 hover:-translate-y-1 hover:border-primary-cyan/60"
    >
      {content}
    </a>
  ) : (
    <div className="glass-panel min-w-0 rounded-lg p-5">{content}</div>
  );
}

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full">
      <Seo {...PAGE_META.contacto} />
      <PageHeader
        eyebrow="Canal institucional · SIS S.A."
        title="Centro de Mando y Contacto"
        description="Nuestro equipo está preparado para atender requerimientos de seguridad, logística, monitoreo y protección especializada con criterio técnico, confidencialidad y respuesta profesional."
        assetSrc={institutionalImages.fachada.src}
        assetAlt={institutionalImages.fachada.alt}
        assetObjectPosition={institutionalImages.fachada.objectPosition}
        assetCaption="Oficinas centrales SIS S.A."
      />

      <section className="section-shell py-14">
        <div className="mb-8 max-w-3xl">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
            Canales institucionales
          </p>
          <h2 className="mt-3 text-3xl font-bold text-text">Protocolos de contacto directo</h2>
          <p className="mt-4 text-sm leading-7 text-muted-text">
            Seleccione el canal adecuado para iniciar una consulta, coordinar atención o presentar
            un requerimiento formal.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {contactMethods.map((method) => (
            <ContactCard key={method.label} method={method} />
          ))}
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.68fr_1.32fr]">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Protocolo de ingreso
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Enviar requerimiento</h2>
            <p className="mt-5 text-sm leading-7 text-muted-text">
              Comparta la información esencial para que el equipo pueda identificar el tipo de
              atención requerida y preparar el seguimiento correspondiente.
            </p>
            <div className="mt-7 flex items-start gap-3 border-l border-primary-cyan/45 pl-4">
              <ShieldCheck className="mt-0.5 shrink-0 text-primary-cyan-bright" size={19} />
              <p className="text-xs leading-6 text-muted-text">
                Formulario preparado como prototipo visual. La integración de envío se habilitará
                mediante un canal oficial validado por SIS S.A.
              </p>
            </div>
          </div>

          <form className="glass-panel rounded-lg p-5 sm:p-7" onSubmit={handleSubmit}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Nombre completo
                <input
                  required
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  placeholder="Nombre y apellido"
                  className={fieldClass}
                  onChange={() => setSubmitted(false)}
                />
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Empresa
                <input
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  placeholder="Empresa o institución"
                  className={fieldClass}
                  onChange={() => setSubmitted(false)}
                />
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Correo electrónico
                <input
                  required
                  name="correo"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@empresa.com"
                  className={fieldClass}
                  onChange={() => setSubmitted(false)}
                />
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Teléfono
                <input
                  required
                  name="telefono"
                  type="tel"
                  autoComplete="tel"
                  placeholder="Número de contacto"
                  className={fieldClass}
                  onChange={() => setSubmitted(false)}
                />
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text sm:col-span-2">
                Tipo de servicio requerido
                <select
                  required
                  name="servicio"
                  defaultValue=""
                  className={fieldClass}
                  onChange={() => setSubmitted(false)}
                >
                  <option value="" disabled>
                    Seleccione una unidad de servicio
                  </option>
                  {serviceOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text sm:col-span-2">
                Mensaje o requerimiento
                <textarea
                  required
                  name="mensaje"
                  rows="5"
                  placeholder="Describa brevemente la necesidad, ubicación o tipo de operación."
                  className={`${fieldClass} resize-y py-3`}
                  onChange={() => setSubmitted(false)}
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button type="submit" className="btn-primary">
                Enviar protocolo <Send size={16} />
              </button>
              <p className="max-w-sm text-xs leading-5 text-muted-text">
                Toda solicitud será tratada con confidencialidad, criterio técnico y atención
                profesional.
              </p>
            </div>

            {submitted ? (
              <div
                className="mt-5 flex items-start gap-3 rounded-md border border-primary-cyan/40 bg-primary-cyan/10 p-4 text-sm leading-6 text-text"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-primary-cyan-bright" size={18} />
                Protocolo validado visualmente. El envío real se habilitará al integrar el canal
                oficial de SIS S.A.
              </div>
            ) : null}
          </form>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.32fr] lg:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Capacidad de atención
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Disponibilidad operativa</h2>
            <p className="mt-5 text-sm leading-7 text-muted-text">
              SIS S.A. mantiene canales de atención para coordinar servicios, evaluar requerimientos
              y dar seguimiento a operaciones de seguridad conforme a la naturaleza de cada
              solicitud.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {availability.map((item, index) => (
              <div
                key={item}
                className="flex min-h-28 flex-col justify-between rounded-lg border border-border-cyber/55 bg-surface/48 p-4 backdrop-blur"
              >
                {index === 0 ? (
                  <Clock3 size={19} className="text-primary-cyan-bright" />
                ) : (
                  <RadioTower size={19} className="text-primary-cyan-bright" />
                )}
                <span className="mt-4 text-sm font-bold leading-5 text-text">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Oficinas centrales
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Ubicación</h2>
          </div>
          <div className="flex items-center gap-3 text-sm text-muted-text">
            <MapPin size={18} className="shrink-0 text-primary-cyan-bright" />
            <span>{SITE.address}</span>
          </div>
        </div>
        <div className="glass-panel rounded-lg p-4">
          <AssetImage
            src={institutionalImages.fachada.src}
            alt={institutionalImages.fachada.alt}
            objectPosition={institutionalImages.fachada.objectPosition}
            caption="Referencia institucional de ubicación"
            size="default"
          />
        </div>
      </section>

      <section className="section-shell py-8">
        <div className="grid gap-6 border-y border-border-cyber/55 py-10 md:grid-cols-[auto_1fr] md:items-start">
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-primary-cyan/35 bg-primary-cyan/10 text-primary-cyan-bright">
            <ShieldCheck size={24} strokeWidth={1.7} />
          </span>
          <div>
            <h2 className="text-2xl font-bold text-text">Confidencialidad en cada solicitud</h2>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-muted-text">
              Los requerimientos recibidos por SIS S.A. serán gestionados con reserva, atención
              profesional y criterio técnico, priorizando la seguridad de la información y la
              naturaleza operativa de cada caso.
            </p>
          </div>
        </div>
      </section>

      <CallToAction icon={ClipboardCheck} eyebrow="Atención institucional" title="Conecte con SIS S.A." description="Solicite información sobre nuestros servicios especializados y permita que nuestro equipo evalúe la solución adecuada para su operación, empresa, ruta, residencia o instalación." actions={[{ label: 'Llamar al Centro de Mando', href: SITE.phoneHref }, { label: 'Ver Servicios', to: '/servicios', variant: 'secondary' }]} />
    </div>
  );
}
