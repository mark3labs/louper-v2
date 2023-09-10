import type { Diamond, Method, Facet, LouperEvent } from '../../types/entities'
import { FunctionFragment, ethers } from 'ethers'
import { getFacetMethods, getABIMethods } from '$lib/utils'

type FetchFunction = (info: RequestInfo, init?: RequestInit) => Promise<Response>

export default class DiamondContract implements Diamond {
  address = ''
  network = ''
  name = ''
  facets: Facet[] = []
  selectors: string[] = []
  events: LouperEvent[] = []
  isFinal = true
  isVerified = true
  facetsToName: Record<string, string> = {}
  facetsToSelectors: Map<string, string[]> = new Map<string, string[]>()
  fetch: FetchFunction
  abi = []
  functionSelectorsTemp = []
  eventSignaturesTemp = []

  constructor(address: string, network: string, fetch: FetchFunction) {
    this.address = address
    this.network = network
    this.fetch = fetch
  }

  fetchContractDetails = async (): Promise<DiamondContract> => {
    // Fetch contract info
    let res = await this.fetch('/api/contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: this.address, network: this.network }),
    })
    const diamond = await res.json()
    this.name = diamond.name

    // Fetch facets and facet details
    res = await this.fetch('/api/facets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: this.address, network: this.network }),
    })
    const facets = await res.json()

    for (let i = 0; i < facets.length; i++) {
      this.facetsToSelectors[facets[i][0]] = facets[i][1]
      this.selectors = this.selectors.concat(facets[i][1])
      res = await this.fetch('/api/contract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: facets[i][0], network: this.network }),
      })
      const facetData = await res.json()

      let methods: Method[] = []
      if (!facetData.abi.length) {
        this.isVerified = false
        for (let j = 0; j < facets[i][1].length; j++) {
          const selector = String(facets[i][1][j])

          if (!this.selectors.includes(selector)) continue

          let signature = 'UNKNOWN'
          try {
            // get info from 4bytes
            console.log('Fetching selector info from sig.eth.samczsun.com...')
            res = await this.fetch(
              `https://sig.eth.samczsun.com/api/v1/signatures?function=${selector}`,
              {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              },
            )
            console.log('Fetched info from sig.eth.samczsun.com.')
            let data

            if (res.ok) {
              try {
                data = await res.json()
              } catch (e) {
                console.log('Could not parse data')
              }
            }

            if (
              data &&
              data.result &&
              data.result.function[selector] &&
              data.result.function[selector].length
            ) {
              signature = data.result.function[selector][0].name
            }

            if (selector === '0x1f931c1c') {
              this.isFinal = false
            }
          } catch (e) {
            console.log(e)
          }

          methods.push({
            selector,
            signature,
            fragment: undefined,
          })
        }
      } else {
        facetData.abi.forEach((abi) => {
          const functionMethods = getFacetMethods(this.address, [abi])
          // Method should be an active selector
          if (functionMethods.length > 0 && this.selectors.includes(functionMethods[0].selector)) {
            // New facets will contain already existing selectors, prevent those from being duplicated
            if (!this.functionSelectorsTemp.includes(functionMethods[0].selector)) {
              this.abi.push(abi)
              // A Diamond allows duplicate names (but not selectors), so we can't use the ABI name
              this.functionSelectorsTemp.push(functionMethods[0].selector)
            }
          }

          if (abi.type === 'event') {
            const abiMethods = getABIMethods(this.address, [abi])
            if (
              abiMethods.length > 0 &&
              !this.eventSignaturesTemp.includes(abiMethods[0].signature)
            ) {
              this.abi.push(abi)
              this.eventSignaturesTemp.push(abiMethods[0].signature)
            }
          }
        })
        methods = await this.getMethods(facets[i][0], facetData.abi)
      }
      const name = facetData.name
      const facet: Facet = {
        address: facets[i][0].toLowerCase(),
        name,
        methods,
      }
      this.facets.push(facet)
      this.facetsToName[facet.address] = facet.name
    }

    // Fetch diamond events
    try {
      res = await this.fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: this.address, network: this.network }),
      })
      this.events = await res.json()

      await this.fetch('/api/leaderboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address: this.address,
          network: this.network,
          name: this.name || 'Unknown',
        }),
      })
    } catch (e) {
      console.error(e)
      this.events = []
    }

    return this
  }

  private getMethods = async (address: string, abi: any): Promise<Method[]> => {
    const contract = new ethers.Contract(address, abi)

    const methods: Method[] = []
    for (const f of contract.interface.fragments.filter(
      (f) => f.type === 'function',
    ) as FunctionFragment[]) {
      const func = f.format('minimal').replace('function ', '')
      if (f.selector === '0x1f931c1c') {
        // diamondCut
        this.isFinal = false
      }

      if (!this.facetsToSelectors[address].includes(f.selector)) continue

      const method: Method = {
        signature: func,
        selector: f.selector,
        fragment: f,
      }

      methods.push(method)
    }

    console.log(methods)
    return methods
  }
}
