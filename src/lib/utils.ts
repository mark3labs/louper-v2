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

export const getEtherscanApiKey = (network: string): string => {
  const key = process.env[`${network.toUpperCase()}_ETHERSCAN_API_KEY`]
  console.log(key)
  return key ? key : process.env.ETHERSCAN_API_KEY
}