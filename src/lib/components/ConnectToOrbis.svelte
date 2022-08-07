<script lang="ts">
  import { browser } from '$app/env'
  import { Orbis } from '@orbisclub/orbis-sdk'
  import { onMount } from 'svelte'

  let orbis = new Orbis()
  let isConnected = false
  let details = {}

  const connect = async () => {
    const res = await orbis.connect()
    details = res.details
    isConnected = true
  }

  const disconnect = async () => {
    localStorage.removeItem('ceramic-session')
    isConnected = false
  }

  onMount(async () => {
    if (browser) {
      const res = await orbis.isConnected()
      if (res.details) {
        details = res.details
        isConnected = true
      }
      console.log(details)
      console.log(orbis)
    }
  })
</script>

{#if !isConnected}
  <button class="btn btn-sm btn-primary" on:click={connect}> Sign In </button>
{:else}
  <button class="btn btn-sm btn-secondary" on:click={disconnect}>
    {details && details.profile ? details.profile.username : 'Anonymous'}
  </button>
{/if}
