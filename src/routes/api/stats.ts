import dotenv from 'dotenv'
import type { RequestHandler } from '@sveltejs/kit'
import { createClient } from '@supabase/supabase-js'

dotenv.config()

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_KEY'])

export const get: RequestHandler = async () => {
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

  return {
    body: {
      contractCount,
      diamondCount,
    },
  }
}
