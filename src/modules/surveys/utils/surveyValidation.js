const REQUIRED_NUMERIC_FIELDS = [
  'q1_rating',
  'q2_rating',
  'q3_rating',
  'q4_rating',
  'q5_recommendation',
];

export function validateSurveyAnswers(answers) {
  const errors = {};

  REQUIRED_NUMERIC_FIELDS.forEach((field) => {
    if (!Number.isFinite(Number(answers[field]))) {
      errors[field] = 'Seleccione una calificacion.';
    }
  });

  ['q1_rating', 'q2_rating', 'q3_rating', 'q4_rating'].forEach((field) => {
    const value = Number(answers[field]);

    if (Number.isFinite(value) && (value < 1 || value > 5)) {
      errors[field] = 'Seleccione un valor entre 1 y 5.';
    }
  });

  const recommendation = Number(answers.q5_recommendation);
  if (Number.isFinite(recommendation) && (recommendation < 0 || recommendation > 10)) {
    errors.q5_recommendation = 'Seleccione un valor entre 0 y 10.';
  }

  return errors;
}

export function hasValidationErrors(errors) {
  return Object.keys(errors).length > 0;
}
