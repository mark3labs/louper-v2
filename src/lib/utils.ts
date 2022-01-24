import { NETWORKS } from './config'

export const getExplorerAddressUrl = (address: string, network = 'mainnet'): string => {
  return `${NETWORKS[network].explorerUrl}/address/${address}`
}

export const getExplorerTxUrl = (hash: string, network: string): string => {
  return `${NETWORKS[network].explorerUrl}/tx/${hash}`
}

export const getVerifyContractUrl = (address: string, network = 'mainnet'): string => {
  return `${NETWORKS[network].explorerUrl}/verifyContract?a=${address}`
}
