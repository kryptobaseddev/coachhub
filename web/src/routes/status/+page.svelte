<!-- src/routes/status/+page.svelte  -->

<!-- Features:
 
Real-time status monitoring
Interactive controls where applicable
Visual feedback and warnings
Responsive grid layout
Demo mode support
Comprehensive system overview -->

<script>
  import { isDemoMode } from '$lib/stores/demoMode';
  import TankLevels from './TankLevels.svelte';
  import PowerStatus from './PowerStatus.svelte';
  import VehicleStatus from './CoachStatus.svelte';
  import { createEventDispatcher } from 'svelte';

  export let data;
  const dispatch = createEventDispatcher();

  $: ({ status } = data);

  async function handleStatusUpdate(event) {
    const { type, subtype, updates } = event.detail;
    
    if ($isDemoMode) {
      status = {
        ...status,
        [type]: {
          ...status[type],
          [subtype]: {
            ...status[type][subtype],
            ...updates
          }
        }
      };
    } else {
      try {
        const response = await fetch(`/api/status/${type}/${subtype}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update status');
      } catch (error) {
        console.error('Error updating status:', error);
      }
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">System Status</h1>
    {#if $isDemoMode}
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    <!-- Tank Levels -->
    <TankLevels tanks={status.tanks} />

    <!-- Power Systems -->
    <div class="lg:col-span-2 xl:col-span-1">
      <PowerStatus power={status.power} on:update={handleStatusUpdate} />
    </div>

    <!-- Vehicle Status -->
    <div class="lg:col-span-2 xl:col-span-1">
      <VehicleStatus vehicle={status.vehicle} />
    </div>
  </div>
</div>