import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { createClient, type PostgrestError } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private'

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const POST = (async ({ request }) => {
  const body = await request.json()
  const network = body.network.toLowerCase()
  const address = body.address.toLowerCase()
  const name = body.name

  let record = {
    network,
    address,
    name: name,
    hits: 1,
  }

  let { data, error } = await supabase
    .from('leaderboard')
    .select()
    .eq('network', network)
    .eq('address', address)

  if (error) {
    console.error(error)
  }

  if (data && data.length) {
    record = data[0]
    record.hits += 1
  }

  ; ({ data, error } = await supabase.from('leaderboard').upsert(record))
  if (error) {
    console.error(error)
  }

  return new Response('OK')
}) satisfies RequestHandler

export const GET = (async ({ url }) => {
  let data: Record<string, unknown>[] = []
  let error: PostgrestError | null = null

  if (url.searchParams.get('ranked')) {
    ; ({ data, error } = await supabase
      .from('leaderboard')
      .select()
      .order('hits', { ascending: false })
      .limit(10))
  } else {
    ; ({ data, error } = await supabase
      .from('leaderboard')
      .select()
      .order('updated_at', { ascending: false })
      .limit(10))
  }

  if (error) {
    console.error(error)
  }

  let diamonds = []
  if (data && data.length) {
    diamonds = data
  }

  return json({
    diamonds,
  })
}) satisfies RequestHandler
