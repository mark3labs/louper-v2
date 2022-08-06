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
    <div class="stat-figure text-4xl">💎</div>
    <div class="stat-title">Diamonds Inspected</div>
    {#if diamondCount}
      <div class="stat-value">{diamondCount}</div>
    {:else}
      <div class="stat-value rounded-lg bg-base-300 animate-pulse h-10 w-10" />
    {/if}
  </div>

  <div class="stat">
    <div class="stat-figure text-4xl">📄</div>
    <div class="stat-title">Contracts Inspected</div>
    {#if contractCount}
      <div class="stat-value">{contractCount}</div>
    {:else}
      <div class="stat-value rounded-lg bg-base-300 animate-pulse h-10 w-10" />
    {/if}
  </div>

  <div class="stat">
    <div class="stat-figure text-3xl">👀</div>
    <div class="stat-title">Pages Views</div>
    {#if pageViews}
      <div class="stat-value">{pageViews}</div>
    {:else}
      <div class="stat-value rounded-lg bg-base-300 animate-pulse h-10 w-10" />
    {/if}
    <div class="stat-desc">Last 30 Days</div>
  </div>
</div>
