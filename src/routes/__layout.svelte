<script>
  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import Notifications from 'svelte-notifications'
  import Loading from '$lib/components/Loading.svelte'
  import '../app.css'
  import navigationState from '$lib/stores/navigationState'
  import TransactionNotification from '$lib/components/TransactionNotification.svelte'
  import ConnectToOrbis from '$lib/components/ConnectToOrbis.svelte'
  import ProfileDropdown from '$lib/components/ProfileDropdown.svelte'
  import user from '$lib/stores/user'
  import orbis from '$lib/stores/orbis'
  import { onMount } from 'svelte'
  import { browser } from '$app/env'

  onMount(async () => {
    if (browser) {
      const res = await $orbis.isConnected()
      if (res.details) {
        $user = res.details
      }
    }
  })

  beforeNavigate(() => {
    $navigationState = 'loading'
  })

  afterNavigate(() => {
    $navigationState = 'loaded'
  })
</script>

<Notifications item={TransactionNotification}>
  <div class="flex flex-col h-screen justify-between bg-base-100 text-base-content">
    <div class="navbar shadow-lg bg-base text-base-content fixed w-full z-20 bg-base-100">
      <div class="px-2 mx-2 navbar-start">
        <span class="text-lg font-bold hidden lg:inline-block">
          <img src="/louper-logo.png" alt="Louper" class="h-12 inline" />
          Louper - The Ethereum Diamond Inspector
        </span>
        <span class="text-lg font-bold lg:hidden">
          <img src="/louper-logo.png" alt="Louper" class="h-10 inline" />
          Louper
        </span>
      </div>
      <div class="hidden px-2 mx-2 navbar-center lg:flex">
        <div class="flex items-stretch">
          <a class="btn btn-ghost btn-sm rounded-btn" href="/"> Home </a>
          <a
            class="btn btn-ghost btn-sm rounded-btn"
            href="https://eips.ethereum.org/EIPS/eip-2535"
            target="_blank"
          >
            Diamond Standard (EIP-2535)
          </a>
          <a
            class="btn btn-ghost btn-sm rounded-btn"
            href="https://github.com/mark3labs/louper-v2"
            target="_blank"
          >
            Github
          </a>
          <a
            class="btn btn-ghost btn-sm rounded-btn"
            href="https://gitcoin.co/grants/1988/louper-tool-for-inspecting-diamond-eip-2535-smart"
            target="_blank"
          >
            Support Us On Gitcoin
          </a>
          <a
            class="btn btn-ghost btn-sm rounded-btn"
            href="https://discord.com/channels/730508054143172710/951483625092816976"
            target="_blank"
          >
            Discord
          </a>
        </div>
      </div>
      <div class="navbar-end">
        {#if $user !== null}
          <ProfileDropdown />
        {:else}
          <ConnectToOrbis />
        {/if}
      </div>
    </div>
    <div class="container md:mx-auto mt-24 p-2">
      <main>
        {#if $navigationState === 'loading'}
          <Loading />
        {:else}
          <slot />
        {/if}
      </main>
    </div>
    <footer class="items-center p-4 footer bg-base-300 text-base-content text-xs lg:text-base">
      <div class="items-center grid-flow-col">
        <p>Copyright © 2022</p>
        <a href="https://mark3labs.com" target="_blank">
          <img src="/img/mark3labslogo.png" alt="Mark III Labs, LLC" class="h-6 invert" />
        </a>
        <p>All right reserved</p>
      </div>
      <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <a href="https://twitter.com/louper_dev" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-twitter"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z"
            />
          </svg>
        </a>

        <a href="https://github.com/mark3labs/louper" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="icon icon-tabler icon-tabler-brand-github"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
            />
          </svg>
        </a>
      </div>
    </footer>
  </div>
</Notifications>
