<script lang="ts">
  import user from '$lib/stores/user'
  import { shortProfile } from '$lib/utils'
  import orbis from '$lib/stores/orbis'

  const disconnect = async () => {
    await $orbis.logout()
    $user = null
  }
</script>

{#if $user}
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn m-1 bg-gradient-to-r from-primary to-secondary text-xs" for="">
      {#if $user.profile}
        <img src={$user.profile.pfp} alt="" class="rounded-full bg-base-300 h-6 w-6 mr-3" />
      {:else}
        <div class="rounded-full h-8 w-8 bg-gray-500 mr-3" />
      {/if}
      {$user.profile ? $user.profile.username : shortProfile($user.metadata.address)}
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-52">
      <li>
        <a href="/bookmarks">
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          Bookmarks
        </a>
      </li>
      <li>
        <a href="*" on:click|preventDefault={disconnect}>
          <svg
            class="w-6 h-6 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </a>
      </li>
    </ul>
  </div>
{/if}
