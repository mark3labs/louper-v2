<script context="module">
  import profile from '$lib/stores/profile'

  export async function load() {
    let profileValue

    profile.subscribe((p) => {
      profileValue = p
    })

    if (!profileValue) {
      return {
        status: 302,
        redirect: '/',
      }
    }
  }
</script>

<script>
  import { TileDocument } from '@ceramicnetwork/stream-tile'
  import { Orbis } from '@orbisclub/orbis-sdk'
  import { onMount } from 'svelte';

  let orbis = new Orbis()
  let bookmarks = []

  onMount(async () => {
    await orbis.isConnected()
    bookmarks = await getBookmarks()
    console.log(bookmarks)
  })

  const getBookmarks = async () => {
    const doc = await TileDocument.deterministic(orbis.ceramic, {
      controllers: [$profile.did],
      family: 'louper.dev.bookmarks.document',
    })

    return doc.content.bookmarks ? doc.content.bookmarks : []
  }
</script>
