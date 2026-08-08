import { SITE } from '../../../constants/site.js';

export default function SurveyPortalShell({ children, compact = false }) {
  return (
    <div className="min-h-screen bg-[#07111d] text-text">
      <a href="#survey-content" className="skip-link">Saltar al contenido principal</a>
      <main
        id="survey-content"
        className={`mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 ${
          compact ? 'justify-center' : 'justify-start lg:justify-center'
        }`}
        tabIndex="-1"
      >
        <header className="mb-6 flex items-center gap-3">
          <img
            src="/SISSAWebSite/images/brand/logo-sis.png"
            alt=""
            className="h-12 w-12 rounded-md object-contain"
          />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-cyan-bright">
              Portal de Experiencia del Cliente
            </p>
            <p className="text-lg font-bold text-white">{SITE.name}</p>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
