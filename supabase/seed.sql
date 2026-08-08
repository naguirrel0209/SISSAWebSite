insert into public.clients (name, code, contact_name, contact_email, active)
values ('Cliente Demo SIS', 'DEMO-SIS', null, null, true)
on conflict (code) do nothing;

insert into public.survey_campaigns (
  name,
  period_year,
  period_month,
  starts_at,
  expires_at,
  status
)
select
  'Encuesta de satisfaccion - Agosto 2026',
  2026,
  8,
  '2026-08-01 00:00:00+00',
  '2026-09-01 00:00:00+00',
  'active'
where not exists (
  select 1
  from public.survey_campaigns
  where period_year = 2026 and period_month = 8 and name = 'Encuesta de satisfaccion - Agosto 2026'
);
