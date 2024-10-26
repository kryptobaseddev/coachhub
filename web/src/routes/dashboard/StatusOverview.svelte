<!-- src/routes/dashboard/StatusOverview.svelte -->
<!-- Features:

Battery level display
Tank levels for all tanks
Generator status display -->

<script>
  import { Battery, Droplet, Power } from 'lucide-svelte';
  
  export let systemStatus;

  $: tanks = systemStatus.tanks;
  $: power = systemStatus.power;
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <h2 class="text-lg font-medium">System Status</h2>
  </div>
  
  <div class="p-4 space-y-4">
    <!-- Power Status -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <Battery class="text-blue-500" />
        <span>Battery</span>
      </div>
      <span class="font-medium">{power.inverter.batteryLevel}%</span>
    </div>

    <!-- Tank Levels -->
    {#each Object.entries(tanks) as [tankName, tank]}
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <Droplet class="text-blue-500" />
          <span class="capitalize">{tankName}</span>
        </div>
        <span class="font-medium">{tank.level}%</span>
      </div>
    {/each}

    <!-- Generator Status -->
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-3">
        <Power class="text-blue-500" />
        <span>Generator</span>
      </div>
      <span class="font-medium capitalize">{power.generator.state}</span>
    </div>
  </div>
</div>