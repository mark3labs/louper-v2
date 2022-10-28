<script>
  import { onMount } from 'svelte'

  let diamondCount
  let contractCount
  let pageViews

  onMount(async () => {
    const res = await fetch('/api/stats')
    ;({ diamondCount, contractCount, pageViews } = await res.json())
  })
</script>

<div class="stats">
  <div class="stat">
    <div class="stat-figure tex-sm lg:text-4xl">💎</div>
    <div class="stat-title">Diamonds Inspected</div>
    {#if diamondCount}
      <div class="stat-value text-sm lg:text-4xl">{diamondCount}</div>
    {:else}
      <div class="stat-value rounded-full bg-base-300 animate-pulse h-10 w-20" />
    {/if}
  </div>

  <div class="stat">
    <div class="stat-figure text-sm lg:text-4xl">📄</div>
    <div class="stat-title">Contracts Inspected</div>
    {#if contractCount}
      <div class="stat-value text-sm lg:text-4xl">{contractCount}</div>
    {:else}
      <div class="stat-value rounded-full bg-base-300 animate-pulse h-10 w-20" />
    {/if}
  </div>

  <div class="stat">
    <div class="stat-figure text-sm lg:text-3xl">👀</div>
    <div class="stat-title mb-2">Pages Views</div>
    {#if pageViews}
      <div class="stat-value text-sm lg:text-4xl">{pageViews}</div>
    {:else}
      <div class="stat-value rounded-full bg-base-300 animate-pulse h-10 w-20" />
    {/if}
    <div class="stat-desc mt-2">Last 30 Days</div>
  </div>
</div>
