<script>
  import { TileDocument } from '@ceramicnetwork/stream-tile'
  import { Orbis } from '@orbisclub/orbis-sdk'
  import { onMount } from 'svelte'
  import profile from '$lib/stores/profile'

  export let diamond
  let orbis = new Orbis()
  let bookmarks = []
  let bookmarked = false

  onMount(async () => {
    await orbis.isConnected()
    bookmarks = await getBookmarks()
    bookmarked = await isBookmarked()
    console.log(bookmarks)
  })

  const getBookmarks = async () => {
    const doc = await TileDocument.deterministic(orbis.ceramic, {
      controllers: [$profile.did],
      family: 'louper.dev.bookmarks.document',
    })

    return doc.content.bookmarks ? doc.content.bookmarks : []
  }

  const isBookmarked = async () => {
    return bookmarks.find(
        (b) =>
          b.address.toLowerCase() === diamond.address.toLowerCase() &&
          b.network.toLowerCase() === diamond.network.toLowerCase(),
      )
  }

  const addBookmark = async () => {

    if (await isBookmarked()) { return }

    const doc = await TileDocument.deterministic(orbis.ceramic, {
      controllers: [$profile.did],
      family: 'louper.dev.bookmarks.document',
    })

    bookmarks.push({
      address: diamond.address.toLowerCase(),
      network: diamond.network.toLowerCase(),
    })

    await doc.update({ bookmarks })
    bookmarked = true
  }
</script>

<button class="btn btn-sm glass bg-accent" on:click={addBookmark} disabled={bookmarked}>
  <svg
    class="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
      d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
    />
  </svg>
</button>
