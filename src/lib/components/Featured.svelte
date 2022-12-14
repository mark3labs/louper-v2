<script>
  import { goto } from '$app/navigation'
  import navigationState from '$lib/stores/navigationState'

  const diamonds = [
    {
      name: 'Aavegotchi',
      description: 'DeFi-enabled crypto collectibles game on Polygon.',
      icon: '/img/aavegotchi-polygon-logo.jpg',
      url: '/diamond/0x86935f11c86623dec8a25696e1c19a8659cbf95d?network=polygon',
      projectUrl: 'https://www.aavegotchi.com/',
    },
    {
      name: 'EscaBro',
      description: 'Multi-chain smart contract escrow payments service.',
      icon: '/img/escabro-logo.png',
      url: '/diamond/0xa06fdba8774806654bc8b09f81ea74d8c98c1560',
      projectUrl: 'https://escabro.com',
    },
    {
      name: 'BarnBridge',
      description:
        'A fluctuations derivatives protocol for hedging yield sensitivity and market price.',
      icon: '/img/barnbridge-logo.jpg',
      url: '/diamond/0x10e138877df69ca44fdc68655f86c88cde142d7f',
      projectUrl: 'https://barnbridge.com/',
    },
    {
      name: 'Beanstalk',
      description: 'A decentralized credit-based stablecoin protocol.',
      icon: '/img/beanstalk-logo.png',
      url: '/diamond/0xc1e088fc1323b20bcbee9bd1b9fc9546db5624c5',
      projectUrl: 'https://bean.money/',
    },
    {
      name: 'PieDAO',
      description:
        'PieDAO, the asset allocation DAO for decentralized market-weighted portfolio allocations.',
      icon: '/img/piedao-logo.png',
      url: '/diamond/0x17525e4f4af59fbc29551bc4ece6ab60ed49ce31',
      projectUrl: 'https://www.piedao.org/',
    },
    {
      name: 'Gelato V2',
      description:
        'Automated smart contract executions on Avalanche, Arbitrum, BSC, Fantom, Ethereum, Optimism, Polygon, and more.',
      icon: '/img/gelato-logo.png',
      url: '/diamond/0x3caca7b48d0573d793d3b0279b5f0029180e83b6',
      projectUrl: 'https://gelato.network',
    },
    {
      name: 'LIFI',
      description: 'Developer Solution Providing Advanced Bridge Aggregation with DEX Connectivity',
      icon: '/img/lifi.png',
      url: '/diamond/0x1231DEB6f5749EF6cE6943a275A1D3E7486F4EaE',
      projectUrl: 'https://li.fi',
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
            class="flex flex-col items-start justify-between p-6 space-y-4 overflow-hidden transition-shadow duration-200 bg-base-200 text-base-content bg-top bg-cover border border-base-100 shadow-xl rounded-2xl group hover:shadow-2xl cursor-pointer"
            on:click={() => goto(diamond.url)}
          >
            <div class="flex items-center justify-center w-10 h-10 text-center bg-top rounded-full">
              <p class="relative">
                <img src={diamond.icon} class="rounded-full shadow-xl" alt={diamond.name} />
              </p>
            </div>
            <p class="font-bold text-base-content">{diamond.name}</p>
            <p class="text-sm leading-5 text-gray-500">
              {diamond.description}
            </p>
            <div>
              <a href={diamond.projectUrl} target="_blank" class="text-secondary">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                  />
                </svg>
              </a>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
