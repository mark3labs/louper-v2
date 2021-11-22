import type { Event } from 'ethers'
import type { FunctionFragment } from 'ethers/lib/utils'

export interface Method {
  signature: string
  selector: string
  fragment: FunctionFragment | undefined
}

export interface Facet {
  address: string
  name: string
  methods: Method[]
}

export interface LouperEvent extends Event {
  timestamp: number
}

export interface Diamond {
  address: string
  network: string
  name: string
  facets: Facet[]
  events: LouperEvent[]
  isFinal: boolean
  isVerified: boolean
}
