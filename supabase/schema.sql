create table if not exists public.leads (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  whatsapp text not null,
  consent boolean not null default false,
  consent_at timestamptz not null default now(),
  consent_version text not null default 'destrava-2026-10',
  unsubscribed_at timestamptz,
  source text not null default 'destrava-landing',
  email_normalized text generated always as (lower(trim(email))) stored,
  created_at timestamptz not null default now()
);

alter table public.leads add column if not exists consent_at timestamptz not null default now();
alter table public.leads add column if not exists consent_version text not null default 'destrava-2026-10';
alter table public.leads add column if not exists unsubscribed_at timestamptz;
alter table public.leads add column if not exists email_normalized text generated always as (lower(trim(email))) stored;

create unique index if not exists leads_email_normalized_key
  on public.leads (email_normalized);

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon, authenticated;

drop policy if exists "Public can submit consenting leads" on public.leads;
create policy "Public can submit consenting leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (consent = true);
