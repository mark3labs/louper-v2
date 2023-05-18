import { NETWORKS } from '$lib/config'
import { getEtherscanApiKey } from '$lib/utils'
import { json, type RequestHandler } from '@sveltejs/kit'
import axios from 'redaxios'

export const POST = (async ({ request }) => {
const body = await request.json()
  const address = body.address.toLowerCase()
  const network = body.network.toLowerCase()
  const page = body.page || 1

  console.info(`Fetching transactions for 💎 diamond at ${address} on ${network || 'mainnet'}`)
  
  const API_KEY = getEtherscanApiKey(network)

  const apiUrl = NETWORKS[network].explorerApiUrl
  if (apiUrl) {
    const fullUrl = `${apiUrl}?module=account&action=txlist&page=${page}&offset=50&&sort=desc&address=${address}&apikey=${API_KEY}`
    const res = await axios.get(fullUrl)
    return json(res.data.result)
  }

  return json([])
}) satisfies RequestHandler
