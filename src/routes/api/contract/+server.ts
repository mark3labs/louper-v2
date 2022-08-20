import { json } from '@sveltejs/kit'
import { NETWORKS } from '$lib/config'
import axios from 'redaxios'
import type { RequestHandler } from '@sveltejs/kit'

import dotenv from 'dotenv'

const SOURCIFY_REPO_URL = 'https://repo.sourcify.dev'

dotenv.config()

import { createClient } from '@supabase/supabase-js'
import { getEtherscanApiKey } from '$lib/utils'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env['SUPABASE_URL'], process.env['SUPABASE_KEY'])

export const POST: RequestHandler<void, { network: string; address: string }> = async ({
  request,
}) => {
  const body = await request.json()
  const network = body.network.toLowerCase() || 'mainnet'
  const address = body.address.toLowerCase()

  const API_KEY = getEtherscanApiKey(network)

  console.info(`Fetching data for 📝 contract at ${address} on ${network}`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: any = await fetchCachedAbi(network, address)
  if (res.abi) {
    return json({
      abi: res.abi,
      name: res.name,
    })
  }

  // Try Sourcify first
  try {
    console.log('Trying Sourcify...')
    const metadata = await axios.get(
      `${SOURCIFY_REPO_URL}/contracts/full_match/${NETWORKS[network].chainId}/${address}/metadata.json`,
    )
    if (metadata) {
      console.log(
        `Fetched ABI for ${
          Object.values(metadata.data.settings.compilationTarget)[0] as string
        }. Caching...`,
      )
      await cacheAbi(
        network,
        address,
        Object.values(metadata.data.settings.compilationTarget)[0] as string,
        metadata.data.output.abi,
      )
      return json({
        abi: metadata.data.output.abi,
        name: Object.values(metadata.data.settings.compilationTarget)[0] as string,
      })
    }
  } catch (e) {
    console.log('Nothing found on Sourcify.')
  }

  const apiUrl = NETWORKS[network].explorerApiUrl
  if (apiUrl) {
    try {
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
      return json({
        name,
        abi,
      })
    } catch (e) {
      console.log('Nothing found on block explorer.')
    }
  }

  return json({
    name: '',
    abi: [],
  })
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
