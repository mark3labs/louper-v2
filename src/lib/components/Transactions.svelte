<script lang="ts">
  import { onMount } from 'svelte'
  import type DiamondContract from '$lib/services/diamond'
  import {
    humanTime,
    shortHash,
    shortAddress,
    getExplorerTxUrl,
    getExplorerAddressUrl,
  } from '$lib/utils'
  import { utils } from 'ethers'

  export let diamond: DiamondContract

  let transactions = []

  onMount(async () => {
    const res = await fetch('/api/transactions', {
      method: 'POST',
      body: JSON.stringify({
        network: diamond.network,
        address: diamond.address,
      }),
    })
    transactions = await res.json()
  })
</script>

<div class="rounded-box bg-base-300 text-base-content collapse collapse-arrow">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    <svg
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      class="w-8 h-8 inline"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
    Recent Transactions
  </div>
  <div class="collapse-content overflow-x-scroll">
    <table class="table table-compact table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th>Block #</th>
          <th>Hash</th>
          <th>Function</th>
          <th>Age</th>
          <th>From</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <!-- TXs -->
        {#each transactions as t}
          <tr>
            <th>{t.blockNumber}</th>
            <td>
              <div
                class="badge badge-info p-3 cursor-pointer text-xs lg:text-base"
                on:click={() => window.open(getExplorerTxUrl(t.hash, diamond.network))}
              >
                {shortHash(t.hash)}
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
            </td>
            <td>{t.functionName ? t.functionName.split('(')[0] : t.methodId}</td>
            <td>{humanTime(t.timeStamp)}</td>
            <td>
              <div
                class="badge badge-info p-3 cursor-pointer text-xs lg:text-base"
                on:click={() => window.open(getExplorerAddressUrl(t.address, diamond.network))}
              >
                {shortAddress(t.from)}
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
            </td>
            <td>{utils.formatEther(t.value)}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
