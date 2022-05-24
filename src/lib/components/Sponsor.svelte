<script>
  import { goto } from '$app/navigation'
</script>

<div class="card bg-base-300 shadow-xl">
  <div class="card-body">
    <h2 class="card-title">Sponsor Louper</h2>
    <p>Reach thousands of Blockchain Enthusiasts & Developers Worldwide</p>
    <div class="card-actions justify-end">
      <button class="btn btn-primary" on:click={() => goto('/sponsor')}>Contact Us</button>
    </div>
  </div>
</div>
