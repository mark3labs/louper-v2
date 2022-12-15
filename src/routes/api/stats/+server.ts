import { json } from '@sveltejs/kit'
import type { RequestHandler } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import axios from 'redaxios'
import { SUPABASE_URL, SUPABASE_KEY, SIMPLE_ANALYTICS_API_KEY } from '$env/static/private'

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
const SA_KEY = SIMPLE_ANALYTICS_API_KEY

export const GET = (async () => {
  let { error, count } = await supabase
    .from('contracts')
    .select('name', { count: 'exact', head: true })

  if (error) {
    console.error(error)
  }

  let contractCount = 0
  if (count) {
    contractCount = count
  }

  ; ({ error, count } = await supabase
    .from('leaderboard')
    .select('name', { count: 'exact', head: true }))

  if (error) {
    console.error(error)
  }

  let diamondCount = 0
  if (count) {
    diamondCount = count
  }

  const res = await axios.get(
    'https://simpleanalytics.com/louper.dev.json?version=5&fields=pageviews&end=today',
    {
      headers: {
        'Api-key': SA_KEY,
      },
    },
  )

  let pageViews = 0
  if (res.data) {
    pageViews = res.data.pageviews
  }

  return json({
    contractCount,
    diamondCount,
    pageViews,
  })
}) satisfies RequestHandler
