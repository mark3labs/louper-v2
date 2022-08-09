import { writable } from 'svelte/store'
import { Orbis } from '@orbisclub/orbis-sdk'

const orbis = new Orbis()

export default writable<Orbis>(orbis)
