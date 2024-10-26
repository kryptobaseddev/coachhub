<!-- src/routes/exterior/WaterHeater.svelte -->

<!-- Features:

Temperature display
Target temperature setting
Heating status indication
Consistent styling for all controls -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Flame, Power, ThermometerSun } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let heater;
  const dispatch = createEventDispatcher();

  function updateHeater(updates) {
    dispatch('update', {
      deviceId: heater.id,
      type: 'waterHeater',
      updates
    });
  }

  $: isActive = heater.state === 'on';
  $: isHeating = isActive && heater.temperature < heater.targetTemp;
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Flame class="text-red-500" />
      <h2 class="text-lg font-medium">Water Heater</h2>
    </div>
  </div>

  <div class="p-4 space-y-6">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-4">
        <ThermometerSun size={24} class="text-gray-400" />
        <div>
          <div class="text-2xl font-bold">{heater.temperature}°F</div>
          <div class="text-sm text-gray-500">Current Temperature</div>
        </div>
      </div>
      <button
        class="p-3 rounded-full {isActive ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}"
        on:click={() => updateHeater({ state: isActive ? 'off' : 'on' })}
      >
        <Power size={20} />
      </button>
    </div>

    {#if isActive}
      <div transition:slide>
        <label for="target-temp-{heater.id}" class="text-sm text-gray-600 block mb-2">Target Temperature</label>
        <input
          id="target-temp-{heater.id}"
          type="range"
          min="100"
          max="140"
          step="5"
          bind:value={heater.targetTemp}
          on:change={() => updateHeater({ targetTemp: heater.targetTemp })}
          class="w-full"
        />
        <div class="flex justify-between text-sm text-gray-500 mt-1">
          <span>100°F</span>
          <span>{heater.targetTemp}°F</span>
          <span>140°F</span>
        </div>
      </div>

      {#if isHeating}
        <div class="bg-red-50 text-red-600 p-3 rounded-md flex items-center space-x-2">
          <Flame size={16} />
          <span class="text-sm">Heating to target temperature...</span>
        </div>
      {/if}
    {/if}
  </div>
</div>