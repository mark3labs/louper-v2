<script context="module">
  throw new Error("@migration task: Check code was safely removed (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292722)");

  // import user from '$lib/stores/user'

  // export async function load() {
  //   let userValue

  //   user.subscribe((u) => {
  //     userValue = u
  //   })

  //   if (!userValue) {
  //     return {
  //       redirect: '/',
  //     }
  //   }
  // }
</script>

<script>
  import { NETWORKS } from '$lib/config'

  import { TileDocument } from '@ceramicnetwork/stream-tile'
  import { Orbis } from '@orbisclub/orbis-sdk'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  let orbis = new Orbis()
  let bookmarks = []

  onMount(async () => {
    await orbis.isConnected()
    bookmarks = await getBookmarks()
  })

  const getBookmarks = async () => {
    const doc = await TileDocument.deterministic(orbis.ceramic, {
      controllers: [$user.did],
      family: 'louper.dev.bookmarks.document',
    })

    return doc.content.bookmarks ? doc.content.bookmarks : []
  }
</script>

<div class="flex flex-row py-5 bg-base-300 sm:py-10 lg:py-10 rounded-box">
  <div class="px-4 mx-auto sm:px-6 lg:px-8 w-full">
    <div>
      <p class="text-base font-bold ">Bookmarked Diamonds</p>
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
            {#each bookmarks as diamond}
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
</div>
