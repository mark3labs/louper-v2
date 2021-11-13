import axios from 'redaxios'
import type { FunctionFragment } from 'ethers/lib/utils'

export default class ContractReader {
  address: string
  network: string

  constructor(address: string, network: string) {
    this.address = address
    this.network = network
  }

  read = async (fragment: FunctionFragment, args: unknown[]) => {
    return await axios.post('/api/readContract', {
      address: this.address,
      network: this.network,
      fragment: fragment.format('json'),
      args: args
    })
  }
}
