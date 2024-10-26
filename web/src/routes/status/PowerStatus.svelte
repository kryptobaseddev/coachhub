<!-- src/routes/status/PowerStatus.svelte --> 

<!-- Features:

Battery level and charging status
AC power legs monitoring
Generator control and status
Power usage metrics -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Battery, Power, Zap } from 'lucide-svelte';
  
  export let power;
  const dispatch = createEventDispatcher();

  function updateGenerator(updates) {
    dispatch('update', {
      type: 'power',
      subtype: 'generator',
      updates
    });
  }

  function getChargingStatus() {
    const { inverter, ac } = power;
    const totalPower = ac.leg1.power + ac.leg2.power;
    return {
      isCharging: inverter.charging,
      powerUsage: totalPower,
      batteryLevel: inverter.batteryLevel
    };
  }

  $: chargingStatus = getChargingStatus();
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Zap class="text-yellow-500" />
      <h2 class="text-lg font-medium">Power Systems</h2>
    </div>
  </div>

  <div class="divide-y">
    <!-- Battery & Inverter Status -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-4">
        <div class="flex items-center space-x-3">
          <Battery class="text-blue-500" />
          <div>
            <div class="font-medium">Battery Level</div>
            <div class="text-2xl font-bold">{chargingStatus.batteryLevel}%</div>
          </div>
        </div>
        {#if chargingStatus.isCharging}
          <span class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            Charging
          </span>
        {/if}
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="p-3 bg-gray-50 rounded">
          <div class="text-sm text-gray-600">Leg 1</div>
          <div class="font-medium">{power.ac.leg1.voltage}V / {power.ac.leg1.current}A</div>
          <div class="text-sm text-gray-500">{power.ac.leg1.power}W</div>
        </div>
        <div class="p-3 bg-gray-50 rounded">
          <div class="text-sm text-gray-600">Leg 2</div>
          <div class="font-medium">{power.ac.leg2.voltage}V / {power.ac.leg2.current}A</div>
          <div class="text-sm text-gray-500">{power.ac.leg2.power}W</div>
        </div>
      </div>
    </div>

    <!-- Generator Status -->
    <div class="p-4">
      <div class="flex items-center justify-between mb-4">
        <div>
          <div class="font-medium">Generator</div>
          <div class="text-sm text-gray-500">
            Runtime: {Math.floor(power.generator.runtime / 60)}h {power.generator.runtime % 60}m
          </div>
        </div>
        <button
          class="px-4 py-2 rounded-md font-medium
            {power.generator.state === 'on' 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'}"
          on:click={() => updateGenerator({ state: power.generator.state === 'on' ? 'off' : 'on' })}
        >
          {power.generator.state === 'on' ? 'Stop' : 'Start'} Generator
        </button>
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="p-3 bg-gray-50 rounded">
          <div class="text-sm text-gray-600">Fuel Level</div>
          <div class="font-medium">{power.generator.fuelLevel}%</div>
        </div>
        <div class="p-3 bg-gray-50 rounded">
          <div class="text-sm text-gray-600">Output Power</div>
          <div class="font-medium">{power.generator.outputPower}W</div>
        </div>
      </div>
    </div>
  </div>
</div>