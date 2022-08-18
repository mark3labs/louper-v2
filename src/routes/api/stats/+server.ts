import { json as json$1 } from '@sveltejs/kit';
import dotenv from 'dotenv'
import type { RequestHandler } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'
import axios from 'redaxios'

dotenv.config()

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_KEY'])
const SA_KEY = process.env['SIMPLE_ANALYTICS_API_KEY']

export const GET: RequestHandler = async () => {
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

  ;({ error, count } = await supabase
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

  return json$1({
  contractCount,
  diamondCount,
  pageViews,
})
}
