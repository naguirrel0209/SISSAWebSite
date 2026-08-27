import type { ResponseRecord, SurveyInvitation, SurveyResponse } from '@/types/sis';

export function getResponseAverage(response: Pick<SurveyResponse, 'answers'>): number {
  return response.answers.reduce((total, answer) => total + answer, 0) / response.answers.length;
}

export function getRatingLabel(average: number): 'Excelente' | 'Satisfactorio' | 'Atención' | 'Crítico' {
  if (average >= 4.5) return 'Excelente';
  if (average >= 3.5) return 'Satisfactorio';
  if (average >= 2.5) return 'Atención';
  return 'Crítico';
}

export function getDashboardMetrics(invitations: SurveyInvitation[], responses: SurveyResponse[]) {
  const created = invitations.length;
  const completed = invitations.filter((invitation) => invitation.status === 'completed').length;
  const pending = invitations.filter((invitation) => invitation.status === 'pending').length;
  const followUps = responses.filter((response) => response.contactRequested).length;
  const overallAverage = responses.length
    ? responses.reduce((total, response) => total + getResponseAverage(response), 0) / responses.length
    : 0;
  const responseRate = created ? (completed / created) * 100 : 0;

  return { created, completed, pending, followUps, overallAverage, responseRate };
}

export function getRatingDistribution(responses: SurveyResponse[]) {
  const counts = new Map<number, number>([1, 2, 3, 4, 5].map((rating) => [rating, 0]));

  responses.forEach((response) => {
    const rounded = Math.max(1, Math.min(5, Math.round(getResponseAverage(response))));
    counts.set(rounded, (counts.get(rounded) ?? 0) + 1);
  });

  return [5, 4, 3, 2, 1].map((rating) => {
    const count = counts.get(rating) ?? 0;
    return {
      rating,
      count,
      percent: responses.length ? (count / responses.length) * 100 : 0,
    };
  });
}

export function getAttentionRecords(records: ResponseRecord[]): ResponseRecord[] {
  return records
    .filter((record) => record.contactRequested || record.average < 3)
    .sort((first, second) => {
      if (Number(second.contactRequested) !== Number(first.contactRequested)) {
        return Number(second.contactRequested) - Number(first.contactRequested);
      }
      return first.average - second.average;
    });
}
