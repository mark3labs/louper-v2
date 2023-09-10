import { json } from '@sveltejs/kit'
import { ethers } from 'ethers'
import { NETWORKS } from '$lib/config'
import type { RequestHandler } from '@sveltejs/kit'
import * as console from 'console'

const abi = ['function facets() external view returns (tuple(address,bytes4[])[])']

export const POST = (async ({ request }) => {
  const body = await request.json()
  console.info(`Fetching data for 💎 diamond at ${body.address} on ${body.network || 'mainnet'}`)
  const address = body.address.toLowerCase()

  const rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
  const provider = new ethers.JsonRpcProvider(rpcUrl)
  const diamondContract = new ethers.Contract(address, abi, provider)

  try {
    const facets = await diamondContract.facets()
    console.log(facets)
    return json(facets)
  } catch (e) {
    console.error(e)
    return json([])
  }
}) satisfies RequestHandler
