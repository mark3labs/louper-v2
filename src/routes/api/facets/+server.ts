import { json as json$1 } from '@sveltejs/kit';
import { ethers } from 'ethers'
import { NETWORKS } from '$lib/config'
import dotenv from 'dotenv'
import type { RequestHandler } from '@sveltejs/kit'

dotenv.config()

const abi = ['function facets() external view returns (tuple(address,bytes4[])[])']

const INFURA_API_KEY = process.env['INFURA_API_KEY']

export const POST: RequestHandler<void, { network: string; address: string }> = async ({
  request,
}) => {
  const body = await request.json()
  console.info(`Fetching data for 💎 diamond at ${body.address} on ${body.network || 'mainnet'}`)
  const address = body.address.toLowerCase()

  let rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
  rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY)
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const diamondContract = new ethers.Contract(address, abi, provider)

  const data = await diamondContract.facets()

  throw new Error("@migration task: Migrate this return statement (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292701)");
  // Suggestion (check for correctness before using):
  // return json$1(data);
  return { body: data }
}
