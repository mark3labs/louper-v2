import { ethers } from 'ethers'
import { NETWORKS } from '$lib/config'
import dotenv from 'dotenv'
import type { RequestHandler } from '@sveltejs/kit'

dotenv.config()

const abi = ['function facets() external view returns (tuple(address,bytes4[])[])']

const INFURA_API_KEY = process.env['INFURA_API_KEY']

export const post: RequestHandler<void, { network: string; address: string }> = async ({
  body,
}) => {
  console.info(`Fetching data for 💎 diamond at ${body.address} on ${body.network || 'mainnet'}`)
  const address = body.address

  let rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
  rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY)
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const diamondContract = new ethers.Contract(address, abi, provider)

  const data = await diamondContract.facets()

  return { body: data }
}
