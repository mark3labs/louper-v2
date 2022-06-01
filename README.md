# Louper - The Ethereum Diamond Inspector

A simple UI for viewing details about EVM smart contracts using EIP-2535 (Diamond Standard)

**Features:**

- View diamond details include all facets and their methods
- Read from facet methods
- Write to facet methods
- **MIT License** completely open source to do with as you please

## Development

### Prerequisites

You will need a Subabase local db instance. Follow the [instructions](https://supabase.com/docs/guides/local-development) to get set up.

Run:
```sh
supabase init
supabase start
supabase db reset
```

You should now have a working DB.

Run:
```sh
cp .env.example .env
supabase status
```

Copy the `service_role key` and paste that as the value of `SUPABASE_KEY` in `.env`

Run:

```sh
pnpm run dev
```

You should now have a working dev environment.

## License

MIT License
