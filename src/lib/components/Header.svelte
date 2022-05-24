<script>
  import Search from './Search.svelte'
  import Sponsor from './Sponsor.svelte'

  export let address = ''
  export let network = 'mainnet'
</script>

<div class="flex flex-row space-x-3">
  <!-- Search Bar -->
  <div class="w-3/4">
    <Search {address} {network} />
  </div>
  <div class="w-1/4">
    <Sponsor />
  </div>
</div>
