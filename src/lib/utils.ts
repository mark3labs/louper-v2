import { NETWORKS } from './config'
import { ethers, utils } from 'ethers'
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

export const getABIMethods = (address: string, abi: any): string => {
  const contract = new ethers.Contract(address, abi)

  const methods: Method[] = []
  const events = contract.interface.events
  for (const [f, val] of Object.entries(events)) {
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

export const shortProfile = (address: string) => {
  return `${address.substring(0, 5)}-${address.substring(address.length - 5)}`
}

export const shortAddress = (address: string) => {
  return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`
}

export const shortHash = (address: string) => {
  return `${address.substring(0, 18)}...`
}

export const humanTime = (time: number): string => {
  const date = new Date()
  const timestamp = date.getTime()
  const seconds = Math.floor(timestamp / 1000)
  const difference = seconds - time
  let output = ``
  if (difference < 60) {
    // Less than a minute has passed:
    output = `${difference} seconds ago`
  } else if (difference < 3600) {
    // Less than an hour has passed:
    output = `${Math.floor(difference / 60)} minutes ago`
  } else if (difference < 86400) {
    // Less than a day has passed:
    output = `${Math.floor(difference / 3600)} hours ago`
  } else if (difference < 2620800) {
    // Less than a month has passed:
    output = `${Math.floor(difference / 86400)} days ago`
  } else if (difference < 31449600) {
    // Less than a year has passed:
    output = `${Math.floor(difference / 2620800)} months ago`
  } else {
    // More than a year has passed:
    output = `${Math.floor(difference / 31449600)} years ago`
  }
  return output
}
