<script>
  import Header from '$lib/components/Header.svelte'
  import Featured from '$lib/components/Featured.svelte'
  import Stats from '$lib/components/Stats.svelte'
  import LatestDiamonds from '$lib/components/LatestDiamonds.svelte'
  import TopDiamonds from '$lib/components/TopDiamonds.svelte'
</script>

<div class="flex flex-col w-full space-y-10 my-5">
  <Header />
  <!-- Stats -->
  <Stats />
  <!-- Latest Diamonds -->
  <div class="flex flex-row py-5 bg-base-300 sm:py-10 lg:py-10 rounded-box text-base-content">
    <LatestDiamonds />
    <TopDiamonds />
  </div>
  <!-- Featured Diamonds -->
  <Featured />
</div>
