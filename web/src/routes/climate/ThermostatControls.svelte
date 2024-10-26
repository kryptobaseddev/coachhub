<!-- src/routes/climate/ThermostatControls.svelte -->

<!-- Features:

Temperature and humidity display
Mode selection (heat/cool/auto/off)
Target temperature adjustment
Status indicators -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Thermometer, Power, Droplets } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let thermostats;
  const dispatch = createEventDispatcher();

  const modes = ['off', 'heat', 'cool', 'auto'];
  const modeIcons = {
    heat: '🔥',
    cool: '❄️',
    auto: '🔄',
    off: '⭕'
  };

  function updateThermostat(thermostat, updates) {
    dispatch('update', {
      deviceId: thermostat.id,
      type: 'thermostats',
      updates
    });
  }

  function getStatusColor(thermostat) {
    if (thermostat.mode === 'off') return 'gray';
    if (thermostat.mode === 'heat') return 'red';
    if (thermostat.mode === 'cool') return 'blue';
    return 'purple';
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Thermometer class="text-red-500" />
      <h2 class="text-lg font-medium">Thermostats</h2>
    </div>
  </div>

  <div class="divide-y">
    {#each thermostats as thermostat (thermostat.id)}
      <div class="p-4" transition:slide>
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="font-medium">{thermostat.name}</h3>
            <div class="flex items-center space-x-4 mt-1">
              <div class="text-3xl font-bold">{thermostat.currentTemp}°F</div>
              <div class="text-sm text-gray-500 flex items-center space-x-1">
                <Droplets size={16} />
                <span>{thermostat.humidity}% humidity</span>
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <select
              class="form-select rounded-md border-gray-300"
              bind:value={thermostat.mode}
              on:change={() => updateThermostat(thermostat, { mode: thermostat.mode })}
            >
              {#each modes as mode}
                <option value={mode}>
                  {modeIcons[mode]} {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </option>
              {/each}
            </select>
          </div>
        </div>

        {#if thermostat.mode !== 'off'}
          <div class="space-y-4" transition:slide>
            <div>
              <label class="text-sm text-gray-600 block mb-2">Target Temperature</label>
              <input
                type="range"
                min="60"
                max="85"
                bind:value={thermostat.targetTemp}
                on:change={() => updateThermostat(thermostat, { targetTemp: thermostat.targetTemp })}
                class="w-full"
              />
              <div class="flex justify-between text-sm text-gray-500 mt-1">
                <span>60°F</span>
                <span>{thermostat.targetTemp}°F</span>
                <span>85°F</span>
              </div>
            </div>

            <div class="p-3 rounded-md text-sm" 
              class:bg-red-50={thermostat.mode === 'heat'}
              class:bg-blue-50={thermostat.mode === 'cool'}
              class:bg-purple-50={thermostat.mode === 'auto'}
              class:text-red-600={thermostat.mode === 'heat'}
              class:text-blue-600={thermostat.mode === 'cool'}
              class:text-purple-600={thermostat.mode === 'auto'}
            >
              {#if thermostat.currentTemp < thermostat.targetTemp}
                Heating to target temperature...
              {:else if thermostat.currentTemp > thermostat.targetTemp}
                Cooling to target temperature...
              {:else}
                Target temperature reached
              {/if}
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>