<!-- src/routes/climate/VentFanControls.svelte -->

<!-- Features:

On/Off toggle
Speed control
Visual feedback -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Fan, Power } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let fans;
  const dispatch = createEventDispatcher();

  const speedLabels = ['Off', 'Low', 'Medium', 'High'];

  function updateFan(fan, updates) {
    dispatch('update', {
      deviceId: fan.id,
      type: 'ventFans',
      updates
    });
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Fan class="text-green-500" />
      <h2 class="text-lg font-medium">Ventilation Fans</h2>
    </div>
  </div>

  <div class="divide-y">
    {#each fans as fan (fan.id)}
      <div class="p-4" transition:slide>
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium">{fan.name}</span>
          <button
            class="p-2 rounded-full {fan.state === 'on' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}"
            on:click={() => updateFan(fan, { 
              state: fan.state === 'on' ? 'off' : 'on',
              speed: fan.state === 'on' ? 0 : 1
            })}
          >
            <Power size={16} />
          </button>
        </div>

        {#if fan.state === 'on'}
          <div class="mt-4 space-y-2">
            <div class="flex justify-between">
              <label for="fan-speed-{fan.id}" class="text-sm text-gray-600">Fan Speed</label>
              <span class="text-sm font-medium">{speedLabels[fan.speed]}</span>
            </div>
            <input
              id="fan-speed-{fan.id}"
              type="range"
              min="0"
              max="3"
              bind:value={fan.speed}
              on:change={() => updateFan(fan, { 
                speed: fan.speed,
                state: fan.speed === 0 ? 'off' : 'on'
              })}
              class="w-full"
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>