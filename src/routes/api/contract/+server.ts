import { json } from '@sveltejs/kit'
import { NETWORKS } from '$lib/config'
import axios from 'redaxios'
import { utils } from 'ethers'
import type { RequestHandler } from '@sveltejs/kit'
import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private'

const SOURCIFY_REPO_URL = 'https://repo.sourcify.dev'

import { createClient } from '@supabase/supabase-js'
import { getEtherscanApiKey } from '$lib/utils'

// Create a single supabase client for interacting with your database
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

export const POST = (async ({ request }) => {
  const body = await request.json()
  const network = body.network.toLowerCase() || 'mainnet'
  const address = body.address.toLowerCase()

  console.info(`Fetching data for 📝 contract at ${address} on ${network}`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await fetchCachedAbi(network, address)
  if (res.abi) {
    return json({
      abi: res.abi,
      name: res.name,
    })
  }

  try {
    const res = await axios.get(`https://anyabi.xyz/api/get-abi/${NETWORKS[network].chainId}/${address}`)
    if (res.data.abi) {
      console.log(`ABI for ${res.data.name} fetched from AnyABI. Caching...`)
      await cacheAbi(network, address, res.data.name, res.data.abi)
      return json({
        abi: res.data.abi,
        name: res.data.name,
      })
    }
  } catch (e) {
    console.log('Nothing found on AnyABI.')
  }

  return json({
    name: '',
    abi: [],
  })
}) satisfies RequestHandler

const fetchCachedAbi = async (network: string, address: string) => {
  const { data, error } = await supabase
    .from('contracts')
    .select()
    .eq('network', network)
    .eq('address', address)

  if (error) {
    console.error(error)
    return error
  }

  if (!data.length) {
    console.log('No cached ABI. Fetching from AnyABI...')
    return false
  }

  console.log(`ABI for ${data[0].name} fetched from cache.`)
  return { abi: data[0].abi, name: data[0].name }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cacheAbi = async (network: string, address: string, name: string, abi: any) => {
  const { error } = await supabase.from('contracts').insert([
    {
      network,
      address,
      name: name || '',
      abi,
    },
  ])

  if (error) {
    console.error(error)
  }
}
