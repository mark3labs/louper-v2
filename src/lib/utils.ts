import { NETWORKS } from './config'
import {ethers, utils} from 'ethers'
import type { Method } from '../types/entities'

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

export const getFacetMethods = (address: string, abi: any): Method[] => {
  const contract = new ethers.Contract(address, abi)

  const methods: Method[] = []
  const functions = contract.interface.functions
  for (const [f, val] of Object.entries(functions)) {
    const selector = utils.keccak256(utils.toUtf8Bytes(f)).substr(0, 10)

    const method: Method = {
      signature: f,
      selector,
      fragment: val,
    }
    methods.push(method)
  }
  return methods
}
