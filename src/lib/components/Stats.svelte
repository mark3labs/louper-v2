<script>
  import { onMount } from 'svelte'

  let diamondCount = 0
  let contractCount = 0

  onMount(async () => {
    const res = await fetch('/api/stats')
    ;({ diamondCount, contractCount } = await res.json())
  })
</script>

<div class="stats">
  <div class="stat">
    <div class="stat-figure text-3xl">💎</div>
    <div class="stat-title">Diamonds Inspected</div>
    <div class="stat-value">{diamondCount}</div>
  </div>

  <div class="stat">
    <div class="stat-figure text-3xl">🔷</div>
    <div class="stat-title">Contracts Inspected</div>
    <div class="stat-value">{contractCount}</div>
  </div>

  <!-- <div class="stat"> -->
  <!--   <div class="stat-figure text-3xl"> -->
  <!--   👀 -->
  <!--   </div> -->
  <!--   <div class="stat-title">Total Views</div> -->
  <!--   <div class="stat-value">1,200</div> -->
  <!-- </div> -->
</div>
