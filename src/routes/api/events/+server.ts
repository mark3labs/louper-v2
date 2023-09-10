import { json } from '@sveltejs/kit'
import { Result, ethers } from 'ethers'
import { NETWORKS } from '$lib/config'
import type { LouperEvent } from '../../../types/entities'
import type { RequestHandler } from '@sveltejs/kit'
import axios from 'redaxios'
import { getEtherscanApiKey } from '$lib/utils'

const abi = ['event DiamondCut(tuple(address,uint8,bytes4[])[],address,bytes)']
const topic = '0x8faa70878671ccd212d20771b795c50af8fd3ff6cf27f4bde57e5d4de0aeb673'

export const POST = (async ({ request }) => {
  const body = await request.json()
  console.info(`Fetching events for 💎 diamond at ${body.address} on ${body.network || 'mainnet'}`)
  const address = body.address.toLowerCase()
  const network = body.network.toLowerCase()

  const API_KEY = getEtherscanApiKey(network)

  const apiUrl = NETWORKS[network].explorerApiUrl
  if (apiUrl) {
    const fullUrl = `${apiUrl}?module=logs&action=getLogs&fromBlock=0&address=${address}&topic0=${topic}&apikey=${API_KEY}`
    console.log(fullUrl)
    const resp = await axios.get(fullUrl)

    const louperEvents: LouperEvent[] = []

    if (resp.data) {
      const iface = new ethers.Interface(abi)
      for (let i = 0; i < resp.data.result.length; i++) {
        const louperEvent: LouperEvent = {
          ...iface.decodeEventLog('DiamondCut', resp.data.result[i].data),
          timestamp: parseInt(resp.data.result[i].timeStamp, 16),
          txHash: resp.data.result[i].transactionHash as string,
        }
        louperEvents.push(louperEvent)
      }
    }
    return new Response(
      JSON.stringify(louperEvents, (_, v) => (typeof v === 'bigint' ? v.toString() : v)),
    )
  }
}) satisfies RequestHandler
