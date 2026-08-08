import { CheckCircle2, ShieldAlert, ShieldCheck } from 'lucide-react';
import SurveyPortalShell from './SurveyPortalShell.jsx';

const COPY = {
  completed: {
    icon: CheckCircle2,
    title: 'Gracias por su participacion.',
    body: 'Esta encuesta ya fue respondida. Agradecemos su tiempo y sus comentarios.',
  },
  expired: {
    icon: ShieldAlert,
    title: 'Esta encuesta ya no se encuentra disponible.',
    body: 'El periodo habilitado para responder esta evaluacion ha finalizado.',
  },
  cancelled: {
    icon: ShieldAlert,
    title: 'Enlace no disponible',
    body: 'Esta encuesta ya no se encuentra disponible.',
  },
  invalid: {
    icon: ShieldAlert,
    title: 'Enlace no valido',
    body: 'El enlace de esta encuesta no es valido o ya no se encuentra disponible.',
  },
  unavailable: {
    icon: ShieldAlert,
    title: 'No fue posible verificar el enlace',
    body: 'Por favor intente nuevamente en unos minutos.',
  },
  configuration_error: {
    icon: ShieldAlert,
    title: 'Portal no configurado',
    body: 'La conexion segura del portal aun no esta disponible.',
  },
  success: {
    icon: ShieldCheck,
    title: 'Gracias por compartir su opinion!',
    body: 'Sus comentarios han sido registrados correctamente y nos ayudaran a continuar fortaleciendo nuestros servicios de seguridad integral. Corporacion SIS agradece el tiempo dedicado a esta evaluacion.',
  },
};

export default function SurveyStatusScreen({ status }) {
  const copy = COPY[status] ?? COPY.invalid;
  const Icon = copy.icon;

  return (
    <SurveyPortalShell compact>
      <section className="glass-panel mx-auto w-full max-w-2xl p-6 text-center sm:p-8">
        <Icon className="mx-auto mb-4 h-12 w-12 text-primary-cyan-bright" aria-hidden="true" />
        <h1 className="text-2xl font-bold text-white sm:text-3xl">{copy.title}</h1>
        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-text">{copy.body}</p>
      </section>
    </SurveyPortalShell>
  );
}
