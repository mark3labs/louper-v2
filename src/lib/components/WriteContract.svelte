<script lang="ts">
  import { fade } from 'svelte/transition'
  import Loading from './Loading.svelte'
  import Tags from 'svelte-tags-input'
  import type { Facet, Method } from '../../types/entities'
  import { initWeb3W } from 'web3w'
  import { getExplorerTxUrl } from '../utils'
  import { onDestroy } from 'svelte'
  import { NETWORKS } from '$lib/config'

  export let address: string
  export let network: string
  export let showModal = false
  export let facet: Facet | undefined = undefined

  const { wallet, builtin, flow, transactions, chain } = initWeb3W({})

  let selectedMethod: Method | null = null
  let args: any[] = []
  let error: any = null

  const connect = async (option = 'builtin') => {
    try {
      await wallet.connect(option)
      await chain.updateContracts({
        chainId: NETWORKS[network].chainId,
        contracts: {
          facet: {
            address,
            abi: facet.methods.map((m) => m.fragment),
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
    selectedMethod = null
    args = []
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
      alert(`Invalid network. Pleae connect to ${network}.`)
    }
  })
  onDestroy(async () => {
    error = null
    args = []
    chainUnsub()
  })
</script>

{#if showModal && facet}
  <div
    transition:fade={{ duration: 250 }}
    class="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center w-full h-full px-5 bg-black bg-opacity-75"
  >
    <!-- A basic modal dialog with title, body and one button to close -->
    <div
      class="h-auto text-left min-w-full fixed  md:min-w-0 md:w-1/2 rounded shadow-xl p-8 mx-12 bg-base-100 text-base-content"
    >
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <h3 class="text-2xl font-medium leading-6 mb-5">
          Write {facet.name}
        </h3>
        {#if $wallet.state !== 'Ready'}
          {#if $builtin.available}
            <button class="btn btn-sm glass bg-primary" on:click={() => connect()}>
              Connect
            </button>
          {/if}
          <button class="btn btn-sm glass bg-primary" on:click={() => connect('walletconnect')}>
            Connect w/ WalletConnect
          </button>
        {/if}

        {#if $wallet.state === 'Ready'}
          <div class="form-control w-full max-w-xs">
            <label for="selectMethod" class="label"> Choose a Method to Interact With </label>
            <!-- svelte-ignore a11y-no-onchange -->
            <select
              name="selectMethod"
              class="select select-bordered"
              bind:value={selectedMethod}
              on:change={() => {
                args = []
                error = null
              }}
            >
              <option value={null}> Select a method </option>
              {#each facet.methods.filter((m) => !m.fragment.constant) as method}
                <option value={method} class="font-semibold">
                  {method.fragment.name}
                </option>
              {/each}
            </select>
          </div>
        {/if}
        {#if selectedMethod}
          <form
            on:submit|preventDefault={() => {
              error = null
              flow.execute((contracts) => contracts.facet[selectedMethod.fragment.name](...args))
            }}
            class="py-3"
          >
            <h3 class="text-lg font-semibold">
              {selectedMethod.fragment.name}
            </h3>
            {#each selectedMethod.fragment.inputs as input, i}
              <div class="ml-2 inline-block mr-2 form-control">
                <label for={input.name} class="label">
                  <span class="label-text">{input.name}</span>
                  <span class="badge font-mono font-thin">{input.type}</span>
                </label>
                {#if input.type.indexOf('[]') > -1}
                  <Tags
                    on:tags={(event) => args[i] = event.detail.tags} 
                    allowPaste 
                    class="border-2 rounded m-2 input input-primary input-bordered"
                  />
                {:else if input.type === 'bool'}
                  <input type="checkbox" name={input.name} bind:checked={args[i]} />
                {:else}
                  <input
                    type="text"
                    name={input.name}
                    bind:value={args[i]}
                    class="border-2 rounded m-2 input input-primary input-bordered"
                  />
                {/if}
              </div>
            {/each}
            <button type="submit" class="btn btn-sm glass bg-primary mt-3"> Execute </button>
          </form>
          <h2 class="text-lg font-semibold mt-5">Result</h2>
          <div class="mt-2 flex justify-center h-72">
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
        {/if}
      </div>

      <!-- One big close button.  --->
      <div class="mt-5 sm:mt-6">
        <div class="flex rounded-md w-full justify-center">
          <button class="btn btn-sm glass bg-primary" on:click={closeModal}>Close</button>
        </div>
      </div>
    </div>
  </div>
{/if}
