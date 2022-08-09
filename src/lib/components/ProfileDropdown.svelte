<script>
  import profile from '$lib/stores/profile'

  console.log($profile)

  const disconnect = () => {
    localStorage.removeItem('ceramic-session')
    $profile = null
  }
</script>

{#if $profile}
  <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn m-1" for>
      {#if $profile.profile}
        <img src={$profile.profile.pfp} alt="" class="rounded-full bg-base-300 h-8 w-8 mr-3" />
      {:else}
        <div class="rounded-full h-8 w-8 bg-gray-500 mr-3" />
      {/if}
      {$profile.profile
        ? $profile.profile.username
        : `${$profile.metadata.address.substring(0, 5)}-${$profile.metadata.address.substring(
            $profile.metadata.address.length - 5,
          )}`}
    </label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
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
      <li on:click={disconnect}>
        <a href>
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
