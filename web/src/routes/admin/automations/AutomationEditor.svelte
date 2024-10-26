<!-- src/routes/admin/automations/AutomationEditor.svelte -->

<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { X, Plus, Minus } from 'lucide-svelte';
  
  interface Action {
    type: string;
    target: string;
    action: string;
    value?: number;
  }

  export let automation: {
    id: number | null;
    name: string;
    description: string;
    isEnabled: boolean;
    trigger: {
      type: string;
      time: string;
      days: string[];
    };
    actions: Action[];
  } = {
    id: null,
    name: '',
    description: '',
    isEnabled: true,
    trigger: {
      type: 'schedule',
      time: '12:00',
      days: []
    },
    actions: []
  };
  export let availableDevices: any;

  const dispatch = createEventDispatcher();
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  
  const deviceTypes = [
    { value: 'lights', label: 'Lights' },
    { value: 'climate', label: 'Climate Control' },
    { value: 'shades', label: 'Shades' },
    { value: 'floor_heat', label: 'Heated Floors' }
  ];

  function addAction() {
    automation.actions = [
      ...automation.actions,
      { type: 'lights', target: 'all', action: 'off' }
    ];
  }

  function removeAction(index: number) {
    automation.actions = automation.actions.filter((_, i) => i !== index);
  }

  function getActionTargets(type: string) {
    switch (type) {
      case 'lights':
        return [
          { value: 'all', label: 'All Lights' },
          ...availableDevices.interior.lights.map((light: any) => ({
            value: light.id,
            label: light.name
          }))
        ];
      case 'climate':
        return availableDevices.climate.thermostats.map((thermostat: any) => ({
          value: thermostat.id,
          label: thermostat.name
        }));
      case 'shades':
        return [
          { value: 'all', label: 'All Shades' },
          ...availableDevices.interior.shades.map((shade: any) => ({
            value: shade.id,
            label: shade.name
          }))
        ];
      case 'floor_heat':
        return availableDevices.climate.heatedFloors.map((floor: any) => ({
          value: floor.id,
          label: floor.name
        }));
      default:
        return [];
    }
  }

  function getActionOptions(type: string) {
    switch (type) {
      case 'lights':
        return [
          { value: 'on', label: 'Turn On' },
          { value: 'off', label: 'Turn Off' },
          { value: 'set', label: 'Set Brightness' }
        ];
      case 'climate':
        return [
          { value: 'set', label: 'Set Temperature' },
          { value: 'off', label: 'Turn Off' }
        ];
      case 'shades':
        return [
          { value: 'open', label: 'Open' },
          { value: 'close', label: 'Close' },
          { value: 'set', label: 'Set Position' }
        ];
      case 'floor_heat':
        return [
          { value: 'on', label: 'Turn On' },
          { value: 'off', label: 'Turn Off' },
          { value: 'set', label: 'Set Temperature' }
        ];
      default:
        return [];
    }
  }

  function handleSubmit() {
    dispatch('save', automation);
  }

  function getValueInput(action: any) {
    switch (action.type) {
      case 'lights':
        return action.action === 'set' ? {
          type: 'range',
          min: 0,
          max: 100,
          step: 1,
          unit: '%'
        } : null;
      case 'climate':
        return action.action === 'set' ? {
          type: 'number',
          min: 60,
          max: 85,
          step: 1,
          unit: '°F'
        } : null;
      case 'shades':
        return action.action === 'set' ? {
          type: 'range',
          min: 0,
          max: 100,
          step: 1,
          unit: '%'
        } : null;
      case 'floor_heat':
        return action.action === 'set' ? {
          type: 'number',
          min: 65,
          max: 85,
          step: 1,
          unit: '°F'
        } : null;
      default:
        return null;
    }
  }
</script>

<div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
  <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
    <div class="px-4 py-5 sm:px-6 border-b flex justify-between items-center">
      <h3 class="text-lg font-medium text-gray-900">
        {automation.id ? 'Edit' : 'Create'} Automation
      </h3>
      <button
        class="rounded-full p-1 hover:bg-gray-100"
        on:click={() => dispatch('cancel')}
      >
        <X class="h-5 w-5 text-gray-400" />
      </button>
    </div>

    <form on:submit|preventDefault={handleSubmit} class="p-6 space-y-6">
      <!-- Basic Info -->
      <div class="space-y-4">
        <div>
          <label for="automation-name" class="block text-sm font-medium text-gray-700">Name</label>
          <input
            id="automation-name"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            bind:value={automation.name}
            required
          />
        </div>
        
        <div>
          <label for="automation-description" class="block text-sm font-medium text-gray-700">Description</label>
          <input
            id="automation-description"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            bind:value={automation.description}
          />
        </div>
      </div>

      <!-- Trigger -->
      <div class="space-y-4">
        <h4 class="font-medium text-gray-900">Trigger</h4>
        
        <div>
          <label for="automation-time" class="block text-sm font-medium text-gray-700">Time</label>
          <input
            id="automation-time"
            type="time"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            bind:value={automation.trigger.time}
            required
          />
        </div>

        <div>
          <label for="automation-days" class="block text-sm font-medium text-gray-700 mb-2">Days</label>
          <div class="space-y-2">
            {#each weekdays as day}
              <label class="flex items-center">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-blue-600"
                  bind:group={automation.trigger.days}
                  value={day}
                />
                <span class="ml-2 text-sm text-gray-700 capitalize">{day}</span>
              </label>
            {/each}
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h4 class="font-medium text-gray-900">Actions</h4>
          <button
            type="button"
            class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
            on:click={addAction}
          >
            <Plus class="h-4 w-4 mr-1" />
            Add Action
          </button>
        </div>

        <div class="space-y-4">
            {#each automation.actions as action, index}
              <div class="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div class="flex-1 grid grid-cols-3 gap-4">
                  <!-- Device Type -->
                  <div>
                    <label for="automation-device-type" class="block text-sm font-medium text-gray-700">Device Type</label>
                    <select
                      id="automation-device-type"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      bind:value={action.type}
                    >
                      {#each deviceTypes as type}
                        <option value={type.value}>{type.label}</option>
                      {/each}
                    </select>
                  </div>
          
                  <!-- Target -->
                  <div>
                    <label for="automation-target" class="block text-sm font-medium text-gray-700">Target</label>
                    <select
                      id="automation-target"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      bind:value={action.target}
                    >
                      {#each getActionTargets(action.type) as target}
                        <option value={target.value}>{target.label}</option>
                      {/each}
                    </select>
                  </div>
          
                  <!-- Action -->
                  <div>
                    <label for="automation-action" class="block text-sm font-medium text-gray-700">Action</label>
                    <select
                      id="automation-action"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                      bind:value={action.action}
                    >
                      {#each getActionOptions(action.type) as option}
                        <option value={option.value}>{option.label}</option>
                      {/each}
                    </select>
                  </div>
          
                  <!-- Value Input (if needed) -->
                  {#if action.action === 'set'}
                    {@const valueInput = getValueInput(action)}
                    {#if valueInput}
                      <div class="col-span-3 mt-2">
                        <label for="automation-value"   class="block text-sm font-medium text-gray-700">Value</label>
                        <div class="flex items-center space-x-2">
                          {#if valueInput.type === 'range'}
                            <input
                              type="range"
                              class="flex-1"
                              min={valueInput.min}
                              max={valueInput.max}
                              step={valueInput.step}
                              bind:value={action.value}
                            />
                            <span class="text-sm text-gray-600 w-16">
                              {action.value || 0}{valueInput.unit}
                            </span>
                          {:else}
                            <input
                              type="number"
                              class="block w-full rounded-md border-gray-300 shadow-sm"
                              min={valueInput.min}
                              max={valueInput.max}
                              step={valueInput.step}
                              bind:value={action.value}
                            />
                            <span class="text-sm text-gray-600">{valueInput.unit}</span>
                          {/if}
                        </div>
                      </div>
                    {/if}
                  {/if}
                </div>
          
                <!-- Remove Action Button -->
                <button
                  type="button"
                  class="p-2 text-red-600 hover:text-red-800 rounded-full hover:bg-red-50"
                  on:click={() => removeAction(index)}
                >
                  <Minus class="h-5 w-5" />
                </button>
              </div>
            {/each}
          </div>
          
          <!-- Submit Buttons -->
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              on:click={() => dispatch('cancel')}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              {automation.id ? 'Update' : 'Create'} Automation
            </button>
          </div>
          </form>
          </div>
          </div>

<style>
  /* Your component styles here */
</style>
