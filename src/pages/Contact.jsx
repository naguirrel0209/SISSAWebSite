import {
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Loader2,
  Mail,
  MapPin,
  MessageCircleMore,
  Phone,
  RadioTower,
  Send,
  ShieldCheck,
} from 'lucide-react';
import { useRef, useState } from 'react';
import Seo from '../components/layout/Seo.jsx';
import { isEmailjsConfigured, sendContactEmail } from '../services/emailjs.js';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
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
    value: SITE.phone,
    description:
      'Canal de comunicación rápida para requerimientos iniciales y seguimiento de solicitudes.',
    href: 'https://wa.me/50223230303?text=Buen%20día,%20quiero%20información%20sobre%20servicios%20de%20seguridad.',
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
    href: 'https://maps.app.goo.gl/LA5t7bmB9mGh9bxU6',
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
  const formRef = useRef(null);
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errors, setErrors] = useState({});
  const configured = isEmailjsConfigured();

  const validateField = (name, value) => {
    if (value) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (formData) => {
    const next = {};
    const nombre = formData.get('nombre')?.trim();
    const correo = formData.get('correo')?.trim();
    const telefono = formData.get('telefono')?.trim();
    const servicio = formData.get('servicio');
    const mensaje = formData.get('mensaje')?.trim();

    if (!nombre) next.nombre = 'Ingrese su nombre completo.';
    if (!correo) {
      next.correo = 'Ingrese un correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      next.correo = 'Ingrese un correo electrónico válido.';
    }
    if (!telefono) next.telefono = 'Ingrese un teléfono de contacto.';
    if (!servicio) next.servicio = 'Seleccione un tipo de servicio.';
    if (!mensaje) next.mensaje = 'Describa brevemente su requerimiento.';

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (event) => {
    if (status !== 'idle') setStatus('idle');
    if (errorMessage) setErrorMessage('');
    validateField(event.target.name, event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = formData.get('_gotcha');

    if (honeypot) {
      setStatus('success');
      form.reset();
      return;
    }

    if (!validate(formData)) {
      setStatus('validation-error');
      return;
    }

    setStatus('sending');
    try {
      await sendContactEmail(form);
      setStatus('success');
      setErrorMessage('');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err?.text ||
          err?.message ||
          'No se pudo enviar el formulario. Intente nuevamente o contacte por teléfono.',
      );
    }
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
                {configured
                  ? 'Su requerimiento será enviado directamente al equipo de SIS S.A. mediante un canal institucional validado.'
                  : 'El envío de formulario está pendiente de configuración. Contacte por los canales disponibles.'}
              </p>
            </div>
          </div>

          <form
            ref={formRef}
            className="glass-panel rounded-lg p-5 sm:p-7"
            onSubmit={handleSubmit}
            noValidate
          >
            <input
              type="text"
              name="_gotcha"
              value=""
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
            />
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
                  onChange={handleChange}
                  aria-invalid={errors.nombre ? 'true' : 'false'}
                />
                {errors.nombre ? (
                  <span className="mt-1 block text-xs font-semibold text-red-600" role="alert">
                    {errors.nombre}
                  </span>
                ) : null}
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Empresa
                <input
                  name="empresa"
                  type="text"
                  autoComplete="organization"
                  placeholder="Empresa o institución"
                  className={fieldClass}
                  onChange={handleChange}
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
                  onChange={handleChange}
                  aria-invalid={errors.correo ? 'true' : 'false'}
                />
                {errors.correo ? (
                  <span className="mt-1 block text-xs font-semibold text-red-600" role="alert">
                    {errors.correo}
                  </span>
                ) : null}
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
                  onChange={handleChange}
                  aria-invalid={errors.telefono ? 'true' : 'false'}
                />
                {errors.telefono ? (
                  <span className="mt-1 block text-xs font-semibold text-red-600" role="alert">
                    {errors.telefono}
                  </span>
                ) : null}
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text sm:col-span-2">
                Tipo de servicio requerido
                <select
                  required
                  name="servicio"
                  defaultValue=""
                  className={fieldClass}
                  onChange={handleChange}
                  aria-invalid={errors.servicio ? 'true' : 'false'}
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
                {errors.servicio ? (
                  <span className="mt-1 block text-xs font-semibold text-red-600" role="alert">
                    {errors.servicio}
                  </span>
                ) : null}
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text sm:col-span-2">
                Mensaje o requerimiento
                <textarea
                  required
                  name="mensaje"
                  rows="5"
                  placeholder="Describa brevemente la necesidad, ubicación o tipo de operación."
                  className={`${fieldClass} resize-y py-3`}
                  onChange={handleChange}
                  aria-invalid={errors.mensaje ? 'true' : 'false'}
                />
                {errors.mensaje ? (
                  <span className="mt-1 block text-xs font-semibold text-red-600" role="alert">
                    {errors.mensaje}
                  </span>
                ) : null}
              </label>
            </div>

            <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'sending'}
                aria-busy={status === 'sending'}
              >
                {status === 'sending' ? (
                  <>
                    Enviando protocolo
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar protocolo
                    <Send size={16} />
                  </>
                )}
              </button>
              <p className="max-w-sm text-xs leading-5 text-muted-text">
                Toda solicitud será tratada con confidencialidad, criterio técnico y atención
                profesional.
              </p>
            </div>

            {status === 'success' ? (
              <div
                className="mt-5 flex items-start gap-3 rounded-md border border-primary-cyan/40 bg-primary-cyan/10 p-4 text-sm leading-6 text-text"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-primary-cyan-bright" size={18} />
                Su requerimiento fue enviado al equipo de SIS S.A. Recibirá seguimiento por
                correo electrónico en breve.
              </div>
            ) : null}

            {status === 'error' ? (
              <div
                className="mt-5 flex items-start gap-3 rounded-md border border-red-600/45 bg-red-600/10 p-4 text-sm leading-6 text-text"
                role="alert"
              >
                <ShieldCheck className="mt-0.5 shrink-0 text-red-600" size={18} />
                {errorMessage ||
                  'No se pudo enviar el formulario. Intente nuevamente o contacte por teléfono.'}
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
        <div className="glass-panel overflow-hidden rounded-lg p-3">
          <iframe
            title="Ubicación de SIS S.A. en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3861.23794571824!2d-90.59919632394042!3d14.58551287744398!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8589a113fddbbfc9%3A0xccc3be311fa8fc04!2sSIS%20S.A.!5e0!3m2!1ses-419!2sgt!4v1783964339807!5m2!1ses-419!2sgt"
            className="h-[28rem] w-full rounded-md border-0"
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
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
