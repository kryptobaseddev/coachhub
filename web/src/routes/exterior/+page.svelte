<!-- src/routes/exterior/+page.svelte -->

<!-- Features:

Individual light controls with brightness adjustment
Water heater temperature control with visual feedback
Awning position control with quick extend/retract buttons
Real-time status updates
Consistent UI patterns across all controls -->

<script>
  import { isDemoMode } from '$lib/stores/demoMode';
  import ExteriorLights from './ExteriorLights.svelte';
  import AwningControls from './AwningControls.svelte';
  import WaterHeater from './WaterHeater.svelte';
  import { createEventDispatcher } from 'svelte';

  export let data;
  const dispatch = createEventDispatcher();

  $: ({ devices } = data);

  async function handleDeviceUpdate(event) {
    const { deviceId, type, updates } = event.detail;
    
    if ($isDemoMode) {
      // Update local state for demo mode
      if (type === 'waterHeater') {
        devices.waterHeater = { ...devices.waterHeater, ...updates };
      } else {
        devices = {
          ...devices,
          [type]: devices[type].map(device => 
            device.id === deviceId ? { ...device, ...updates } : device
          )
        };
      }
    } else {
      try {
        const response = await fetch(`/api/devices/${deviceId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update device');
      } catch (error) {
        console.error('Error updating device:', error);
      }
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Exterior Devices</h1>
    {#if $isDemoMode}
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <!-- Exterior Lighting Section -->
    <ExteriorLights 
      lights={devices.lights} 
      on:update={handleDeviceUpdate}
    />

    <!-- Water Heater Section -->
    <WaterHeater 
      heater={devices.waterHeater} 
      on:update={handleDeviceUpdate}
    />
  </div>

  <!-- Awnings Section -->
  <AwningControls 
    awnings={devices.awnings} 
    on:update={handleDeviceUpdate}
  />
</div>