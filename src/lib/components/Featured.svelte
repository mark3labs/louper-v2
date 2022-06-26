<script>
  import { goto } from '$app/navigation'
  import navigationState from '../../stores/navigationState'

  const diamonds = [
    {
      name: 'Aavegotchi',
      description: 'DeFi-enabled crypto collectibles game on Polygon.',
      icon: '/img/aavegotchi-polygon-logo.jpg',
      url: '/diamond/0x86935F11C86623deC8a25696E1C19a8659CbF95d?network=polygon',
    },
    {
      name: 'EscaBro',
      description: 'Multi-chain smart contract escrow payments service.',
      icon: '/img/escabro-logo.png',
      url: '/diamond/0xa06FdBA8774806654bc8b09F81Ea74d8C98C1560',
    },
    {
      name: 'BarnBridge',
      description: 'A fluctuations derivatives protocol for hedging yield sensitivity and market price.',
      icon: '/img/barnbridge-logo.jpg',
      url: '/diamond/0x10e138877df69Ca44Fdc68655f86c88CDe142D7F',
    },
    {
      name: 'Beanstalk',
      description: 'A decentralized credit-based stablecoin protocol.',
      icon: '/img/beanstalk-logo.png',
      url: '/diamond/0xC1E088fC1323b20BCBee9bd1B9fC9546db5624C5',
    },
    {
      name: 'PieDAO',
      description: 'PieDAO, the asset allocation DAO for decentralized market-weighted portfolio allocations.',
      icon: '/img/piedao-logo.png',
      url: '/diamond/0x17525E4f4Af59fbc29551bC4eCe6AB60Ed49CE31',
    },
    {
      name: 'Gelato V2',
      description: 'Automated smart contract executions on Avalanche, Arbitrum, BSC, Fantom, Ethereum, Optimism, Polygon, and more.',
      icon: '/img/gelato-logo.png',
      url: '/diamond/0x3CACa7b48D0573D793d3b0279b5F0029180E83b6',
    },
  ]
</script>

<div class="text-center text-4xl">Featured Diamonds</div>
<section class="bg-base-300 rounded-box">
  <div class="relative">
    <div
      class="relative px-6 py-8 ml-auto mr-auto bg-top bg-cover sm:py-16 max-w-7xl md:px-24 lg:px-16 lg:py-20"
    >
      <div class="relative grid gap-6 bg-top bg-cover sm:grid-cols-2 lg:grid-cols-4">
        {#each diamonds as diamond}
          <div
            class="flex flex-col items-start justify-start p-6 space-y-4 overflow-hidden transition-shadow duration-200 bg-base-200 text-base-content bg-top bg-cover border border-base-100 shadow-xl rounded-2xl group hover:shadow-2xl cursor-pointer"
            on:click={() => goto(diamond.url)}
          >
            <div
              class="flex items-center justify-center w-10 h-10 text-center bg-top bg-cover rounded-full bg-indigo-50"
            >
              <p class="relative">
                <img src={diamond.icon} class="rounded-full shadow-xl" alt={diamond.name} />
              </p>
            </div>
            <p class="font-bold text-base-content">{diamond.name}</p>
            <p class="text-sm leading-5 text-gray-500">
              {diamond.description}
            </p>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
