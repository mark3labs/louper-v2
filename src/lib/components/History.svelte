<script lang="ts">
  import type { LouperEvent } from '../../types/entities'
  import { getExplorerTxUrl } from '$lib/utils'
  export let events: LouperEvent[] = []
  export let network
</script>

<div class="rounded-box bg-base-300 text-base-content collapse collapse-arrow">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    <svg
      class="w-8 h-8 mr-2 inline"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
    Upgrade History
  </div>
  <div class="collapse-content">
    <ol class="relative border-l border-gray-200 m-10">
      {#each events.sort((a, b) => (a.timestamp > b.timestamp ? -1 : 1)) as event}
        <li class="mb-10 ml-6">
          <span
            class="flex absolute -left-3 justify-center items-center w-6 h-6 bg-primary-focus rounded-full ring-8 ring-primary"
          >
            💎
          </span>
          <div class="ml-3">
            <h3 class="flex items-center mb-1 text-lg font-semibold">Diamond Cut</h3>
            <time class="block mb-2 text-sm font-normal leading-none text-gray-400">
              {new Date(event.timestamp * 1000).toUTCString()}
            </time>
            <a
              href={getExplorerTxUrl(event.txHash, network)}
              class="badge badge-info p-3 cursor-pointer text-xs lg:text-base"
              target="_blank"
            >
              {event.txHash}
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
            </a>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</div>
