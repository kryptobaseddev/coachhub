<!-- src/routes/+page.svelte -->
<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
  
    onMount(() => {
      goto('/dashboard');
    });
  </script>
  
  <div class="flex items-center justify-center min-h-screen">
    <div class="text-center">
      <h1 class="text-2xl font-bold mb-4">Loading...</h1>
    </div>
  </div>