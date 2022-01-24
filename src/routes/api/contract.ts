import { NETWORKS } from '$lib/config'
import axios from 'redaxios'
import type { RequestHandler } from '@sveltejs/kit'

import dotenv from 'dotenv'

dotenv.config()

import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_ANON_KEY'])

export const post: RequestHandler<void, { network: string; address: string }> = async ({
  request,
}) => {
  const body = await request.json()
  const network = body.network || 'mainnet'
  const address = body.address

  let API_KEY

  switch (network) {
    case 'polygon':
      API_KEY = process.env['POLYGONSCAN_API_KEY']
      break
    case 'binance':
      API_KEY = process.env['BSCSCAN_API_KEY']
      break
    default:
      API_KEY = process.env['VITE_ETHERSCAN_API_KEY']
  }

  console.info(`Fetching data for 📝 contract at ${address} on ${network}`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await fetchCachedAbi(network, address)
  if (res.abi) {
    return {
      body: {
        abi: res.abi,
        name: res.name,
      },
    }
  }

  const apiUrl = NETWORKS[network].explorerApiUrl
  const fullUrl = `${apiUrl}?module=contract&action=getsourcecode&address=${address}&apikey=${API_KEY}`
  console.log(fullUrl)
  const resp = await axios.get(fullUrl)
  const abi = resp.data.result[0].SourceCode ? JSON.parse(resp.data.result[0].ABI) : []
  const name = resp.data.result[0].ContractName || ''

  if (abi.length) {
    console.log(`Fetched ABI for ${name}. Caching...`)
    await cacheAbi(network, address, name, abi)
  } else {
    console.log('Contract not verified...')
  }
  return {
    body: {
      name,
      abi,
    },
  }
}

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
    console.log('No cached ABI. Fetching from block explorer...')
    return false
  }

  console.log(`ABI for ${data[0].name} fetched.`)
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
