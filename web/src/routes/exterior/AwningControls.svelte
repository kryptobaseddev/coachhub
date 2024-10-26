<!-- src/routes/exterior/AwningControls.svelte -->

<!-- Features:

Individual awning controls with position adjustment
Consistent styling for all controls -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Umbrella, ChevronDown, ChevronUp } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let awnings;
  const dispatch = createEventDispatcher();

  function updateAwning(awning, updates) {
    dispatch('update', {
      deviceId: awning.id,
      type: 'awnings',
      updates
    });
  }

  function getPositionLabel(position) {
    if (position === 0) return 'Retracted';
    if (position === 100) return 'Extended';
    return `${position}% Extended`;
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Umbrella class="text-blue-500" />
      <h2 class="text-lg font-medium">Awnings</h2>
    </div>
  </div>

  <div class="divide-y">
    {#each awnings as awning (awning.id)}
      <div class="p-4" transition:slide>
        <div class="flex items-center justify-between mb-4">
          <span class="font-medium">{awning.name}</span>
          <div class="flex space-x-2">
            <button
              class="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              on:click={() => updateAwning(awning, { position: 0 })}
              title="Retract"
            >
              <ChevronDown size={16} />
            </button>
            <button
              class="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
              on:click={() => updateAwning(awning, { position: 100 })}
              title="Extend"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
        
        <div class="space-y-2">
          <div class="flex justify-between">
            <label for="position-{awning.id}" class="text-sm text-gray-600">Position</label>
            <span class="text-sm font-medium">{getPositionLabel(awning.position)}</span>
          </div>
          <input
            id="position-{awning.id}"
            type="range"
            min="0"
            max="100"
            bind:value={awning.position}
            on:change={() => updateAwning(awning, { position: awning.position })}
            class="w-full"
          />
        </div>
      </div>
    {/each}
  </div>
</div>