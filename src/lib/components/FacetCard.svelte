<script lang="ts">
  import type DiamondContract from '$lib/services/diamond'
  import { getExplorerAddressUrl, getVerifyContractUrl } from '$lib/utils'
  import type { Facet } from 'src/types/entities'

  export let diamond: DiamondContract

  export let facet

  export let showReadContract
  export let showWriteContract
  export let showRemoveFacet
  export let activeFacet: Facet
</script>

<div class="card shadow mockup-code bg-base-300 text-base-content">
  <div class="card-body">
    <div class="flex justify-between">
      <h2 class="card-title text-primary-focus font-bold">{facet.name || 'UNVERIFIED'}</h2>
      {#if !facet.name}
        <a
          class="inline-block text-primary uppercase font-bold"
          href={getVerifyContractUrl(facet.address, diamond.network)}
          target="_blank"
        >
          Verify
          <svg
            class="w-3 h-3 md:w-4 md:h-4 inline mb-1"
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
        </a>
      {/if}
    </div>
    <div
      class="badge badge-info p-3 cursor-pointer text-xs lg:text-base"
      on:click={() => window.open(getExplorerAddressUrl(facet.address, diamond.network))}
    >
      {facet.address}
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
    <div class="overflow-x-auto mt-5 h-full">
      <table class="table w-full table-compact">
        <thead>
          <tr>
            <th>Method</th>
            <th class="text-right"><span class="mr-3">Selector</span></th>
          </tr>
        </thead>
        {#each facet.methods as method}
          <tr>
            <td>{method.signature}</td>
            <td class="text-right">
              <span class="badge badge-info badge-outline font-bold">{method.selector}</span>
            </td>
          </tr>
        {/each}
      </table>
    </div>
    {#if facet.name}
      <div class="card-actions bg-secondary rounded-md p-1 text-secondary-content">
        <button
          class="btn glass btn-xs"
          on:click={() => {
            showReadContract = true
            showWriteContract = false
            showRemoveFacet = false
            activeFacet = facet
          }}
        >
          <svg
            class="w-4 h-4 mr-1"
            stroke="currentColor"
            stroke-width="2"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          Read
        </button>
        <button
          class="btn glass btn-xs"
          on:click={() => {
            showReadContract = false
            showWriteContract = true
            showRemoveFacet = false
            activeFacet = facet
          }}
        >
          <svg
            class="w-4 h-4 mr-1"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
              clip-rule="evenodd"
            />
          </svg>
          Write
        </button>
        <button
          class="btn glass btn-xs bg-error"
          on:click={() => {
            showReadContract = false
            showWriteContract = false
            showRemoveFacet = true
            activeFacet = facet
          }}
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Remove
        </button>
      </div>
    {/if}
  </div>
</div>
