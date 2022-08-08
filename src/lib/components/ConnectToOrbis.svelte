<script lang="ts">
  import { browser } from '$app/env'
  import { Orbis } from '@orbisclub/orbis-sdk'
  import { onMount } from 'svelte'
  import profile from '$lib/stores/profile'

  let orbis = new Orbis()

  const connect = async () => {
    const res = await orbis.connect()
    $profile = res.details
  }

  onMount(async () => {
    if (browser) {
      const res = await orbis.isConnected()
      if (res.details) {
        $profile = res.details
      }
    }
  })
</script>

<button class="btn btn-sm btn-primary" on:click={connect}> Sign In </button>
