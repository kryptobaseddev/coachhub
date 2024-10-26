<!-- src/routes/interior/ShadeControls.svelte -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { ChevronDown, ChevronUp, Maximize2 } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let shades;
  const dispatch = createEventDispatcher();

  function updateShade(shade, updates) {
    dispatch('update', {
      deviceId: shade.id,
      type: 'shades',
      updates
    });
  }

  function getPositionLabel(position) {
    if (position === 0) return 'Closed';
    if (position === 100) return 'Open';
    return `${position}% Open`;
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Maximize2 class="text-purple-500" />
      <h2 class="text-lg font-medium">Window Shades</h2>
    </div>
  </div>

  <div class="divide-y">
    {#each shades as shade (shade.id)}
      <div class="p-4" transition:slide>
        <div class="flex items-center justify-between mb-4">
          <span class="font-medium">{shade.name}</span>
          <div class="flex space-x-2">
            <button
              class="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              on:click={() => updateShade(shade, { position: 0 })}
            >
              <ChevronDown size={16} />
            </button>
            <button
              class="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              on:click={() => updateShade(shade, { position: 100 })}
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between">
            <label class="text-sm text-gray-600">Position</label>
            <span class="text-sm font-medium">{getPositionLabel(shade.position)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            bind:value={shade.position}
            on:change={() => updateShade(shade, { position: shade.position })}
            class="w-full"
          />
        </div>
      </div>
    {/each}
  </div>
</div>