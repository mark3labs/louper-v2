<script>
  import Header from '$lib/components/Header.svelte'
  import Featured from '$lib/components/Featured.svelte'
  import Stats from '$lib/components/Stats.svelte'
  import LatestDiamonds from '$lib/components/LatestDiamonds.svelte'
</script>

<div class="flex flex-col w-full space-y-10 my-5">
  <Header />
  <!-- Stats -->
  <Stats />
  <!-- Latest Diamonds -->
  <LatestDiamonds />
  <!-- Featured Diamonds -->
  <Featured />
</div>
