<!-- src/routes/dashboard/DeviceOverview.svelte -->

<!-- Features:

Device type summary with active count
Individual device status with name and state
Consistent styling for all devices -->

<script>
  import { LightbulbIcon, Fan, Thermometer } from 'lucide-svelte';
  
  export let deviceStatus;

  const deviceTypes = [
    {
      title: 'Interior Lights',
      devices: deviceStatus.interior.lights,
      icon: LightbulbIcon
    },
    {
      title: 'Climate',
      devices: deviceStatus.climate.thermostats,
      icon: Thermometer
    },
    {
      title: 'Fans',
      devices: [...deviceStatus.interior.fans, ...deviceStatus.climate.ventFans],
      icon: Fan
    }
  ];
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <h2 class="text-lg font-medium">Device Overview</h2>
  </div>
  
  <div class="divide-y">
    {#each deviceTypes as type}
      <div class="p-4">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center space-x-3">
            <svelte:component this={type.icon} class="text-blue-500" />
            <span class="font-medium">{type.title}</span>
          </div>
          <span class="text-sm text-gray-500">
            {type.devices.filter(d => d.state === 'on').length} active
          </span>
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
          {#each type.devices as device}
            <div class="flex items-center justify-between p-3 rounded-lg bg-gray-50">
              <span class="text-sm">{device.name}</span>
              <span class="px-2 py-1 rounded-full text-xs capitalize
                {device.state === 'on' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}">
                {device.state}
              </span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>
