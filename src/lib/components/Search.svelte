<script>
  import { goto } from '$app/navigation'
  import { NETWORKS } from '$lib/config'

  export let address = ''
  export let network = 'mainnet'
</script>

<div class="text-center text-4xl ">Search by Address</div>
<div class="grid grid-flow-col card bg-base-300 rounded-box p-2">
  <div class="form-control">
    <div class="relative">
      <input
        type="text"
        placeholder="0x..."
        bind:value={address}
        class="w-full pr-16 input text-2xl bg-base-300 text-base-content"
      />
      <select
        class="select select-sm absolute top-2 right-14 mr-3 bg-base-300"
        bind:value={network}
      >
        {#each Object.keys(NETWORKS) as network}
          <option value={network} class="font-semibold">
            {NETWORKS[network].emoji} {NETWORKS[network].title}</option
          >
        {/each}
      </select>
      <button
        class="absolute top-0 right-0 btn border-0 bg-gradient-to-r from-primary to-secondary"
        on:click={() => goto(`/diamond/${address}?network=${network}`)}
      >
        🔎
      </button>
    </div>
  </div>
</div>
