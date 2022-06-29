<script lang="ts">
  import { getExplorerTxUrl } from '$lib/utils'
  export let notification = {
    status: null,
    network: null,
    text: null,
  }
  // `onRemove` function will be passed into your component.
  export let onRemove = null

  const handleButtonClick = () => {
    onRemove()
  }
</script>

<div class="relative">
  <div
    class="card bg-base-100 my-5 text-base-content bottom-0 right-5 shadow-xl z-50 border border-secondary"
  >
    <div class="card-body">
      <div class="card-actions justify-between">
        <h2
          class="card-title capitalize bg-neutral rounded-box p-2"
          class:text-success={notification.status === 'success'}
          class:text-info={notification.status === 'pending'}
          class:text-error={notification.status === 'failure'}
        >
          {#if notification.status === 'pending'}
            <svg
              class="w-6 h-6 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          {/if}
          {#if notification.status === 'success'}
            <svg
              class="w-6 h-6 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              />
            </svg>
          {/if}
          {#if notification.status === 'failure'}
            <svg
              class="w-6 h-6 inline-block"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          {/if}
          {notification.status}
        </h2>
        <button class="btn btn-circle btn-xs btn-secondary" on:click={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-3 w-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <a
        href={getExplorerTxUrl(notification.text, notification.network)}
        target="_blank"
        class="badge badge-secondary text-white p-3 cursor-pointer text-xs lg:text-base"
      >
        {notification.text.substring(0, 15)}...{notification.text.substring(
          notification.text.length - 15,
        )}
        <svg
          class="w-3 h-3 md:w-4 md:h-4 inline ml-2"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"
          />
          <path
            d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"
          />
        </svg>
      </a>
    </div>
  </div>
</div>
