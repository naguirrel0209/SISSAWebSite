import {
  CalendarClock,
  Check,
  CheckCircle2,
  Coins,
  GraduationCap,
  Handshake,
  Loader2,
  Send,
  ShieldCheck,
  UsersRound,
} from 'lucide-react';
import { useState } from 'react';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import { isEmailjsConfigured, sendContactEmail } from '../services/emailjs.js';
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
    title: 'Complete el formulario',
    description: 'Comparta sus datos de contacto y el requerimiento laboral directamente desde esta página.',
  },
  {
    title: 'Indique su experiencia',
    description: 'Describa brevemente su experiencia, disponibilidad, ubicación y el tipo de plaza que busca.',
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

const fieldClass =
  'mt-2 min-h-12 w-full rounded-md border border-border-cyber/65 bg-background/65 px-4 text-sm text-text outline-none transition placeholder:text-muted-text/55 focus:border-primary-cyan/75 focus:ring-2 focus:ring-primary-cyan/10';

export default function Oportunidades() {
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
    const apellido = formData.get('apellido')?.trim();
    const correo = formData.get('correo')?.trim();
    const telefono = formData.get('telefono')?.trim();
    const mensaje = formData.get('mensaje')?.trim();

    if (!nombre) next.nombre = 'Ingrese su nombre.';
    if (!apellido) next.apellido = 'Ingrese su apellido.';
    if (!correo) {
      next.correo = 'Ingrese un correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      next.correo = 'Ingrese un correo electrónico válido.';
    }
    if (!telefono) next.telefono = 'Ingrese un teléfono de contacto.';
    if (!mensaje) next.mensaje = 'Describa brevemente su requerimiento laboral.';

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
          'No se pudo enviar la postulación. Intente nuevamente o contacte por teléfono.',
      );
    }
  };

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
              Postulación directa
            </p>
            <h2 id="application-title" className="mt-3 text-3xl font-bold text-text">
              Envíe su información laboral
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Complete sus datos y describa su requerimiento. El equipo de SIS S.A. recibirá la
              solicitud como una postulación laboral, sin que tenga que pasar por el formulario de
              contacto general.
            </p>
            <div className="mt-7 flex items-start gap-3 border-l border-primary-cyan/45 pl-4">
              <ShieldCheck className="mt-0.5 shrink-0 text-primary-cyan-bright" size={19} />
              <p className="text-xs leading-6 text-muted-text">
                {configured
                  ? 'Su información será enviada directamente al equipo de SIS S.A. por el canal institucional configurado.'
                  : 'El envío de formulario está pendiente de configuración. También puede llamar por los canales disponibles.'}
              </p>
            </div>
            <p className="mt-5 text-xs leading-6 text-muted-text">
              Puede indicar su experiencia, disponibilidad, ubicación y cualquier dato laboral
              relevante dentro del mensaje.
            </p>
          </div>
          <form
            className="glass-panel rounded-lg p-5 sm:p-7"
            onSubmit={handleSubmit}
            noValidate
          >
            <input type="hidden" name="servicio" value="Oportunidades laborales" />
            <input type="hidden" name="empresa" value="Postulación laboral" />
            <input type="hidden" name="tipo_solicitud" value="Contratación" />
            <input
              type="text"
              name="_gotcha"
              value=""
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-9999px',
                width: '1px',
                height: '1px',
                opacity: 0,
              }}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Nombre
                <input
                  required
                  name="nombre"
                  type="text"
                  autoComplete="given-name"
                  placeholder="Nombre"
                  className={fieldClass}
                  onChange={handleChange}
                  aria-invalid={errors.nombre ? 'true' : 'false'}
                />
                {errors.nombre ? (
                  <span className="mt-1 block text-xs font-semibold text-danger" role="alert">
                    {errors.nombre}
                  </span>
                ) : null}
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Apellido
                <input
                  required
                  name="apellido"
                  type="text"
                  autoComplete="family-name"
                  placeholder="Apellido"
                  className={fieldClass}
                  onChange={handleChange}
                  aria-invalid={errors.apellido ? 'true' : 'false'}
                />
                {errors.apellido ? (
                  <span className="mt-1 block text-xs font-semibold text-danger" role="alert">
                    {errors.apellido}
                  </span>
                ) : null}
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text">
                Correo electrónico
                <input
                  required
                  name="correo"
                  type="email"
                  autoComplete="email"
                  placeholder="correo@ejemplo.com"
                  className={fieldClass}
                  onChange={handleChange}
                  aria-invalid={errors.correo ? 'true' : 'false'}
                />
                {errors.correo ? (
                  <span className="mt-1 block text-xs font-semibold text-danger" role="alert">
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
                  <span className="mt-1 block text-xs font-semibold text-danger" role="alert">
                    {errors.telefono}
                  </span>
                ) : null}
              </label>
              <label className="text-xs font-bold uppercase tracking-[0.12em] text-muted-text sm:col-span-2">
                Mensaje o requerimiento
                <textarea
                  required
                  name="mensaje"
                  rows="5"
                  placeholder="Indique su experiencia, disponibilidad, ubicación y el puesto de interés."
                  className={`${fieldClass} resize-y py-3`}
                  onChange={handleChange}
                  aria-invalid={errors.mensaje ? 'true' : 'false'}
                />
                {errors.mensaje ? (
                  <span className="mt-1 block text-xs font-semibold text-danger" role="alert">
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
                    Enviando postulación
                    <Loader2 size={16} className="animate-spin" />
                  </>
                ) : (
                  <>
                    Enviar postulación
                    <Send size={16} />
                  </>
                )}
              </button>
              <p className="max-w-sm text-xs leading-5 text-muted-text">
                La participación dependerá de la existencia de plazas y de la evaluación
                correspondiente.
              </p>
            </div>

            {status === 'success' ? (
              <div
                className="mt-5 flex items-start gap-3 rounded-md border border-success/40 bg-success/10 p-4 text-sm leading-6 text-text"
                role="status"
                aria-live="polite"
              >
                <CheckCircle2 className="mt-0.5 shrink-0 text-success" size={18} />
                Su postulación fue enviada al equipo de SIS S.A. Recibirá seguimiento por los datos
                compartidos.
              </div>
            ) : null}

            {status === 'error' ? (
              <div
                className="mt-5 flex items-start gap-3 rounded-md border border-danger/45 bg-danger/10 p-4 text-sm leading-6 text-text"
                role="alert"
              >
                <ShieldCheck className="mt-0.5 shrink-0 text-danger" size={18} />
                {errorMessage ||
                  'No se pudo enviar la postulación. Intente nuevamente o contacte por teléfono.'}
              </div>
            ) : null}
          </form>
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-14">
        <div className="section-shell grid gap-8 lg:grid-cols-[0.58fr_1fr] lg:gap-12">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Proceso de seguimiento
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">¿Qué sucede después?</h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              SIS S.A. revisará la información recibida y dará seguimiento según la disponibilidad
              de plazas, el perfil requerido y las necesidades operativas vigentes.
            </p>
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
        description="Complete el formulario de postulación o comuníquese por teléfono para consultar oportunidades disponibles."
        actions={[
          { label: 'Llamar a SIS S.A.', href: SITE.phoneHref },
        ]}
      />
    </div>
  );
}
