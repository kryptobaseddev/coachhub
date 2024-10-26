<!-- src/routes/admin/system/+page.svelte -->

<script lang="ts">
  import { isDemoMode } from '$lib/stores/demoMode';
  import { Settings, Server, Globe, Database, Shield } from 'lucide-svelte';
  
  export let data;
  
  $: ({ settings } = data);
  
  let activeTab = 'general';
  
  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'network', label: 'Network', icon: Globe },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  async function handleSettingsUpdate(updates: Partial<typeof settings>) {
    if ($isDemoMode) {
      settings = { ...settings, ...updates };
    } else {
      try {
        const response = await fetch('/api/admin/system/settings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        });
        if (!response.ok) throw new Error('Failed to update settings');
      } catch (error) {
        console.error('Error updating settings:', error);
      }
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">System Configuration</h1>
    {#if $isDemoMode}
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
    {/if}
  </div>

  <!-- Tabs -->
  <div class="border-b border-gray-200">
    <nav class="-mb-px flex space-x-8" aria-label="Tabs">
      {#each tabs as tab}
        <button
          class="flex items-center py-4 px-1 border-b-2 font-medium text-sm
            {activeTab === tab.id
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}"
          on:click={() => activeTab = tab.id}
        >
          <svelte:component this={tab.icon} class="mr-2" size={16} />
          {tab.label}
        </button>
      {/each}
    </nav>
  </div>

  <!-- Tab Content -->
  <div class="bg-white rounded-lg shadow">
    {#if activeTab === 'general'}
      <div class="p-6 space-y-6">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label for="timezone" class="block text-sm font-medium text-gray-700">System Timezone</label>
            <select
              id="timezone"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              bind:value={settings.timezone}
              on:change={() => handleSettingsUpdate({ timezone: settings.timezone })}
            >
              <option value="America/New_York">Eastern Time</option>
              <option value="America/Chicago">Central Time</option>
              <option value="America/Denver">Mountain Time</option>
              <option value="America/Los_Angeles">Pacific Time</option>
            </select>
          </div>
          
          <div>
            <label for="temperatureUnit" class="block text-sm font-medium text-gray-700">Temperature Unit</label>
            <select
              id="temperatureUnit"
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
              bind:value={settings.temperatureUnit}
              on:change={() => handleSettingsUpdate({ temperatureUnit: settings.temperatureUnit })}
            >
              <option value="F">Fahrenheit (°F)</option>
              <option value="C">Celsius (°C)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="flex items-center space-x-3">
            <input
              type="checkbox"
              bind:checked={settings.darkMode}
              on:change={() => handleSettingsUpdate({ darkMode: settings.darkMode })}
              class="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span class="text-sm font-medium text-gray-700">Enable Dark Mode</span>
          </label>
        </div>
      </div>
    {:else if activeTab === 'network'}
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Network Configuration</h3>
        <!-- Add network configuration options -->
      </div>
    {:else if activeTab === 'backup'}
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Backup & Restore</h3>
        <!-- Add backup and restore options -->
      </div>
    {:else if activeTab === 'security'}
      <div class="p-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        <!-- Add security configuration options -->
      </div>
    {/if}
  </div>
</div>
