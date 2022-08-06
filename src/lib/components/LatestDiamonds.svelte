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

<div class="py-5 bg-base-300 sm:py-16 lg:py-10 rounded-box text-base-content">
  <div class="px-4 mx-auto sm:px-6 lg:px-8">
    <div>
      <p class="text-base font-bold ">Recent Diamonds Inspected</p>
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
            {#each diamonds as diamond}
              <tr
                class="hover cursor-pointer"
                on:click={() => goto(`/diamond/${diamond.address}?network=${diamond.network}`)}
              >
                <td>{diamond.name}</td>
                <td>{diamond.address}</td>
                <td class="capitalize">{NETWORKS[diamond.network].emoji} {diamond.network}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
