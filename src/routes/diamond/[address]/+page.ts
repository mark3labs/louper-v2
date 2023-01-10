import type { PageLoad } from './$types'
import DiamondContract from '$lib/services/diamond'
import { NETWORKS } from '$lib/config'

export const load: PageLoad = async ({ params, url, fetch }) => {
  let network = url.searchParams.get('network') || 'mainnet'

  if (!Number.isNaN(Number(network))) {
    network = Object.entries(NETWORKS).find(([_, networkConfig]) => {
      return networkConfig.chainId.toString() === network.toString()
    })?.[0]
  }

  console.log('Fetching diamond details...', network, params.address)
  const diamond = await new DiamondContract(params.address, network, fetch).fetchContractDetails()
  console.log('Diamond details fetched...')

  return {
    diamond,
  }
}
