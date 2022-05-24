<script>
  import Search from './Search.svelte'
  import Sponsor from './Sponsor.svelte'

  export let address = ''
  export let network = 'mainnet'
</script>

<div class="lg:flex lg: flex-row lg:space-x-3 space-y-2">
  <!-- Search Bar -->
  <div class="w-full lg:w-3/4">
    <Search {address} {network} />
  </div>
  <div class="w-full lg:w-1/4">
    <Sponsor />
  </div>
</div>
