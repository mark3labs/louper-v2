<script lang="ts">
  import { fade } from 'svelte/transition'
  import { constants } from 'ethers'
  import { initWeb3W } from 'web3w'
  import { onDestroy } from 'svelte'
  import { NETWORKS } from '$lib/config'
  import { utils } from 'ethers'
  import { getExplorerTxUrl, getFacetMethods } from '$lib/utils'
  import Loading from './Loading.svelte'
  import type { Method } from '../../types/entities'

  let facetAddress = ''
  let facet: any | undefined = undefined

  export let allFacets: any[] = []
  export let address: string
  export let network: string
  export let showModal = false

  let fetchFacetError = ''
  let error: any = null
  let args: any = {}
  let methods: Method[] = []
  let selectors = []

  const FacetCutAction = {
    Add: 0,
    Replace: 1,
    Remove: 2,
  }

  const { wallet, builtin, flow, transactions, chain } = initWeb3W({})

  const iface = new utils.Interface([
    'function diamondCut(tuple(address facetAddress, uint8 action, bytes4[] functionSelectors)[],address initAddress, bytes callData) external',
  ])

  $: if (facet) {
    const iface = new utils.Interface(facet.abi)
    args = [
      [
        {
          facetAddress: facetAddress,
          action: FacetCutAction.Add,
          // functionSelectors: iface.fragments
          //   .map((f) => {
          //     if (f.type === 'function')
          //       return iface.getSighash(f.format(utils.FormatTypes.sighash))
          //   })
          //   .filter((f) => f != undefined),
          functionSelectors: selectors,
        },
      ],
      constants.AddressZero,
      '0x',
    ]
    console.log(selectors)
  }

  const connect = async (option = 'builtin') => {
    try {
      await wallet.connect(option)
      await chain.updateContracts({
        chainId: NETWORKS[network].chainId,
        contracts: {
          facet: {
            address,
            abi: iface.fragments.map((f) => f),
          },
        },
      })
    } catch (e) {
      wallet.acknowledgeError()
      await wallet.disconnect()
    }
  }

  const fetchFacet = async () => {
    fetchFacetError = ''
    if (!utils.isAddress(facetAddress)) {
      fetchFacetError = 'Invalid address.'
      return
    }

    if (allFacets.map((f) => f.address.toLowerCase()).includes(facetAddress.toLowerCase())) {
      fetchFacetError = 'Facet already exists.'
      return
    }

    const res = await fetch('/api/contract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ address: facetAddress, network }),
    })

    if (res.ok) {
      const facetData = await res.json()
      if (facetData.abi.length) {
        facet = facetData
        methods = getFacetMethods(facetAddress, facetData.abi)
        return
      }
      fetchFacetError = 'Facet is not verified.'
      return
    }

    fetchFacetError = 'Error fetching facet details.'
  }

  const closeModal = async () => {
    facet = undefined
    fetchFacetError = ''
    facetAddress = ''
    showModal = false
    error = null
    wallet.disconnect()
    $transactions.forEach((t) => transactions.acknowledge(t.hash, t.status))
    chainUnsub()
  }

  $: if ($flow.executionError) {
    error = $flow.executionError
    flow.cancel()
    wallet.acknowledgeError()
  }

  $: if ($flow.error) {
    error = $flow.error
    flow.cancel()
    wallet.acknowledgeError()
  }

  let chainUnsub = chain.subscribe(async (c) => {
    if (!$wallet.disconnecting && c.chainId && NETWORKS[network].chainId !== c.chainId) {
      await wallet.disconnect()
      alert(`Invalid network. Pleae connect to ${network}.`)
    }
  })
  onDestroy(() => {
    error = null
    chainUnsub()
  })
</script>

{#if showModal}
  <div class="flex justify-center">
    <div class="rounded-box bg-base-300 p-10 w-2/3">
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-2xl font-medium leading-6 mb-5">Add New Facet</h3>

        {#if fetchFacetError}
          <div class="alert alert-error mt-2">
            <div class="flex-1">
              <span class="text-2xl mr-2">🛑</span>
              <label for="">
                {fetchFacetError}
              </label>
            </div>
          </div>
        {/if}
      </div>
      {#if $wallet.state !== 'Ready'}
        <div class="container flex justify-center mt-5 gap-2">
          {#if $builtin.available}
            <button class="btn btn-sm glass bg-primary" on:click={() => connect()}>
              Connect
            </button>
          {/if}
          <button class="btn btn-sm glass bg-primary" on:click={() => connect('walletconnect')}>
            Connect w/ WalletConnect
          </button>
        </div>
      {:else}
        {#if !facet}
          <div class="flex items-end">
            <div class="form-control w-2/3">
              <label class="label" for="">
                <span class="label-text">Facet Address</span>
              </label>
              <input
                type="text"
                bind:value={facetAddress}
                class="rounded-xl m-2 input input-primary input-bordered bg-base-200"
              />
            </div>
            <button class="btn bg-primary btn-sm glass mb-4" on:click={fetchFacet}>
              Fetch Facet Info
            </button>
          </div>
        {/if}

        {#if facet}
          <table class="table table-compact w-full">
            <thead>
              <tr>
                <th>Add</th>
                <th>Method</th>
                <th class="text-right"><span class="mr-3">Selector</span></th>
              </tr>
            </thead>
            {#each methods as method}
              <tr>
                <th><input type="checkbox" bind:group={selectors} value={method.selector} /></th>
                <td>{method.signature}</td>
                <td class="text-right">
                  <span class="badge badge-info badge-outline font-bold">{method.selector}</span>
                </td>
              </tr>
            {/each}
          </table>

          <div class="mb-2">
            <p
              class="leading-5 bg-neutral-focus text-neutral-content w-full p-5 rounded-box overflow-auto"
            >
              {#if $wallet.pendingUserConfirmation}
                Please check and approve the transaction in your wallet.
              {/if}

              {#if $flow.inProgress}
                <div class="self-center">
                  <Loading />
                </div>
              {/if}

              {#if error}
                <div class="self-center">
                  <p class="text-red-500 font-semibold">
                    {error.message}
                  </p>
                </div>
              {/if}
              {#each $transactions as transaction}
                TX Hash: <a
                  class="text-info"
                  href={getExplorerTxUrl(transaction.hash, network)}
                  target="_blank"
                >
                  {transaction.hash}
                </a>
                <span class="uppercase font-semibold">
                  {transaction.status}
                </span>
              {/each}
            </p>
          </div>

          <div class="flex justify-center">
            <button
              class="btn btn-xl glass bg-primary"
              on:click={() => flow.execute((contracts) => contracts.facet['diamondCut'](...args))}
            >
              <svg
                class="w-6 h-6 mr-1"
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
              ADD FACET
            </button>
          </div>
        {/if}
      {/if}

      <!-- One big close button.  --->
      <div class="mt-5 sm:mt-6">
        <div class="flex rounded-md w-full justify-center">
          <button class="btn btn-sm glass bg-primary" on:click={closeModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
{/if}
