import { ethers } from 'ethers'
import { NETWORKS } from '$lib/config'
import dotenv from 'dotenv'
import type { RequestHandler } from '@sveltejs/kit'

dotenv.config()

const INFURA_API_KEY = process.env['INFURA_API_KEY']

export const post: RequestHandler<
  void,
  { network: string; address: string; fragment: string; args: [] }
> = async ({ body }) => {
  console.info(
    `Reading contract data for 💎 diamond at ${body.address} on ${body.network || 'mainnet'}`
  )

  const address = body.address
  const abi = []
  const fragment = JSON.parse(body.fragment)
  abi.push(fragment)
  const args = body.args

  let rpcUrl = body.network ? NETWORKS[body.network].rpcUrl : NETWORKS['mainnet'].rpcUrl
  rpcUrl = rpcUrl.replace('%INFURA_API_KEY%', INFURA_API_KEY)
  const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
  const diamondContract = new ethers.Contract(address, abi, provider)

  try {
    const data = await diamondContract[fragment.name](...args)
    return { body: data }
  } catch (e) {
    return {
      body: {
        reason: e.reason,
        code: e.code,
        value: e.value
      }
    }
  }
}
