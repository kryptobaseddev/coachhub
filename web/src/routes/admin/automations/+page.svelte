<!-- src/routes/admin/automations/+page.svelte -->

<script lang="ts">
  import { isDemoMode } from '$lib/stores/demoMode';
  import { PlusCircle, Play, Pause, Clock, Zap, Settings, Trash2 } from 'lucide-svelte';
  import { AutomationEditor } from './AutomationEditor.svelte';
  
  export let data;
  
  $: ({ automations, availableDevices } = data);
  
  let showEditor = false;
  let editingAutomation: any = null;

  function createNewAutomation() {
    editingAutomation = {
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
    showEditor = true;
  }

  function editAutomation(automation: any) {
    editingAutomation = { ...automation };
    showEditor = true;
  }

  async function toggleAutomation(automation: any) {
    if ($isDemoMode) {
      automations = automations.map(a => 
        a.id === automation.id 
          ? { ...a, isEnabled: !a.isEnabled }
          : a
      );
    } else {
      try {
        const response = await fetch(`/api/automations/${automation.id}/toggle`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error('Failed to toggle automation');
      } catch (error) {
        console.error('Error toggling automation:', error);
      }
    }
  }

  async function deleteAutomation(automation: any) {
    if (confirm('Are you sure you want to delete this automation?')) {
      if ($isDemoMode) {
        automations = automations.filter(a => a.id !== automation.id);
      } else {
        try {
          const response = await fetch(`/api/automations/${automation.id}`, {
            method: 'DELETE'
          });
          if (!response.ok) throw new Error('Failed to delete automation');
        } catch (error) {
          console.error('Error deleting automation:', error);
        }
      }
    }
  }

  async function handleSave(event: CustomEvent<any>) {
    const automation = event.detail;
    
    if ($isDemoMode) {
      if (automation.id) {
        automations = automations.map(a => 
          a.id === automation.id ? automation : a
        );
      } else {
        automation.id = (automations.length + 1).toString();
        automations = [...automations, automation];
      }
    } else {
      try {
        const url = automation.id 
          ? `/api/automations/${automation.id}`
          : '/api/automations';
        const method = automation.id ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(automation)
        });
        if (!response.ok) throw new Error('Failed to save automation');
      } catch (error) {
        console.error('Error saving automation:', error);
      }
    }
    
    showEditor = false;
    editingAutomation = null;
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Automations</h1>
    {#if $isDemoMode}
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
    {/if}
  </div>

  <div class="flex justify-end">
    <button
      class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
      on:click={createNewAutomation}
    >
      <PlusCircle class="h-5 w-5 mr-2" />
      Create Automation
    </button>
  </div>

  <div class="grid grid-cols-1 gap-6">
    {#each automations as automation (automation.id)}
      <div class="bg-white shadow rounded-lg">
        <div class="px-4 py-5 sm:p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-medium text-gray-900">
                {automation.name}
              </h3>
              <p class="mt-1 text-sm text-gray-500">
                {automation.description}
              </p>
              
              <div class="mt-4 flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center">
                  <Clock class="h-4 w-4 mr-1" />
                  {#if automation.trigger.type === 'schedule'}
                    {automation.trigger.time},
                    {automation.trigger.days.length === 7 ? 'Every day' : automation.trigger.days.join(', ')}
                  {/if}
                </div>
                <div class="flex items-center">
                  <Zap class="h-4 w-4 mr-1" />
                  {automation.actions.length} action{automation.actions.length === 1 ? '' : 's'}
                </div>
              </div>
            </div>
            
            <div class="flex items-center space-x-2">
              <button
                class="p-2 rounded-full hover:bg-gray-100"
                on:click={() => toggleAutomation(automation)}
              >
                <svelte:component
                  this={automation.isEnabled ? Pause : Play}
                  class="h-5 w-5 {automation.isEnabled ? 'text-green-600' : 'text-gray-400'}"
                />
              </button>
              <button
                class="p-2 rounded-full hover:bg-gray-100"
                on:click={() => editAutomation(automation)}
              >
                <Settings class="h-5 w-5 text-gray-400" />
              </button>
              <button
                class="p-2 rounded-full hover:bg-gray-100"
                on:click={() => deleteAutomation(automation)}
              >
                <Trash2 class="h-5 w-5 text-red-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>
</div>

{#if showEditor}
  <AutomationEditor
    automation={editingAutomation}
    {availableDevices}
    on:save={handleSave}
    on:cancel={() => {
      showEditor = false;
      editingAutomation = null;
    }}
  />
{/if}
