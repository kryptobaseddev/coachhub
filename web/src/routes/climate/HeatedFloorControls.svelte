<!-- src/routes/climate/HeatedFloorControls.svelte -->

<!-- Features:

Individual zone control
Temperature monitoring
Target temperature setting
Heating status indication -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Footprints, Power, ThermometerSun } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let floors;
  const dispatch = createEventDispatcher();

  function updateFloor(floor, updates) {
    dispatch('update', {
      deviceId: floor.id,
      type: 'heatedFloors',
      updates
    });
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Footprints class="text-orange-500" />
      <h2 class="text-lg font-medium">Heated Floors</h2>
    </div>
  </div>

  <div class="divide-y">
    {#each floors as floor (floor.id)}
      <div class="p-4" transition:slide>
        <div class="flex items-center justify-between mb-4">
          <div>
            <span class="font-medium">{floor.name}</span>
            <div class="text-sm text-gray-500 mt-1">Current: {floor.currentTemp}°F</div>
          </div>
          <button
            class="p-2 rounded-full {floor.state === 'on' ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-600'}"
            on:click={() => updateFloor(floor, { state: floor.state === 'on' ? 'off' : 'on' })}
          >
            <Power size={16} />
          </button>
        </div>

        {#if floor.state === 'on'}
          <div class="space-y-2" transition:slide>
            <div class="flex justify-between">
              <label for="target-temp-{floor.id}" class="text-sm text-gray-600">Target Temperature</label>
              <span class="text-sm font-medium">{floor.targetTemp}°F</span>
            </div>
            <input
              id="target-temp-{floor.id}"
              type="range"
              min="65"
              max="85"
              step="1"
              bind:value={floor.targetTemp}
              on:change={() => updateFloor(floor, { targetTemp: floor.targetTemp })}
              class="w-full"
            />
            <div class="flex justify-between text-sm text-gray-500">
              <span>65°F</span>
              <span>85°F</span>
            </div>

            {#if floor.currentTemp < floor.targetTemp}
              <div class="bg-orange-50 text-orange-600 p-3 rounded-md text-sm">
                Heating to target temperature...
              </div>
            {/if}
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>