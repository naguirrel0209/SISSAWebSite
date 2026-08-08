export function calculateSatisfactionAverage(response) {
  const values = [
    response?.q1_rating,
    response?.q2_rating,
    response?.q3_rating,
    response?.q4_rating,
  ].filter((value) => Number.isFinite(Number(value)));

  if (!values.length) return null;

  const total = values.reduce((sum, value) => sum + Number(value), 0);
  return Number((total / values.length).toFixed(2));
}

export function getRecommendationSegment(score) {
  const value = Number(score);

  if (!Number.isFinite(value)) return 'sin_dato';
  if (value >= 9) return 'promotor';
  if (value >= 7) return 'pasivo';
  return 'detractor';
}

export function calculateNps(responses) {
  const scored = responses
    .map((response) => Number(response?.q5_recommendation))
    .filter((score) => Number.isFinite(score));

  if (!scored.length) return null;

  const promoters = scored.filter((score) => score >= 9).length;
  const detractors = scored.filter((score) => score <= 6).length;

  return Math.round(((promoters / scored.length) - (detractors / scored.length)) * 100);
}

export function calculateResponseStats(rows) {
  const responses = rows.map((row) => row.response).filter(Boolean);
  const averages = responses
    .map(calculateSatisfactionAverage)
    .filter((value) => Number.isFinite(Number(value)));
  const totalAverage = averages.length
    ? Number((averages.reduce((sum, value) => sum + Number(value), 0) / averages.length).toFixed(2))
    : null;
  const responded = responses.length;
  const sent = rows.length;
  const pending = rows.filter((row) => row.status === 'active' && !row.response).length;
  const responseRate = sent ? Math.round((responded / sent) * 100) : 0;
  const problemReports = responses.filter((response) => response.problem_comment?.trim()).length;

  return {
    sent,
    responded,
    pending,
    responseRate,
    totalAverage,
    nps: calculateNps(responses),
    followUp: rows.filter((row) => row.requiresFollowUp).length,
    problemReports,
  };
}

export function requiresFollowUp(response) {
  if (!response) return false;

  const lowRating = [
    response.q1_rating,
    response.q2_rating,
    response.q3_rating,
    response.q4_rating,
  ].some((value) => Number(value) <= 2);

  const lowRecommendation = Number(response.q5_recommendation) <= 6;
  const hasProblem = Boolean(response.problem_comment?.trim());

  return lowRating || lowRecommendation || hasProblem;
}

export function formatMonthYear(year, month) {
  if (!year || !month) return 'Periodo no definido';

  return new Intl.DateTimeFormat('es-GT', {
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(Number(year), Number(month) - 1, 1)));
}

export function formatDateTime(value) {
  if (!value) return '-';

  return new Date(value).toLocaleString('es-GT', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });
}

export function formatDate(value) {
  if (!value) return '-';

  return new Date(value).toLocaleDateString('es-GT', {
    dateStyle: 'medium',
  });
}

export function normalizeResponseRows(invitations) {
  return invitations.map((invitation) => {
    const response = Array.isArray(invitation.survey_responses)
      ? invitation.survey_responses[0]
      : invitation.survey_responses;

    return {
      ...invitation,
      response: response ?? null,
      average: calculateSatisfactionAverage(response),
      requiresFollowUp: requiresFollowUp(response),
      recommendationSegment: getRecommendationSegment(response?.q5_recommendation),
    };
  });
}

export function getMonthlySeries(rows) {
  const months = new Map();

  rows.forEach((row) => {
    const campaign = row.survey_campaigns;
    if (!campaign) return;

    const key = `${campaign.period_year}-${String(campaign.period_month).padStart(2, '0')}`;
    const existing = months.get(key) ?? {
      key,
      label: formatMonthYear(campaign.period_year, campaign.period_month),
      sent: 0,
      responded: 0,
      averageValues: [],
      npsResponses: [],
    };

    existing.sent += 1;

    if (row.response) {
      existing.responded += 1;
      const average = calculateSatisfactionAverage(row.response);
      if (Number.isFinite(Number(average))) existing.averageValues.push(Number(average));
      existing.npsResponses.push(row.response);
    }

    months.set(key, existing);
  });

  return Array.from(months.values())
    .sort((a, b) => a.key.localeCompare(b.key))
    .map((month) => ({
      ...month,
      average: month.averageValues.length
        ? Number((month.averageValues.reduce((sum, value) => sum + value, 0) / month.averageValues.length).toFixed(2))
        : null,
      nps: calculateNps(month.npsResponses),
    }));
}

export function getRatingDistribution(rows) {
  const distribution = [1, 2, 3, 4, 5].map((score) => ({ score, count: 0 }));

  rows.forEach((row) => {
    if (!row.response) return;

    ['q1_rating', 'q2_rating', 'q3_rating', 'q4_rating'].forEach((field) => {
      const value = Number(row.response[field]);
      const bucket = distribution.find((item) => item.score === value);
      if (bucket) bucket.count += 1;
    });
  });

  return distribution;
}
