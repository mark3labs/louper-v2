<script lang="ts">
  throw new Error(
    '@migration task: Add data prop (https://github.com/sveltejs/kit/discussions/5774#discussioncomment-3292707)',
  )

  import FacetCard from '$lib/components/FacetCard.svelte'
  import Header from '$lib/components/Header.svelte'
  import ReadContract from '$lib/components/ReadContract.svelte'
  import WriteContract from '$lib/components/WriteContract.svelte'
  import History from '$lib/components/History.svelte'
  import DiamondContract from '$lib/services/diamond'
  import { getExplorerAddressUrl } from '$lib/utils'
  import RemoveFacet from '$lib/components/RemoveFacet.svelte'
  import type { Facet } from '../../../types/entities'
  import { initWeb3W } from 'web3w'
  import AddFacet from '$lib/components/AddFacet.svelte'
  import { getNotificationsContext } from 'svelte-notifications'
  import Bookmark from '$lib/components/Bookmark.svelte'
  import user from '$lib/stores/user'
  import Comments from '$lib/components/Comments.svelte'

  const { addNotification } = getNotificationsContext()

  export let data
  diamond = data.diamond

  let showReadContract = false
  let showWriteContract = false
  let showRemoveFacet = false
  let showAddFacet = false
  let activeFacet: Facet | null = null

  let { transactions } = initWeb3W({})

  $: if (diamond) {
    initWeb3W({
      builtin: { autoProbe: true },
      options: ['builtin'],
    })
  }

  $: if ($transactions.length) {
    for (let t of $transactions) {
      if (t.acknowledged) continue
      transactions.acknowledge(t.hash, t.status)
      addNotification({
        text: t.hash,
        position: 'bottom-right',
        status: t.status,
        network: diamond.network,
      })
    }
  }
</script>

<svelte:head>
  <title>Louper - {diamond.name || 'UNKNOWN'}</title>
</svelte:head>

<div class="flex flex-col w-full space-y-10 my-5 mx-auto">
  <Header address={diamond.address} network={diamond.network} />

  <h1 class="text-4xl text-center">{diamond.name || 'UNKNOWN'}</h1>
  <div class="flex justify-center">
    <div
      class="badge badge-info p-3 cursor-pointer text-xs lg:text-base"
      on:click={() => window.open(getExplorerAddressUrl(diamond.address, diamond.network))}
    >
      {diamond.address}
      <svg
        class="w-3 h-3 md:w-4 md:h-4 inline ml-2"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
        />
        <path
          d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
        />
      </svg>
    </div>
  </div>
  {#if !showReadContract && !showWriteContract && !showAddFacet && !showRemoveFacet}
    <div class="flex justify-between">
      {#if diamond.isFinal}
        <div class="badge badge-success badge-lg">Final</div>
      {:else}
        <div class="badge badge-warning badge-lg">Upgradable</div>
      {/if}
      <div class="flex justify-between gap-2">
        <a
          class="btn btn-sm glass bg-secondary"
          download="abi.json"
          href={`data:application/octet-stream,${encodeURI(JSON.stringify(diamond.abi))}`}
        >
          <svg
            class="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          Download ABI
        </a>
        <button class="btn btn-sm glass bg-primary" on:click={() => (showAddFacet = true)}>
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
            />
          </svg>
          Upgrade Facet
        </button>
        {#if $user}
          <Bookmark {diamond} />
        {/if}
      </div>
    </div>
    <Comments {diamond} />
    <History
      events={diamond.events}
      network={diamond.network}
      facetsToName={diamond.facetsToName}
    />
    <div class="grid lg:grid-cols-2 gap-3">
      {#each diamond.facets as facet}
        <FacetCard
          {facet}
          {diamond}
          bind:activeFacet
          bind:showReadContract
          bind:showWriteContract
          bind:showRemoveFacet
        />
      {/each}
    </div>
  {/if}
  <ReadContract
    address={diamond.address}
    network={diamond.network}
    bind:showModal={showReadContract}
    bind:facet={activeFacet}
  />
  <WriteContract
    address={diamond.address}
    network={diamond.network}
    bind:showModal={showWriteContract}
    bind:facet={activeFacet}
  />
  <RemoveFacet
    address={diamond.address}
    network={diamond.network}
    bind:showModal={showRemoveFacet}
    bind:facet={activeFacet}
  />
  <AddFacet
    allFacets={diamond.facets}
    address={diamond.address}
    network={diamond.network}
    bind:showModal={showAddFacet}
  />
</div>
