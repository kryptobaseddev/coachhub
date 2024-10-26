<!-- src/routes/interior/LightingControls.svelte -->

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
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <Lightbulb class="text-yellow-500" />
      <h2 class="text-lg font-medium">Interior Lights</h2>
    </div>
    <button 
      class="px-3 py-1 text-sm rounded-md bg-gray-100 hover:bg-gray-200"
      on:click={() => {
        const allOn = lights.every(light => light.state === 'on');
        lights.forEach(light => updateLight(light, { state: allOn ? 'off' : 'on' }));
      }}
    >
      {lights.every(light => light.state === 'on') ? 'All Off' : 'All On'}
    </button>
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
            <label for="brightness-{light.id}" class="text-sm text-gray-600 block mb-2">Brightness</label>  
            <input
              id="brightness-{light.id}"
              type="range"
              min="0"
              max="100"
              bind:value={light.brightness}
              on:change={() => updateLight(light, { brightness: light.brightness })}
              class="w-full"
            />
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>