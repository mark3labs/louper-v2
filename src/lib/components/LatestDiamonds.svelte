<script>
  import { goto } from '$app/navigation'
  import { onMount } from 'svelte'
  import { NETWORKS } from '$lib/config'

  let diamonds = []

  onMount(async () => {
    const res = await fetch('/api/leaderboard')
    ;({ diamonds } = await res.json())
  })
</script>

<div class="px-4 mx-auto sm:px-6 lg:px-8 w-full">
  <div>
    <p class="text-base font-bold">Recent Diamonds Inspected</p>
  </div>

  <div class="mt-6">
    <div class="overflow-x-auto">
      <table class="table table-compact w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Network</th>
          </tr>
        </thead>
        <tbody>
          {#each diamonds.filter((d) => {
            NETWORKS[d.network] !== undefined
          }) as diamond}
            <tr
              class="hover cursor-pointer"
              on:click={() => goto(`/diamond/${diamond.address}?network=${diamond.network}`)}
            >
              <td>{diamond.name.substring(0, 25)}</td>
              <td>{diamond.address.substring(0, 20)}...{diamond.address.substring(36)}</td>
              <td class="capitalize">
                {NETWORKS[diamond.network].emoji}&nbsp;
                {NETWORKS[diamond.network].title}
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</div>
