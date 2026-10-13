create table if not exists public.leads (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  whatsapp text not null,
  consent boolean not null default false,
  source text not null default 'destrava-landing',
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;

revoke all on table public.leads from anon, authenticated;
grant insert on table public.leads to anon, authenticated;

drop policy if exists "Public can submit consenting leads" on public.leads;
create policy "Public can submit consenting leads"
  on public.leads
  for insert
  to anon, authenticated
  with check (consent = true);
