<!-- src/routes/dashboard/QuickActions.svelte -->

<!-- Features:

Quick actions for common device groups
Visual feedback for device states
Consistent styling for all actions -->

<script>
  import { createEventDispatcher } from 'svelte';
  
  export let deviceStatus;
  
  const dispatch = createEventDispatcher();

  function toggleDevice(device) {
    dispatch('toggleDevice', {
      id: device.id,
      type: device.type,
      newState: device.state === 'on' ? 'off' : 'on'
    });
  }

  const quickActions = [
    { 
      title: 'All Interior Lights',
      devices: deviceStatus.interior.lights,
      icon: '💡'
    },
    {
      title: 'Climate Control',
      devices: [deviceStatus.climate.thermostats[0]],
      icon: '🌡️'
    },
    {
      title: 'Exterior Lights',
      devices: deviceStatus.exterior.lights,
      icon: '🏠'
    }
  ];
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <h2 class="text-lg font-medium">Quick Actions</h2>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
    {#each quickActions as action}
      <button
        class="p-4 rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors"
        on:click={() => {
          action.devices.forEach(device => toggleDevice(device));
        }}
      >
        <div class="text-2xl mb-2">{action.icon}</div>
        <div class="font-medium">{action.title}</div>
        <div class="text-sm text-gray-500">
          {action.devices.filter(d => d.state === 'on').length} of {action.devices.length} on
        </div>
      </button>
    {/each}
  </div>
</div>