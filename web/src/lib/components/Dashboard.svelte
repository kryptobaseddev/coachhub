<script>
  import SystemStatus from './SystemStatus.svelte';
  import Controls from './Controls.svelte';
</script>

<div class="flex-1 p-10 bg-gray-100">
  <h1 class="text-3xl font-bold mb-6">Welcome to CoachHub</h1>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <SystemStatus />
    <Controls />
  </div>
</div>