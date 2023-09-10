<script lang="ts">
  import Loading from '$lib/components/Loading.svelte'
  import type { Facet } from '../../types/entities'
  import { ethers } from 'ethers'
  import { initWeb3W } from 'web3w'
  import { WalletConnectModuleLoader } from 'web3w-walletconnect-loader'
  import { onMount, onDestroy } from 'svelte'
  import { NETWORKS } from '$lib/config'

  export let facet: Facet | undefined = undefined
  export let address: string
  export let network: string
  export let showModal = false

  let error: any = null
  let args: any = {}
  let selectors: string[] = []

  const FacetCutAction = {
    Add: 0,
    Replace: 1,
    Remove: 2,
  }

  let { wallet, builtin, flow, transactions, chain } = initWeb3W({})

  const iface = new ethers.Interface([
    'function diamondCut(tuple(address facetAddress, uint8 action, bytes4[] functionSelectors)[],address initAddress, bytes callData) external',
  ])

  $: if (facet) {
    args = [
      [
        {
          facetAddress: ethers.ZeroAddress,
          action: FacetCutAction.Remove,
          functionSelectors: selectors,
        },
      ],
      ethers.ZeroAddress,
      '0x',
    ]
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

  const closeModal = async () => {
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

  let chainUnsub = chain.subscribe(async (c) => {
    if (!$wallet.disconnecting && c.chainId && NETWORKS[network].chainId !== c.chainId) {
      await wallet.disconnect()
      alert(`Invalid network. Please connect to ${network}.`)
    }
  })

  onMount(() => {
    ;({ wallet, builtin, flow, transactions, chain } = initWeb3W({
      options: [
        new WalletConnectModuleLoader({
          nodeUrl: NETWORKS[network].rpcUrl,
          chainId: NETWORKS[network].chainId,
        }),
      ],
    }))
  })

  onDestroy(() => {
    error = null
    chainUnsub()
  })
</script>

{#if showModal && facet}
  <div class="mt-3 sm:mt-0 sm:ml-4 rounded-box bg-base-200 flex flex-col p-10">
    <h3 class="text-2xl font-medium leading-6 mb-5">
      Remove {facet.name}
    </h3>

    <div class="alert alert-error">
      <div class="flex-1">
        <span class="text-2xl mr-2">💀</span>
        <label for="">
          This is a BETA feature and may break your diamond contract. This will remove this facet
          and all selectors from this contract!
        </label>
      </div>
    </div>

    <div class="container flex mt-5 gap-2">
      {#if $wallet.state !== 'Ready'}
        {#if $builtin.available}
          <button class="btn btn-sm glass bg-primary" on:click={() => connect()}>
            Connect With Metamask
          </button>
        {/if}
        <button class="btn btn-sm glass bg-primary" on:click={() => connect('walletconnect')}>
          Connect With WalletConnect
        </button>
      {/if}
    </div>

    {#if $wallet.state === 'Ready'}
      {#if facet}
        <div class="overflow-x-auto">
          <table class="table table-compact w-full">
            <thead>
              <tr>
                <th>Remove</th>
                <th>Method</th>
                <th class="text-right"><span class="mr-3">Selector</span></th>
              </tr>
            </thead>
            {#each facet.methods as method}
              <tr>
                <th><input type="checkbox" bind:group={selectors} value={method.selector} /></th>
                <td>{method.signature}</td>
                <td class="text-right">
                  <span class="badge badge-info badge-outline font-bold">{method.selector}</span>
                </td>
              </tr>
            {/each}
          </table>
        </div>
      {/if}

      <div class="flex">
        <button
          class="btn btn-sm glass mt-3 bg-error"
          on:click={() =>
            flow.execute(async (contracts) => {
              const tx = await contracts.facet['diamondCut'](...args)
              await tx.wait()
              window.location.reload()
            })}
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          REMOVE
        </button>
      </div>
      <div class="mt-5">
        <p class="w-full">
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
        </p>
      </div>
    {/if}
  </div>
  <!-- One big close button.  --->
  <div class="mt-5 sm:mt-6">
    <div class="flex rounded-md w-full justify-center">
      <button class="btn btn-sm glass bg-primary" on:click={closeModal}>Close</button>
    </div>
  </div>
{/if}
