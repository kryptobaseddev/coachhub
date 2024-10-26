<!-- src/routes/interior/+page.svelte -->

<!-- Features:

Individual and group controls for lights
Fan speed controls with labeled settings
Precise shade position control with percentage display
Visual feedback for device states
Consistent styling across all controls -->

<script>
  import { isDemoMode } from '$lib/stores/demoMode';
  import LightingControls from './LightingControls.svelte';
  import FanControls from './FanControls.svelte';
  import ShadeControls from './ShadeControls.svelte';
  import { createEventDispatcher } from 'svelte';

  export let data;
  const dispatch = createEventDispatcher();

  $: ({ devices } = data);

  async function handleDeviceUpdate(event) {
    const { deviceId, type, updates } = event.detail;
    
    if ($isDemoMode) {
      // Update local state for demo mode
      devices = {
        ...devices,
        [type]: devices[type].map(device => 
          device.id === deviceId ? { ...device, ...updates } : device
        )
      };
    } else {
      // In real implementation, send to backend API
      try {
        const response = await fetch(`/api/devices/${deviceId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update device');
      } catch (error) {
        console.error('Error updating device:', error);
        // Implement error handling UI
      }
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Interior Devices</h1>
    {#if $isDemoMode}
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Lighting Section -->
    <LightingControls 
      lights={devices.lights} 
      on:update={handleDeviceUpdate}
    />

    <!-- Fans Section -->
    <FanControls 
      fans={devices.fans} 
      on:update={handleDeviceUpdate}
    />
  </div>

  <!-- Shades Section -->
  <ShadeControls 
    shades={devices.shades} 
    on:update={handleDeviceUpdate}
  />
</div>