import { ArrowLeft, Check, ClipboardCheck } from 'lucide-react';
import { Navigate, useParams } from 'react-router-dom';
import Seo from '../components/layout/Seo.jsx';
import PageHeader from '../components/sections/PageHeader.jsx';
import CallToAction from '../components/sections/CallToAction.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import { SITE } from '../constants/site.js';
import { getSecurityMeanById, securityMeans } from '../data/securityMeans.js';

export default function MedioDetalle() {
  const { medioId } = useParams();
  const mean = getSecurityMeanById(medioId);

  if (!mean) {
    return <Navigate to="/servicios" replace />;
  }

  const { title, description, image, highlights, sections, icon: Icon } = mean;

  return (
    <div className="w-full">
      <Seo
        title={`${title} | ${SITE.name}`}
        description={`${title} dentro del Sistema Integral de Seguridad de SIS S.A.`}
      />
      <PageHeader
        eyebrow="Sistema Integral de Seguridad"
        title={title}
        description={description}
        assetSrc={image.src}
        assetAlt={image.alt}
        assetObjectPosition={image.objectPosition}
        assetCaption={title}
      />

      <section className="section-shell py-8">
        <ButtonLink to="/servicios" variant="secondary">
          <ArrowLeft size={16} aria-hidden="true" />
          Volver a Servicios
        </ButtonLink>
      </section>

      <section className="section-shell py-10" aria-labelledby="highlights-title">
        <div className="grid gap-8 border-y border-border-cyber/55 py-10 lg:grid-cols-[0.62fr_1fr] lg:items-start">
          <div>
            <span className="icon-frame" aria-hidden="true">
              <Icon size={22} />
            </span>
            <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Alcance del medio
            </p>
            <h2 id="highlights-title" className="mt-3 text-3xl font-bold text-text">
              Función dentro del sistema
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Este componente trabaja en conjunto con los demás medios para crear un dispositivo de
              seguridad coordinado, medible y adaptable al riesgo de cada entorno.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {highlights.map((highlight) => (
              <article
                key={highlight}
                className="rounded-lg border border-border-cyber/55 bg-surface/48 p-4"
              >
                <Check className="text-primary-cyan-bright" size={18} aria-hidden="true" />
                <p className="mt-4 text-sm font-bold leading-6 text-text">{highlight}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border-cyber/45 bg-surface/25 py-14">
        <div className="section-shell">
          <div className="mb-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary-cyan-bright">
              Desarrollo del medio
            </p>
            <h2 className="mt-3 text-3xl font-bold text-text">Elementos principales</h2>
            <p className="mt-4 text-sm leading-7 text-muted-text">
              Cada medio se adapta según la operación, el nivel de exposición, los recursos
              disponibles y las condiciones específicas del cliente.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {sections.map((section) => (
              <article key={section.title} className="glass-panel rounded-lg p-6">
                <h3 className="text-xl font-bold text-text">{section.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-text">{section.description}</p>
                <ul className="mt-5 space-y-3">
                  {section.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-muted-text">
                      <Check
                        className="mt-0.5 shrink-0 text-primary-cyan-bright"
                        size={16}
                        strokeWidth={2.2}
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell py-14">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {securityMeans.map((item) => (
            <ButtonLink
              key={item.id}
              to={item.path}
              variant={item.id === mean.id ? 'primary' : 'secondary'}
              className="justify-center"
            >
              {item.shortTitle}
            </ButtonLink>
          ))}
        </div>
      </section>

      <CallToAction
        icon={ClipboardCheck}
        eyebrow="Evaluación integral"
        title="Integre este medio dentro de una estrategia completa"
        description="SIS S.A. puede evaluar el entorno y coordinar medios humanos, técnicos y organizativos según la necesidad real de la operación."
        actions={[{ label: 'Solicitar evaluación', to: '/contacto' }]}
      />
    </div>
  );
}
