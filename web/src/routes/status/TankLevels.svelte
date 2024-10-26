<!-- src/routes/status/TankLevels.svelte -->

<!-- Features:

Visual level indicators
Capacity information
Warning messages for low/high levels
Color-coded status -->

<script>
  import { Droplet } from 'lucide-svelte';

  export let tanks;

  function getTankColor(level) {
    if (level <= 25) return 'red';
    if (level <= 50) return 'yellow';
    return 'green';
  }

  function getWarningMessage(tankName, level) {
    if (tankName === 'fresh' && level <= 25) {
      return 'Fresh water low';
    } else if ((tankName === 'grey' || tankName === 'black') && level >= 75) {
      return `${tankName} tank needs emptying`;
    }
    return null;
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Droplet class="text-blue-500" />
      <h2 class="text-lg font-medium">Tank Levels</h2>
    </div>
  </div>

  <div class="divide-y">
    {#each Object.entries(tanks) as [tankName, tank]}
      <div class="p-4">
        <div class="flex justify-between mb-2">
          <span class="font-medium capitalize">{tankName} Water</span>
          <span class="text-sm">{tank.level}% of {tank.capacity} {tank.unit}</span>
        </div>

        <div class="relative h-4 bg-gray-200 rounded overflow-hidden">
          <div
            class="absolute top-0 left-0 h-full transition-all duration-500 rounded"
            class:bg-red-500={getTankColor(tank.level) === 'red'}
            class:bg-yellow-500={getTankColor(tank.level) === 'yellow'}
            class:bg-green-500={getTankColor(tank.level) === 'green'}
            style="width: {tank.level}%"
          ></div>
        </div>

        {#if getWarningMessage(tankName, tank.level)}
          <div class="mt-2 text-sm text-red-600 flex items-center space-x-1">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{getWarningMessage(tankName, tank.level)}</span>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>