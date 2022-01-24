<script lang="ts">
  import { fade } from 'svelte/transition'
  import Loading from '$lib/components/Loading.svelte'
  import type { Facet, Method } from '../../types/entities'
  import ContractReader from '../services/contractReader'

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
  <div
    transition:fade={{ duration: 250 }}
    class="fixed mt-0 z-10 inset-0 overflow-y-auto flex items-center justify-center w-full h-full bg-black bg-opacity-75"
  >
    <!-- A basic modal dialog with title, body and one button to close -->
    <div
      class="h-auto text-left min-w-full fixed  md:min-w-0 md:w-1/2 rounded shadow-xl p-8 mx-12 bg-base-100 text-base-content"
    >
      <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
            on:submit|preventDefault={() =>
              (readResult = reader.read(selectedMethod.fragment, args))}
            class="py-3"
          >
            <h3 class="text-lg font-semibold">
              {selectedMethod.fragment.name}
            </h3>
            {#each selectedMethod.fragment.inputs as input, i}
              <div class="ml-2 inline-block mr-2 form-control">
                <label for={input.name} class="label">
                  <span class="label-text">{input.name}</span>
                </label>
                <input
                  type="text"
                  name={input.name}
                  bind:value={args[i]}
                  class="border-2 rounded m-2 input input-primary input-bordered"
                />
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
                  <pre class="text-xs md:text-base text-info">
                    <code>
                    {JSON.stringify(res.data, undefined, 2)}
                    </code>
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
    </div>
  </div>
{/if}
