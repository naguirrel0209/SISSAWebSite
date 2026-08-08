export default function RatingGroup({ question, value, error, onChange }) {
  const isRecommendation = question.id === 'q5_recommendation';
  const errorId = `${question.id}-error`;

  return (
    <fieldset className="glass-panel p-4 transition duration-200 sm:p-5" aria-describedby={error ? errorId : undefined}>
      <legend className="text-base font-semibold leading-7 text-white">
        <span className="mr-2 text-primary-cyan-bright">{question.number}.</span>
        {question.text}
      </legend>

      <div
        className={`mt-4 grid gap-2 ${
          isRecommendation ? 'grid-cols-4 sm:grid-cols-6 lg:grid-cols-11' : 'grid-cols-1 sm:grid-cols-5'
        }`}
      >
        {question.scale.map((option) => {
          const checked = Number(value) === option.value;

          return (
            <label
              key={option.value}
              className={`flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-center text-sm font-semibold transition ${
                checked
                  ? 'border-primary-cyan-bright bg-primary-cyan text-white shadow-cyan-soft'
                  : 'border-border-cyber bg-white/[0.035] text-slate-200 hover:border-primary-cyan-bright hover:bg-white/[0.07]'
              }`}
            >
              <input
                type="radio"
                name={question.id}
                value={option.value}
                checked={checked}
                required
                className="sr-only"
                onChange={() => onChange(question.id, option.value)}
              />
              <span>{option.value}</span>
              {!isRecommendation && <span className="hidden sm:inline">{option.label}</span>}
              {!isRecommendation && question.number === 1 && <span className="sm:hidden">{option.label}</span>}
            </label>
          );
        })}
      </div>

      {question.helper && <p className="mt-3 text-sm text-muted-text">{question.helper}</p>}
      {error && (
        <p id={errorId} className="mt-3 text-sm font-semibold text-danger" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  );
}
