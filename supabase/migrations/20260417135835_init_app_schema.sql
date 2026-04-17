-- Initial app schema: profile per auth user + skeleton tables for wallets, policies, transactions.
-- Strict RLS: every row scoped to its `user_id`. Service role bypasses (server-side only).
-- The Next.js API still reads from `data/*` mocks; this migration is the data backbone for v1.1.

create extension if not exists "pgcrypto";

------------------------------------------------------------------------------
-- profiles : 1:1 with auth.users, holds display data we don't want in JWT.
------------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  avatar_url  text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

------------------------------------------------------------------------------
-- wallets / policies / transactions : skeleton tables (mirrors data/* shapes).
------------------------------------------------------------------------------
create table if not exists public.wallets (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users(id) on delete cascade,
  name           text not null,
  type           text not null,
  network        text not null,
  agent          text not null,
  daily_cap_usd  numeric not null check (daily_cap_usd >= 0),
  policy_id      uuid,
  policy_name    text,
  parent_id      uuid references public.wallets(id) on delete set null,
  tags           text[] not null default '{}',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);
create index if not exists wallets_user_id_idx on public.wallets(user_id);

create table if not exists public.policies (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  name         text not null,
  description  text not null,
  condition    text not null,
  severity     text not null check (severity in ('low','medium','high','critical')),
  status       text not null default 'active' check (status in ('active','draft','archived')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index if not exists policies_user_id_idx on public.policies(user_id);

create table if not exists public.transactions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  wallet_id    uuid not null references public.wallets(id) on delete cascade,
  status       text not null check (status in ('pending','approved','blocked','executed','reverted')),
  amount_usd   numeric not null,
  counterparty text,
  memo         text,
  created_at   timestamptz not null default now()
);
create index if not exists transactions_user_id_idx on public.transactions(user_id);
create index if not exists transactions_wallet_id_idx on public.transactions(wallet_id);

------------------------------------------------------------------------------
-- RLS : owners only (auth.uid() = user_id). Service role bypasses RLS.
------------------------------------------------------------------------------
alter table public.profiles      enable row level security;
alter table public.wallets       enable row level security;
alter table public.policies      enable row level security;
alter table public.transactions  enable row level security;

drop policy if exists "profiles self select" on public.profiles;
create policy "profiles self select" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles
  for update using (auth.uid() = id) with check (auth.uid() = id);

-- Generic owner-RLS for the 3 app tables.
do $$
declare t text;
begin
  foreach t in array array['wallets','policies','transactions'] loop
    execute format('drop policy if exists "%1$s owner select" on public.%1$s', t);
    execute format(
      'create policy "%1$s owner select" on public.%1$s for select using (auth.uid() = user_id)',
      t
    );
    execute format('drop policy if exists "%1$s owner insert" on public.%1$s', t);
    execute format(
      'create policy "%1$s owner insert" on public.%1$s for insert with check (auth.uid() = user_id)',
      t
    );
    execute format('drop policy if exists "%1$s owner update" on public.%1$s', t);
    execute format(
      'create policy "%1$s owner update" on public.%1$s for update using (auth.uid() = user_id) with check (auth.uid() = user_id)',
      t
    );
    execute format('drop policy if exists "%1$s owner delete" on public.%1$s', t);
    execute format(
      'create policy "%1$s owner delete" on public.%1$s for delete using (auth.uid() = user_id)',
      t
    );
  end loop;
end$$;

------------------------------------------------------------------------------
-- Touch updated_at on UPDATE.
------------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['profiles','wallets','policies'] loop
    execute format('drop trigger if exists set_updated_at on public.%I', t);
    execute format(
      'create trigger set_updated_at before update on public.%I for each row execute function public.set_updated_at()',
      t
    );
  end loop;
end$$;
