export const SURVEY_QUESTIONS = [
  {
    id: 'q1_rating',
    number: 1,
    text: 'Como calificaria la calidad general del servicio de seguridad que recibe de Corporacion SIS?',
    scale: [
      { value: 1, label: 'Muy insatisfecho' },
      { value: 2, label: 'Insatisfecho' },
      { value: 3, label: 'Neutral' },
      { value: 4, label: 'Satisfecho' },
      { value: 5, label: 'Muy satisfecho' },
    ],
  },
  {
    id: 'q2_rating',
    number: 2,
    text: 'Como calificaria el desempeno, presentacion y profesionalismo del personal asignado a su servicio?',
    scale: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
    ],
  },
  {
    id: 'q3_rating',
    number: 3,
    text: 'Como calificaria nuestra capacidad de respuesta ante solicitudes, novedades o situaciones relacionadas con el servicio?',
    scale: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
    ],
  },
  {
    id: 'q4_rating',
    number: 4,
    text: 'Que tan satisfecho se encuentra con la comunicacion y seguimiento brindado por Corporacion SIS?',
    scale: [
      { value: 1, label: '1' },
      { value: 2, label: '2' },
      { value: 3, label: '3' },
      { value: 4, label: '4' },
      { value: 5, label: '5' },
    ],
  },
  {
    id: 'q5_recommendation',
    number: 5,
    text: 'Considerando su experiencia general, que tan probable es que recomiende los servicios de Corporacion SIS?',
    scale: Array.from({ length: 11 }, (_, value) => ({ value, label: String(value) })),
    helper: '0 - Nada probable | 10 - Totalmente probable',
  },
];

export const INITIAL_SURVEY_ANSWERS = {
  q1_rating: null,
  q2_rating: null,
  q3_rating: null,
  q4_rating: null,
  q5_recommendation: null,
  problem_comment: '',
  improvement_comment: '',
};
