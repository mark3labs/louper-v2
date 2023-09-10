<script>
  import Search from './Search.svelte'
  import Sponsor from './Sponsor.svelte'

  export let address = ''
  export let network = 'mainnet'
</script>

<div class="lg:flex lg:flex-row lg:space-x-3 space-y-2">
  <!-- Search Bar -->
  <div class="w-full lg:flex-grow py-1">
    <Search {address} {network} />
  </div>
  <div class="flex-grow-0 p-0">
    <Sponsor />
  </div>
</div>
