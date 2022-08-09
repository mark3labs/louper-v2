<script lang="ts">
  import orbis from '$lib/stores/orbis'
  import { onMount } from 'svelte'
  import user from '$lib/stores/user'
  import { shortProfile } from '$lib/utils'

  export let diamond
  let comments = []
  let newComment = null
  let context = `https://louper.dev/diamond/${diamond.address}?network=${diamond.network}`
  let pending = false

  onMount(async () => {
    let { data, error } = await $orbis.getPosts({
      context,
    })

    if (error) {
      console.log(error)
    }

    comments = data
  })

  const postComment = async () => {
    if (!newComment) {
      return
    }
    try {
      pending = true

      await $orbis.createPost({
        body: newComment,
        context,
      })

      newComment = null
      let { data, error } = await $orbis.getPosts({
        context,
      })

      if (error) {
        console.log(error)
      }

      comments = data
    } catch (err) {
      console.log(err)
    } finally {
      pending = false
    }
  }
</script>

<div class="rounded-box bg-base-300 text-base-content collapse collapse-arrow">
  <input type="checkbox" />
  <div class="collapse-title text-xl font-medium">
    <svg
      class="w-8 h-8 mr-2 inline"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
      />
    </svg>
    Comments
  </div>
  <div class="collapse-content overflow-y-auto">
    {#if $user}
      {#each comments as comment}
        <div class="p-3 text-xs font-bold">
          {comment.creator_details.profile
            ? comment.creator_details.profile.username
            : shortProfile(comment.creator_details.metadata.address)}
        </div>
        <div class="border-b border-base-300 p-3 text-xl">
          {comment.content.body}
        </div>
      {/each}
      <div class="p-2">
        <textarea
          name="comment"
          class="textarea textarea-primary w-full my-2 text-xl"
          placeholder="Leave a Comment"
          bind:value={newComment}
          disabled={pending}
        />
        <div class="text-right">
          <button class="btn btn-sm glass bg-primary" disabled={pending} on:click={postComment}>
            Post
          </button>
        </div>
      </div>
    {/if}
  </div>
</div>
