<script>
  import { goto } from '$app/navigation'
  import { NETWORKS } from '$lib/config'
  import Select from 'svelte-select'

  export let address = ''
  export let network = 'mainnet'

  const handleChange = (e) => {
    network = e.detail.value
  }
</script>

<div class="card flex flex-col justify-around h-full bg-base-200 shadow-xl">
  <div class="card-body">
    <div class="card-title">Search by Address</div>
    <div class="grid grid-flow-col card bg-base-300 rounded-box p-1 lg:p-2">
      <div class="form-control">
        <form
          on:submit|preventDefault|stopPropagation={() =>
            goto(`/diamond/${address}?network=${network}`)}
          class="relative"
        >
          <input
            type="text"
            placeholder="0x..."
            bind:value={address}
            class="w-full pr-16 input text-2xl bg-base-300 text-base-content"
          />
          <Select
            items={Object.keys(NETWORKS)}
            on:change={handleChange}
            value={network}
            class="search-select"
          />
          <!-- <select -->
          <!--   class="select select-sm absolute top-2 right-14 mr-3 bg-base-300 w-1/5 lg:w-auto" -->
          <!--   bind:value={network} -->
          <!-- > -->
          <!--   {#each Object.keys(NETWORKS) as network} -->
          <!--     <option value={network} class="font-semibold"> -->
          <!--       {NETWORKS[network].emoji} {NETWORKS[network].title}</option -->
          <!--     > -->
          <!--   {/each} -->
          <!-- </select> -->
          <button
            class="absolute top-0 right-0 btn border-0 bg-gradient-to-r from-primary to-secondary"
            type="submit"
          >
            🔎
          </button>
        </form>
      </div>
    </div>
  </div>
</div>

<style lang="postcss">
  :global(.search-select) {
    @apply !absolute !top-2 !right-14 !mr-3 !bg-base-300 !w-1/5 lg:!w-3/12 !border-0;
  }
  :global(.svelte-select-list) {
    @apply !bg-base-300 !text-base-content;
  }
  :global(.selected-item) {
    @apply !text-base-content;
  }
  :global(.clear-select > svg) {
    @apply !h-3 !w-3;
  }
</style>
