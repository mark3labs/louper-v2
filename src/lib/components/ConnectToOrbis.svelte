<script lang="ts">
  import user from '$lib/stores/user'
  import orbis from '$lib/stores/orbis'

  const connect = async () => {
    const res = await $orbis.connect()
    $user = res.details
  }
</script>

<button
  class="btn bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white font-bold"
  on:click={connect}
>
  Sign In
</button>
