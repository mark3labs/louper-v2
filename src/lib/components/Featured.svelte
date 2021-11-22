<script>
  import { goto } from '$app/navigation'

  const diamonds = [
    {
      name: 'Aavegotchi',
      icon: '/img/aavegotchi-polygon-logo.jpg',
      url: '/diamond/0x86935F11C86623deC8a25696E1C19a8659CbF95d?network=polygon'
    },
    {
      name: 'Aavegotchi Staking',
      icon: '/img/aavegotchi-mainnet-logo.png',
      url: '/diamond/0x93eA6ec350Ace7473f7694D43dEC2726a515E31A'
    },
    {
      name: 'BarnBridge',
      icon: '/img/barnbridge-logo.jpg',
      url: '/diamond/0x10e138877df69Ca44Fdc68655f86c88CDe142D7F'
    },
    {
      name: 'Beanstalk',
      icon: '/img/beanstalk-logo.png',
      url: '/diamond/0xC1E088fC1323b20BCBee9bd1B9fC9546db5624C5'
    },
    {
      name: 'PieDAO',
      icon: '/img/piedao-logo.png',
      url: '/diamond/0x17525E4f4Af59fbc29551bC4eCe6AB60Ed49CE31'
    },
    {
      name: 'Gelato V2',
      icon: '/img/gelato-logo.png',
      url: '/diamond/0x3CACa7b48D0573D793d3b0279b5F0029180E83b6'
    }
  ]
</script>

<div class="text-center text-4xl">Featured Diamonds</div>
<div
  class="grid  grid-cols-2 lg:grid-cols-3 bg-base-300 p-5 gap-5 rounded-box lg:w-1/2 place-self-center"
>
  {#each diamonds as diamond}
    <div class="card glass shadow-xl text-center cursor-pointer" on:click={() => goto(diamond.url)}>
      <div class="justify-end card-body">
        <figure class="">
          <img src={diamond.icon} class="rounded-full shadow-xl" alt={diamond.name} />
        </figure>
        <h2 class="card-title text-xs my-2 lg:text-lg">{diamond.name}</h2>
      </div>
    </div>
  {/each}
</div>
