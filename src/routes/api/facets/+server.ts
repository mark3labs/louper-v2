import { json } from '@sveltejs/kit'
import { ethers } from 'ethers'
import { NETWORKS } from '$lib/config'
import type { RequestHandler } from '@sveltejs/kit'

const abi = ['function facets() external view returns (tuple(address,bytes4[])[])']

export const POST = (async ({ request }) => {
  const body = await request.json()
  console.info(`Fetching data for 💎 diamond at ${body.address} on ${body.network || 'mainnet'}`)
  const address = body.address.toLowerCase()

  const rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const diamondContract = new ethers.Contract(address, abi, provider)

  const data = await diamondContract.facets()

  return json(data)
}) satisfies RequestHandler
