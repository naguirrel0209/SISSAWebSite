import { requireSupabase, supabase } from './supabaseClient.js';

const CLIENT_FIELDS = 'id,name,code,contact_name,contact_email,active,created_at,updated_at';
const CAMPAIGN_FIELDS = 'id,name,period_year,period_month,starts_at,expires_at,status,created_at,updated_at';

export function onAuthStateChange(callback) {
  if (!supabase) return { unsubscribe: () => {} };

  const { data } = supabase.auth.onAuthStateChange((_event, session) => callback(session));
  return data.subscription;
}

export async function getCurrentSession() {
  const { data, error } = await requireSupabase().auth.getSession();
  if (error) return null;
  return data.session;
}

export async function signInAdmin(email, password) {
  const { data, error } = await requireSupabase().auth.signInWithPassword({ email, password });

  if (error) {
    return { ok: false, message: 'No fue posible iniciar sesion con esas credenciales.' };
  }

  return { ok: true, session: data.session };
}

export async function signOutAdmin() {
  await requireSupabase().auth.signOut();
}

export async function listClients() {
  const { data, error } = await requireSupabase()
    .from('clients')
    .select(CLIENT_FIELDS)
    .order('name', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function saveClient(client) {
  const payload = {
    name: client.name.trim(),
    code: client.code?.trim() || null,
    contact_name: client.contact_name?.trim() || null,
    contact_email: client.contact_email?.trim() || null,
    active: Boolean(client.active),
  };

  const query = client.id
    ? requireSupabase().from('clients').update(payload).eq('id', client.id).select(CLIENT_FIELDS).single()
    : requireSupabase().from('clients').insert(payload).select(CLIENT_FIELDS).single();

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function setClientActive(clientId, active) {
  const { error } = await requireSupabase()
    .from('clients')
    .update({ active })
    .eq('id', clientId);

  if (error) throw error;
}

export async function deactivateClient(clientId) {
  return setClientActive(clientId, false);
}

export async function listCampaigns() {
  const { data, error } = await requireSupabase()
    .from('survey_campaigns')
    .select(CAMPAIGN_FIELDS)
    .order('period_year', { ascending: false })
    .order('period_month', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function createCampaign(campaign) {
  return saveCampaign(campaign);
}

export async function saveCampaign(campaign) {
  const payload = {
    name: campaign.name.trim(),
    period_year: Number(campaign.period_year),
    period_month: Number(campaign.period_month),
    starts_at: campaign.starts_at,
    expires_at: campaign.expires_at,
    status: campaign.status,
  };

  const query = campaign.id
    ? requireSupabase()
        .from('survey_campaigns')
        .update(payload)
        .eq('id', campaign.id)
        .select(CAMPAIGN_FIELDS)
        .single()
    : requireSupabase()
        .from('survey_campaigns')
        .insert(payload)
        .select(CAMPAIGN_FIELDS)
        .single();

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function setCampaignStatus(campaignId, status) {
  const { error } = await requireSupabase()
    .from('survey_campaigns')
    .update({ status })
    .eq('id', campaignId);

  if (error) throw error;
}

export async function generateSurveyInvitations(campaignId, clientIds) {
  const { data, error } = await requireSupabase().rpc('admin_generate_survey_invitations', {
    p_campaign_id: campaignId,
    p_client_ids: clientIds,
  });

  if (error) throw error;
  return data ?? [];
}

export async function listInvitationsWithResponses() {
  const { data, error } = await requireSupabase()
    .from('survey_invitations')
    .select(
      `
        id,
        token,
        status,
        created_at,
        expires_at,
        completed_at,
        clients:client_id(id,name,code,contact_email,active),
        survey_campaigns:campaign_id(id,name,period_year,period_month,starts_at,expires_at,status),
        survey_responses(
          id,
          q1_rating,
          q2_rating,
          q3_rating,
          q4_rating,
          q5_recommendation,
          problem_comment,
          improvement_comment,
          submitted_at
        )
      `,
    )
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function listInvitationLinks(campaignId) {
  let query = requireSupabase()
    .from('survey_invitations')
    .select(
      `
        id,
        token,
        status,
        created_at,
        expires_at,
        completed_at,
        clients:client_id(id,name,code),
        survey_campaigns:campaign_id(id,name,period_year,period_month,status)
      `,
    )
    .order('created_at', { ascending: false });

  if (campaignId) {
    query = query.eq('campaign_id', campaignId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data ?? [];
}

export async function getDashboardData() {
  const invitations = await listInvitationsWithResponses();
  return invitations;
}
