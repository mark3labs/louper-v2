<script>
  import { goto } from '$app/navigation'

  export let address = ''
  export let network = 'mainnet'
</script>

<div class="text-center text-4xl ">Search by Address</div>
<div class="grid grid-flow-col card bg-base-300 rounded-box p-2">
  <div class="form-control">
    <div class="relative">
      <input
        type="text"
        placeholder="0x..."
        bind:value={address}
        class="w-full pr-16 input text-2xl bg-base-300 text-base-content"
      />
      <select
        class="select select-sm absolute top-2 right-14 mr-3 bg-base-300"
        bind:value={network}
      >
        <option value="mainnet" class="font-semibold">🟢 Mainnet</option>
        <option value="ropsten" class="font-semibold">🧪 Ropsten</option>
        <option value="kovan" class="font-semibold">🧪 Kovan</option><option
          value="rinkeby"
          class="font-semibold"
        >
          🧪 Rinkeby
        </option>
        <option value="goerli" class="font-semibold">🧪 Goerli</option><option
          value="xdai"
          class="font-semibold">🟡 xDAI</option
        >
        <option value="polygon" class="font-semibold">🔵 Polygon (Matic)</option>
        <option value="mumbai" class="font-semibold">🧪 Mumbai</option>
        <option value="binance" class="font-semibold">🟠 Binance (BSC)</option>
      </select>
      <button
        class="absolute top-0 right-0 btn border-0 bg-gradient-to-r from-primary to-secondary"
        on:click={() => goto(`/diamond/${address}?network=${network}`)}
      >
        🔎
      </button>
    </div>
  </div>
</div>
