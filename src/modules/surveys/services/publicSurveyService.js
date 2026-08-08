import { requireSupabase } from './supabaseClient.js';

function normalizeSafeError(status = 'unavailable') {
  return {
    valid: false,
    status,
    period: null,
  };
}

export async function getSurveyByToken(token) {
  if (!token) return normalizeSafeError('invalid');

  try {
    const { data, error } = await requireSupabase().rpc('survey_get_by_token', {
      p_token: token,
    });

    if (error) return normalizeSafeError('unavailable');

    return data ?? normalizeSafeError('invalid');
  } catch {
    return normalizeSafeError('configuration_error');
  }
}

export async function submitSurvey(token, answers) {
  try {
    const { data, error } = await requireSupabase().rpc('survey_submit_response', {
      p_token: token,
      p_q1_rating: Number(answers.q1_rating),
      p_q2_rating: Number(answers.q2_rating),
      p_q3_rating: Number(answers.q3_rating),
      p_q4_rating: Number(answers.q4_rating),
      p_q5_recommendation: Number(answers.q5_recommendation),
      p_problem_comment: answers.problem_comment?.trim() || null,
      p_improvement_comment: answers.improvement_comment?.trim() || null,
    });

    if (error) {
      return { ok: false, status: 'unavailable' };
    }

    return data ?? { ok: false, status: 'unavailable' };
  } catch {
    return { ok: false, status: 'configuration_error' };
  }
}
