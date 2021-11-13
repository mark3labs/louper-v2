import type { Diamond, Method, Facet, LouperEvent } from '../../types/entities'
import { ethers, utils } from 'ethers'

type FetchFunction = (info: RequestInfo, init?: RequestInit) => Promise<Response>

export default class DiamondContract implements Diamond {
  address = ''
  network = ''
  name = ''
  facets: Facet[] = []
  events: LouperEvent[] = []
  isFinal = true
  isVerified = true
  facetsToName: Record<string, string> = {}
  fetch: FetchFunction

  constructor(address: string, network: string, fetch: FetchFunction) {
    this.address = address
    this.network = network
    this.fetch = fetch
  }

  fetchContractDetails = async (): Promise<DiamondContract> => {
    // Fetch contract info
    console.log(this.address, this.network)
    let res = await this.fetch('/api/contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({ address: this.address, network: this.network })
    })
    const diamond = await res.json()
    this.name = diamond.name

    // Fetch facets and facet details
    res = await this.fetch('/api/facets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: this.address, network: this.network })
    })
    const facets = await res.json()

    for (let i = 0; i < facets.length; i++) {
      res = await this.fetch('/api/contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: facets[i][0], network: this.network })
      })
      const facetData = await res.json()

      if (!facetData.abi.length) {
        this.isVerified = false
      }

      const methods: Method[] = await this.getMethods(facets[i][0], facetData.abi)
      const name = facetData.name
      const facet: Facet = {
        address: facets[i][0],
        name,
        methods
      }
      this.facets.push(facet)
      this.facetsToName[facet.address] = facet.name
    }

    // Fetch diamond events
    try {
      res = await this.fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: this.address, network: this.network })
      })
      this.events = await res.json()

      // await axios.post('/api/leaderboard', {
      //   address: this.address,
      //   network: this.network,
      //   name: this.name
      // })
    } catch (e) {
      console.error(e)
      this.events = []
    }

    return this
  }

  private getMethods = async (address: string, abi: any): Promise<Method[]> => {
    const contract = new ethers.Contract(address, abi)

    const methods: Method[] = []
    const functions = contract.interface.functions
    for (const [f, val] of Object.entries(functions)) {
      if (f === 'diamondCut((address,uint8,bytes4[])[],address,bytes)') {
        this.isFinal = false
      }
      const method: Method = {
        signature: f,
        selector: utils.keccak256(utils.toUtf8Bytes(f)).substr(0, 10),
        fragment: val
      }
      methods.push(method)
    }

    return methods
  }
}
