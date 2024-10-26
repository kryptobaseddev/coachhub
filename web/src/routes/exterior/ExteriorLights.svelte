<!-- src/routes/exterior/ExteriorLights.svelte -->

<!-- Features:

Individual light controls with brightness adjustment
Consistent styling for all controls -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Lightbulb, Power } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let lights;
  const dispatch = createEventDispatcher();

  function updateLight(light, updates) {
    dispatch('update', {
      deviceId: light.id,
      type: 'lights',
      updates
    });
  }

  $: activeCount = lights.filter(light => light.state === 'on').length;
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <Lightbulb class="text-yellow-500" />
      <h2 class="text-lg font-medium">Exterior Lights</h2>
    </div>
    <span class="text-sm text-gray-500">{activeCount} of {lights.length} active</span>
  </div>

  <div class="divide-y">
    {#each lights as light (light.id)}
      <div class="p-4" transition:slide>
        <div class="flex items-center justify-between mb-2">
          <span class="font-medium">{light.name}</span>
          <button
            class="p-2 rounded-full {light.state === 'on' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'}"
            on:click={() => updateLight(light, { state: light.state === 'on' ? 'off' : 'on' })}
          >
            <Power size={16} />
          </button>
        </div>
        {#if light.state === 'on'}
          <div class="mt-4">
            <label class="text-sm text-gray-600 block mb-2">Brightness</label>
            <input
              type="range"
              min="0"
              max="100"
              bind:value={light.brightness}
              on:change={() => updateLight(light, { brightness: light.brightness })}
              class="w-full"
            />
            <div class="flex justify-between text-sm text-gray-500 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>