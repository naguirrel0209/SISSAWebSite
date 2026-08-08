create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'survey_campaign_status') then
    create type public.survey_campaign_status as enum ('draft', 'active', 'completed', 'expired', 'cancelled');
  end if;

  if not exists (select 1 from pg_type where typname = 'survey_invitation_status') then
    create type public.survey_invitation_status as enum ('active', 'completed', 'expired', 'cancelled');
  end if;
end $$;

create table if not exists public.app_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'survey_admin',
  created_at timestamptz not null default now(),
  constraint app_admins_role_check check (role in ('survey_admin', 'owner'))
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  code text,
  contact_name text,
  contact_email text,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint clients_name_not_blank check (length(btrim(name)) > 0),
  constraint clients_code_unique unique (code)
);

create table if not exists public.survey_campaigns (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  period_year integer not null,
  period_month integer not null,
  starts_at timestamptz not null,
  expires_at timestamptz not null,
  status public.survey_campaign_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint survey_campaigns_name_not_blank check (length(btrim(name)) > 0),
  constraint survey_campaigns_period_month_check check (period_month between 1 and 12),
  constraint survey_campaigns_year_check check (period_year between 2000 and 2100),
  constraint survey_campaigns_dates_check check (expires_at > starts_at),
  constraint survey_campaigns_period_unique unique (period_year, period_month)
);

create table if not exists public.survey_invitations (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references public.survey_campaigns(id) on delete cascade,
  client_id uuid not null references public.clients(id) on delete cascade,
  token text not null,
  status public.survey_invitation_status not null default 'active',
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,
  completed_at timestamptz,
  constraint survey_invitations_token_unique unique (token),
  constraint survey_invitations_campaign_client_unique unique (campaign_id, client_id),
  constraint survey_invitations_token_entropy check (length(token) >= 48)
);

create table if not exists public.survey_responses (
  id uuid primary key default gen_random_uuid(),
  invitation_id uuid not null references public.survey_invitations(id) on delete cascade,
  q1_rating integer not null,
  q2_rating integer not null,
  q3_rating integer not null,
  q4_rating integer not null,
  q5_recommendation integer not null,
  problem_comment text,
  improvement_comment text,
  submitted_at timestamptz not null default now(),
  constraint survey_responses_invitation_unique unique (invitation_id),
  constraint survey_responses_q1_check check (q1_rating between 1 and 5),
  constraint survey_responses_q2_check check (q2_rating between 1 and 5),
  constraint survey_responses_q3_check check (q3_rating between 1 and 5),
  constraint survey_responses_q4_check check (q4_rating between 1 and 5),
  constraint survey_responses_q5_check check (q5_recommendation between 0 and 10)
);

create index if not exists clients_active_idx on public.clients(active);
create index if not exists survey_campaigns_period_idx on public.survey_campaigns(period_year, period_month);
create index if not exists survey_campaigns_status_idx on public.survey_campaigns(status);
create index if not exists survey_invitations_campaign_idx on public.survey_invitations(campaign_id);
create index if not exists survey_invitations_client_idx on public.survey_invitations(client_id);
create index if not exists survey_invitations_status_idx on public.survey_invitations(status);
create index if not exists survey_invitations_token_idx on public.survey_invitations(token);
create index if not exists survey_responses_submitted_at_idx on public.survey_responses(submitted_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists clients_set_updated_at on public.clients;
create trigger clients_set_updated_at
before update on public.clients
for each row execute function public.set_updated_at();

drop trigger if exists survey_campaigns_set_updated_at on public.survey_campaigns;
create trigger survey_campaigns_set_updated_at
before update on public.survey_campaigns
for each row execute function public.set_updated_at();

create or replace function public.is_survey_admin(p_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.app_admins
    where user_id = p_user_id
  );
$$;

create or replace function public.survey_period_label(p_year integer, p_month integer)
returns text
language sql
immutable
as $$
  select concat(
    case p_month
      when 1 then 'Enero'
      when 2 then 'Febrero'
      when 3 then 'Marzo'
      when 4 then 'Abril'
      when 5 then 'Mayo'
      when 6 then 'Junio'
      when 7 then 'Julio'
      when 8 then 'Agosto'
      when 9 then 'Septiembre'
      when 10 then 'Octubre'
      when 11 then 'Noviembre'
      when 12 then 'Diciembre'
      else 'Periodo'
    end,
    ' ',
    p_year
  );
$$;

create or replace function public.survey_get_by_token(p_token text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invitation public.survey_invitations%rowtype;
  v_campaign public.survey_campaigns%rowtype;
  v_period text;
begin
  select *
  into v_invitation
  from public.survey_invitations
  where token = p_token
  limit 1;

  if not found then
    return jsonb_build_object('valid', false, 'status', 'invalid', 'period', null);
  end if;

  select *
  into v_campaign
  from public.survey_campaigns
  where id = v_invitation.campaign_id;

  v_period := public.survey_period_label(v_campaign.period_year, v_campaign.period_month);

  if v_invitation.status = 'completed' then
    return jsonb_build_object('valid', true, 'status', 'completed', 'period', v_period);
  end if;

  if v_invitation.status = 'cancelled' or v_campaign.status = 'cancelled' then
    return jsonb_build_object('valid', true, 'status', 'cancelled', 'period', v_period);
  end if;

  if v_invitation.status = 'expired'
    or v_campaign.status = 'expired'
    or v_invitation.expires_at <= now()
    or v_campaign.expires_at <= now()
    or v_campaign.starts_at > now()
  then
    update public.survey_invitations
    set status = 'expired'
    where id = v_invitation.id and status = 'active';

    return jsonb_build_object('valid', true, 'status', 'expired', 'period', v_period);
  end if;

  if v_campaign.status <> 'active' then
    return jsonb_build_object('valid', true, 'status', 'cancelled', 'period', v_period);
  end if;

  return jsonb_build_object('valid', true, 'status', 'active', 'period', v_period);
end;
$$;

create or replace function public.survey_submit_response(
  p_token text,
  p_q1_rating integer,
  p_q2_rating integer,
  p_q3_rating integer,
  p_q4_rating integer,
  p_q5_recommendation integer,
  p_problem_comment text default null,
  p_improvement_comment text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invitation_id uuid;
begin
  if p_q1_rating not between 1 and 5
    or p_q2_rating not between 1 and 5
    or p_q3_rating not between 1 and 5
    or p_q4_rating not between 1 and 5
    or p_q5_recommendation not between 0 and 10
  then
    return jsonb_build_object('ok', false, 'status', 'invalid_answers');
  end if;

  update public.survey_invitations invitation
  set status = 'completed',
      completed_at = now()
  from public.survey_campaigns campaign
  where invitation.token = p_token
    and invitation.campaign_id = campaign.id
    and invitation.status = 'active'
    and campaign.status = 'active'
    and invitation.expires_at > now()
    and campaign.starts_at <= now()
    and campaign.expires_at > now()
  returning invitation.id into v_invitation_id;

  if v_invitation_id is null then
    return jsonb_build_object(
      'ok',
      false,
      'status',
      coalesce(public.survey_get_by_token(p_token)->>'status', 'invalid')
    );
  end if;

  insert into public.survey_responses (
    invitation_id,
    q1_rating,
    q2_rating,
    q3_rating,
    q4_rating,
    q5_recommendation,
    problem_comment,
    improvement_comment
  )
  values (
    v_invitation_id,
    p_q1_rating,
    p_q2_rating,
    p_q3_rating,
    p_q4_rating,
    p_q5_recommendation,
    nullif(btrim(p_problem_comment), ''),
    nullif(btrim(p_improvement_comment), '')
  );

  return jsonb_build_object('ok', true, 'status', 'completed');
exception
  when unique_violation then
    return jsonb_build_object('ok', false, 'status', 'completed');
  when check_violation then
    return jsonb_build_object('ok', false, 'status', 'invalid_answers');
end;
$$;

create or replace function public.admin_generate_survey_invitations(
  p_campaign_id uuid,
  p_client_ids uuid[]
)
returns table (
  invitation_id uuid,
  client_id uuid,
  client_name text,
  client_code text,
  token text,
  status public.survey_invitation_status,
  created_at timestamptz,
  expires_at timestamptz,
  completed_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_survey_admin(auth.uid()) then
    raise exception 'not authorized';
  end if;

  return query
  with campaign as (
    select id, expires_at
    from public.survey_campaigns
    where id = p_campaign_id
      and status in ('draft', 'active')
  ),
  selected_clients as (
    select c.id, c.name
    from public.clients c
    where c.id = any(p_client_ids)
      and c.active = true
  ),
  inserted as (
    insert into public.survey_invitations (campaign_id, client_id, token, expires_at)
    select
      campaign.id,
      selected_clients.id,
      encode(gen_random_bytes(32), 'hex'),
      campaign.expires_at
    from campaign
    cross join selected_clients
    on conflict (campaign_id, client_id) do nothing
    returning id, client_id, token, status
  )
  select
    invitation.id,
    client.id,
    client.name,
    client.code,
    invitation.token,
    invitation.status,
    invitation.created_at,
    invitation.expires_at,
    invitation.completed_at
  from public.survey_invitations invitation
  join public.clients client on client.id = invitation.client_id
  where invitation.campaign_id = p_campaign_id
    and invitation.client_id = any(p_client_ids)
  order by client.name;
end;
$$;

alter table public.app_admins enable row level security;
alter table public.clients enable row level security;
alter table public.survey_campaigns enable row level security;
alter table public.survey_invitations enable row level security;
alter table public.survey_responses enable row level security;

drop policy if exists app_admins_select_admins on public.app_admins;
create policy app_admins_select_admins
on public.app_admins for select
to authenticated
using (public.is_survey_admin(auth.uid()));

drop policy if exists clients_admin_all on public.clients;
create policy clients_admin_all
on public.clients for all
to authenticated
using (public.is_survey_admin(auth.uid()))
with check (public.is_survey_admin(auth.uid()));

drop policy if exists survey_campaigns_admin_all on public.survey_campaigns;
create policy survey_campaigns_admin_all
on public.survey_campaigns for all
to authenticated
using (public.is_survey_admin(auth.uid()))
with check (public.is_survey_admin(auth.uid()));

drop policy if exists survey_invitations_admin_all on public.survey_invitations;
create policy survey_invitations_admin_all
on public.survey_invitations for all
to authenticated
using (public.is_survey_admin(auth.uid()))
with check (public.is_survey_admin(auth.uid()));

drop policy if exists survey_responses_admin_all on public.survey_responses;
create policy survey_responses_admin_all
on public.survey_responses for all
to authenticated
using (public.is_survey_admin(auth.uid()))
with check (public.is_survey_admin(auth.uid()));

grant usage on schema public to anon, authenticated;
grant select, insert, update on public.clients to authenticated;
grant select, insert, update on public.survey_campaigns to authenticated;
grant select, insert, update on public.survey_invitations to authenticated;
grant select on public.survey_responses to authenticated;
grant select on public.app_admins to authenticated;

revoke all on function public.survey_get_by_token(text) from public;
revoke all on function public.survey_submit_response(text, integer, integer, integer, integer, integer, text, text) from public;
revoke all on function public.admin_generate_survey_invitations(uuid, uuid[]) from public;

grant execute on function public.survey_get_by_token(text) to anon, authenticated;
grant execute on function public.survey_submit_response(text, integer, integer, integer, integer, integer, text, text) to anon, authenticated;
grant execute on function public.admin_generate_survey_invitations(uuid, uuid[]) to authenticated;
