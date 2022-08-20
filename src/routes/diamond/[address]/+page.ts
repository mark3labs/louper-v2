import type { PageLoad } from './$types'
import DiamondContract from '$lib/services/diamond'

export const load: PageLoad = async ({ params, url, fetch }) => {
  console.log('Fetching diamond details...')
  const diamond = await new DiamondContract(
    params.address,
    url.searchParams.get('network') || 'mainnet',
    fetch,
  ).fetchContractDetails()
  console.log('Diamond details fetched...')

  return {
    diamond,
  }
}
