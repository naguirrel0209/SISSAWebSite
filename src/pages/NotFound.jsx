import { ArrowLeft, ShieldAlert } from 'lucide-react';
import Seo from '../components/layout/Seo.jsx';
import ButtonLink from '../components/ui/ButtonLink.jsx';
import { PAGE_META } from '../constants/site.js';

export default function NotFound() {
  return (
    <>
      <Seo {...PAGE_META.notFound} />
      <section className="section-shell flex min-h-[65vh] items-center justify-center py-16 text-center" aria-labelledby="not-found-title">
        <div className="glass-panel w-full max-w-2xl rounded-lg p-7 sm:p-10">
          <ShieldAlert className="mx-auto text-primary-cyan-bright" size={44} strokeWidth={1.5} aria-hidden="true" />
          <p className="eyebrow mt-6">Error 404</p>
          <h1 id="not-found-title" className="mt-3 text-4xl font-extrabold text-text sm:text-5xl">Ruta no localizada</h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-8 text-muted-text">La página solicitada no está disponible. La navegación principal continúa operativa.</p>
          <div className="mt-8 flex justify-center">
            <ButtonLink to="/"><ArrowLeft size={17} aria-hidden="true" /> Volver al inicio</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
