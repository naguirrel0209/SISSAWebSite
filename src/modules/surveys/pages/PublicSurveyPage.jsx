import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { useParams } from 'react-router-dom';
import Seo from '../../../components/layout/Seo.jsx';
import RouteLoader from '../../../components/ui/RouteLoader.jsx';
import { SITE } from '../../../constants/site.js';
import RatingGroup from '../components/RatingGroup.jsx';
import SurveyPortalShell from '../components/SurveyPortalShell.jsx';
import SurveyStatusScreen from '../components/SurveyStatusScreen.jsx';
import { INITIAL_SURVEY_ANSWERS, SURVEY_QUESTIONS } from '../constants/questions.js';
import { getSurveyByToken, submitSurvey } from '../services/publicSurveyService.js';
import { hasValidationErrors, validateSurveyAnswers } from '../utils/surveyValidation.js';

export default function PublicSurveyPage() {
  const { token } = useParams();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState(INITIAL_SURVEY_ANSWERS);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const answeredCount = SURVEY_QUESTIONS.filter((question) => Number.isFinite(Number(answers[question.id]))).length;
  const progress = Math.round((answeredCount / SURVEY_QUESTIONS.length) * 100);

  useEffect(() => {
    let mounted = true;

    setLoading(true);
    getSurveyByToken(token).then((result) => {
      if (!mounted) return;
      setSurvey(result);
      setLoading(false);
    });

    return () => {
      mounted = false;
    };
  }, [token]);

  const handleRatingChange = (field, value) => {
    setAnswers((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleTextChange = (event) => {
    const { name, value } = event.target;
    setAnswers((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateSurveyAnswers(answers);
    setErrors(nextErrors);

    if (hasValidationErrors(nextErrors)) {
      document.getElementById('survey-errors')?.focus();
      return;
    }

    setSubmitting(true);
    const result = await submitSurvey(token, answers);
    setSubmitting(false);

    if (result.ok) {
      setSubmitStatus('success');
      return;
    }

    setSubmitStatus(result.status ?? 'unavailable');
  };

  if (loading) {
    return (
      <SurveyPortalShell compact>
        <Seo
          title={`Encuesta de satisfaccion | ${SITE.name}`}
          description="Portal privado de experiencia del cliente de Corporacion SIS."
        />
        <div className="glass-panel mx-auto flex w-full max-w-xl flex-col items-center p-8 text-center">
          <RouteLoader />
          <p className="mt-5 text-sm font-semibold text-muted-text">Verificando enlace...</p>
        </div>
      </SurveyPortalShell>
    );
  }

  if (submitStatus) return <SurveyStatusScreen status={submitStatus} />;

  if (!survey?.valid || survey.status !== 'active') {
    return <SurveyStatusScreen status={survey?.status ?? 'invalid'} />;
  }

  return (
    <SurveyPortalShell>
      <Seo
        title={`Encuesta de satisfaccion | ${SITE.name}`}
        description="Portal privado de experiencia del cliente de Corporacion SIS."
      />
      <section className="glass-panel mb-5 p-5 sm:p-7">
        <p className="eyebrow">Tiempo estimado: menos de 2 minutos</p>
        <h1 className="mt-5 text-3xl font-bold text-white sm:text-4xl">Encuesta de satisfaccion</h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-text">
          Estimado cliente: su opinion nos permite fortalecer nuestros procesos y continuar mejorando la
          calidad de nuestros servicios de seguridad integral.
        </p>
        {survey.period && <p className="mt-4 text-sm font-semibold text-slate-200">Periodo: {survey.period}</p>}
        <div className="mt-6" aria-label={`Progreso de encuesta ${progress}%`}>
          <div className="mb-2 flex justify-between gap-4 text-sm">
            <span className="font-semibold text-white">Progreso</span>
            <span className="text-muted-text">{answeredCount} de {SURVEY_QUESTIONS.length}</span>
          </div>
          <div className="h-3 overflow-hidden rounded-md bg-white/[0.07]">
            <div className="h-full rounded-md bg-primary-cyan-bright transition-all duration-300" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <form className="space-y-4" onSubmit={handleSubmit} noValidate>
        {hasValidationErrors(errors) && (
          <div
            id="survey-errors"
            tabIndex="-1"
            className="rounded-md border border-danger/30 bg-danger/10 px-4 py-3 text-sm font-semibold text-red-100"
            role="alert"
          >
            Complete las cinco calificaciones obligatorias antes de enviar.
          </div>
        )}

        {SURVEY_QUESTIONS.map((question) => (
          <RatingGroup
            key={question.id}
            question={question}
            value={answers[question.id]}
            error={errors[question.id]}
            onChange={handleRatingChange}
          />
        ))}

        <section className="glass-panel p-4 sm:p-5">
          <label htmlFor="problem_comment" className="text-base font-semibold text-white">
            Ha tenido durante este periodo algun problema, inconveniente o situacion relacionada con el servicio
            que considere importante comunicarnos?
          </label>
          <textarea
            id="problem_comment"
            name="problem_comment"
            rows="4"
            value={answers.problem_comment}
            onChange={handleTextChange}
            className="mt-3 w-full border px-4 py-3"
            placeholder="Puede describir brevemente la situacion. Si no ha tenido inconvenientes, puede dejar este espacio en blanco."
          />
        </section>

        <section className="glass-panel p-4 sm:p-5">
          <label htmlFor="improvement_comment" className="text-base font-semibold text-white">
            Tiene algun comentario, sugerencia o recomendacion que nos permita mejorar nuestro servicio?
          </label>
          <textarea
            id="improvement_comment"
            name="improvement_comment"
            rows="4"
            value={answers.improvement_comment}
            onChange={handleTextChange}
            className="mt-3 w-full border px-4 py-3"
            placeholder="Comparta cualquier observacion que considere importante."
          />
        </section>

        <div className="glass-panel sticky bottom-3 z-10 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-text" aria-live="polite">
            {submitting ? 'Enviando encuesta...' : `${answeredCount} de ${SURVEY_QUESTIONS.length} calificaciones completadas.`}
          </p>
          <button type="submit" className="btn-primary w-full sm:w-auto" disabled={submitting}>
            <Send className="h-4 w-4" aria-hidden="true" />
            {submitting ? 'Enviando...' : 'Enviar encuesta'}
          </button>
        </div>
      </form>
    </SurveyPortalShell>
  );
}
