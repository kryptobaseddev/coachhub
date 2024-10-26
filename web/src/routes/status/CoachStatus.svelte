<!-- src/routes/status/CoachStatus.svelte -->

<!-- Features:

Ignition state
Park brake status
Engine hours
Fuel level
Visual indicators -->

<script>
  import { Truck, Key, ParkingSquare, Fuel, Timer } from 'lucide-svelte';

  export let vehicle;

  const statusItems = [
    { 
      icon: Key,
      label: 'Ignition',
      value: vehicle.ignition,
      colorClass: vehicle.ignition === 'on' ? 'text-green-600' : 'text-gray-600'
    },
    {
      icon: ParkingSquare,
      label: 'Park Brake',
      value: vehicle.parkBrake,
      colorClass: vehicle.parkBrake === 'on' ? 'text-green-600' : 'text-red-600'
    },
    {
      icon: Timer,
      label: 'Engine Hours',
      value: `${vehicle.engineHours} hrs`,
      colorClass: 'text-blue-600'
    },
    {
      icon: Fuel,
      label: 'Fuel Level',
      value: `${vehicle.fuelLevel}%`,
      colorClass: vehicle.fuelLevel > 20 ? 'text-green-600' : 'text-red-600'
    }
  ];
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Truck class="text-gray-500" />
      <h2 class="text-lg font-medium">Vehicle Status</h2>
    </div>
  </div>

  <div class="grid grid-cols-2 gap-4 p-4">
    {#each statusItems as item}
      <div class="p-3 bg-gray-50 rounded flex items-center space-x-3">
        <svelte:component this={item.icon} class={item.colorClass} size={20} />
        <div>
          <div class="text-sm text-gray-600">{item.label}</div>
          <div class="font-medium capitalize">{item.value}</div>
        </div>
      </div>
    {/each}
  </div>
</div>