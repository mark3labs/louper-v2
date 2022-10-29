<script lang="ts">
  import { fade } from 'svelte/transition'
  import Loading from '$lib/components/Loading.svelte'
  import type { Facet, Method } from '../../types/entities'
  import ContractReader from '../services/contractReader'
  import Tags from 'svelte-tags-input'
  import { BigNumber } from 'ethers'
  import {} from 'os'

  export let address: string
  export let network: string
  export let showModal = false
  export let facet: Facet | undefined = undefined

  let selectedMethod: Method | null = null
  let readResult: Promise<object> | string = ''
  let args: any[] = []

  const reader = new ContractReader(address, network)
</script>

{#if showModal && facet}
  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left bg-base-200 p-10 rounded-box">
    <h3 class="text-2xl font-medium leading-6 mb-5">
      Read {facet.name}
    </h3>

    <!-- svelte-ignore a11y-no-onchange -->
    <div class="form-control w-full max-w-xs">
      <label for="selectMethod" class="label"> Choose a Method to Interact With </label>
      <select
        name="selectMethod"
        class="select select-bordered"
        bind:value={selectedMethod}
        on:change={() => {
          args = []
          readResult = ''
        }}
      >
        <option value={null}> Select a method </option>
        {#each facet.methods.filter((m) => m.fragment.constant) as method}
          <option value={method} class="font-semibold">
            {method.fragment.name}
          </option>
        {/each}
      </select>
    </div>
    {#if selectedMethod}
      <form
        on:submit|preventDefault={() => (readResult = reader.read(selectedMethod.fragment, args))}
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
                on:tags={(event) => (args[i] = event.detail.tags)}
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
        <button type="submit" class="btn btn-sm bg-primary glass mt-3">Read</button>
      </form>

      <h2 class="text-lg font-semibold mt-5">Result</h2>
      <div class="mt-2 flex justify-center h-72">
        <p
          class="leading-5 bg-neutral-focus text-neutral-content w-full p-5 rounded-box overflow-auto"
        >
          {#await readResult}
            <div class="self-center">
              <Loading />
            </div>
          {:then res}
            {#if res}
              <pre class="text-xs md:text-base text-base-content">
                {JSON.stringify(
                  res.data,
                  (k, v) => {
                    if (typeof v === 'object' && v.type === 'BigNumber') {
                      return BigNumber.from(v.hex).toString()
                    }
                    return v
                  },
                  2,
                )}
              </pre>
            {/if}
          {:catch error}
            Whoops! Something went wrong...
          {/await}
        </p>
      </div>
    {/if}
  </div>

  <!-- One big close button.  --->
  <div class="mt-5 sm:mt-6">
    <div class="flex rounded-md w-full justify-center">
      <button
        class="btn btn-sm glass bg-primary"
        on:click={() => {
          showModal = false
          selectedMethod = null
          readResult = ''
          args = []
        }}
      >
        Close
      </button>
    </div>
  </div>
{/if}
