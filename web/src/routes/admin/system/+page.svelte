<!-- src/routes/admin/system/+page.svelte -->

<script lang="ts">
  import { isDemoMode } from '$lib/stores/demoMode';
  import { Settings, Server, Globe, Database, Shield, Info, Sun, Moon } from 'lucide-svelte';
  import { darkMode } from '$lib/stores/darkMode';
  
  export let data;
  
  $: ({ settings, systemInfo, networkInfo} = data);
  
  let activeTab = 'general';
  
  const tabs = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'network', label: 'Network', icon: Globe },
    { id: 'backup', label: 'Backup & Restore', icon: Database },
    { id: 'security', label: 'Security', icon: Shield }
  ];

  async function toggleDarkMode() {
    if ($isDemoMode) {  
      // Handle demo mode
      alert('Demo mode: Dark mode cannot be toggled');
      darkMode.set(true);
    } else {
      const newDarkMode = !$darkMode;
      darkMode.set(newDarkMode);
      await handleSettingsUpdate({ darkMode: newDarkMode });
    }
  }

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

  async function handleSecuritySettingsUpdate() {
    if ($isDemoMode) {
      // Handle demo mode
    } else {
      try {
        const response = await fetch('/api/admin/system/security-settings', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(settings.security)
        });
        if (!response.ok) throw new Error('Failed to update security settings');
        // Handle successful update (e.g., show a success message)
      } catch (error) {
        console.error('Error updating security settings:', error);
        // Handle error (e.g., show an error message to the user)
      }
    }
  }

  function handleSystemInfo(updates: Partial<typeof systemInfo>) {
    if ($isDemoMode) {
      // Handle demo mode
      
    } else {
      // Handle actual system info update
    }
  }

  function showVersionInfo() {
    // for demo mode we don't have systemInfo
    if ($isDemoMode) {
      alert('Version: 0.0.1\nBuild: 1');
    } else {
      alert(`Version: ${systemInfo.version}\nBuild: ${systemInfo.build}`);
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
              checked={$darkMode}
              on:change={toggleDarkMode}
              class="rounded border-gray-300 text-blue-600 shadow-sm"
            />
            <span class="text-sm font-medium text-gray-700">Enable Dark Mode</span>
          </label>
        </div>
    
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-2">System Version</h3>
          {#if $isDemoMode}
            <p class="text-sm text-gray-600">0.0.1</p>
          {/if}
          {#if !$isDemoMode}
            <button
              on:click={showVersionInfo}
            class="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Info class="mr-2" size={16} />
              Version Information
            </button>
          {/if}
        </div>
      </div>
    {:else if activeTab === 'network'}
      <div class="p-6 space-y-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Network Information</h3>
        {#if networkInfo}
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-sm font-medium text-gray-500">Internal IP</p>
              <p class="mt-1 text-sm text-gray-900">{networkInfo.internalIp || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">External WAN IP</p>
              <p class="mt-1 text-sm text-gray-900">{networkInfo.externalIp || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">MAC Address</p>
              <p class="mt-1 text-sm text-gray-900">{networkInfo.macAddress || 'N/A'}</p>
            </div>
            <div>
              <p class="text-sm font-medium text-gray-500">Local mDNS Name</p>
              <p class="mt-1 text-sm text-gray-900">{networkInfo.mdnsName || 'N/A'}</p>
            </div>
          </div>
        {:else}
          <p class="text-sm text-gray-600">Network information is not available.</p>
        {/if}
    
        <div class="mt-6">
          <h3 class="text-lg font-medium text-gray-900 mb-4">DDNS Configuration</h3>
          <form class="space-y-4">
            <div>
              <label for="ddns-provider" class="block text-sm font-medium text-gray-700">DDNS Provider</label>
              <select id="ddns-provider" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md">
                <option>Select a provider</option>
                <option>No-IP</option>
                <option>DynDNS</option>
                <option>Cloudflare</option>
                <option>Duck DNS</option>
              </select>
            </div>
            <div>
              <label for="ddns-hostname" class="block text-sm font-medium text-gray-700">Hostname</label>
              <input type="text" id="ddns-hostname" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" placeholder="yourdomain.ddns.net">
            </div>
            <div>
              <label for="ddns-username" class="block text-sm font-medium text-gray-700">Username</label>
              <input type="text" id="ddns-username" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <label for="ddns-password" class="block text-sm font-medium text-gray-700">Password</label>
              <input type="password" id="ddns-password" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            </div>
            <div>
              <label for="ddns-update-interval" class="block text-sm font-medium text-gray-700">Update Interval (minutes)</label>
              <input type="number" id="ddns-update-interval" class="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" min="5" max="1440" value="60">
            </div>
            <div class="flex items-center justify-between">
              <button type="submit" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Save DDNS Configuration
              </button>
              <button type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Test Connection
              </button>
            </div>
          </form>
        </div>
      </div>
    {:else if activeTab === 'backup'}
      <div class="p-6 space-y-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Backup & Restore</h3>
        <div class="space-y-4">
          <button class="btn btn-primary">Backup System Configuration</button>
            <div>
              <label for="restoreFile" class="block text-sm font-medium text-gray-700">Restore from Backup</label>
              <input type="file" id="restoreFile" class="mt-1 block w-full" />
            <button class="mt-2 btn btn-secondary">Restore</button>
          </div>
        </div>
      </div>
    {:else if activeTab === 'security'}
      <div class="p-6 space-y-6">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Security Settings</h3>
        {#if settings && settings.security}
          <div class="space-y-6">
            <div>
              <h4 class="text-md font-medium text-gray-800">Password Policy</h4>
              <div class="mt-2 space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox" bind:checked={settings.security.requireStrongPasswords}>
                  <span class="ml-2 text-sm text-gray-700">Require strong passwords</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox" bind:checked={settings.security.passwordExpiration}>
                  <span class="ml-2 text-sm text-gray-700">Enable password expiration</span>
                </label>
                {#if settings.security.passwordExpiration}
                  <div class="ml-6">
                    <label for="passwordExpirationDays" class="block text-sm font-medium text-gray-700">Expiration period (days)</label>
                    <input type="number" id="passwordExpirationDays" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" min="1" max="365" bind:value={settings.security.passwordExpirationDays}>
                  </div>
                {/if}
              </div>
            </div>

            <div>
              <h4 class="text-md font-medium text-gray-800">Two-Factor Authentication (2FA)</h4>
              <div class="mt-2">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox" bind:checked={settings.security.enable2FA}>
                  <span class="ml-2 text-sm text-gray-700">Enable 2FA for all users</span>
                </label>
              </div>
            </div>

            <div>
              <h4 class="text-md font-medium text-gray-800">Session Management</h4>
              <div class="mt-2 space-y-2">
                <label for="sessionTimeout" class="block text-sm font-medium text-gray-700">Session timeout (minutes)</label>
                <input type="number" id="sessionTimeout" class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" min="5" max="1440" bind:value={settings.security.sessionTimeout}>
              </div>
            </div>

            <div>
              <h4 class="text-md font-medium text-gray-800">Access Control</h4>
              <div class="mt-2 space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox" bind:checked={settings.security.enableIPWhitelist}>
                  <span class="ml-2 text-sm text-gray-700">Enable IP whitelist</span>
                </label>
                {#if settings.security.enableIPWhitelist}
                  <div class="ml-6">
                    <label for="ipWhitelist" class="block text-sm font-medium text-gray-700">Allowed IP addresses (comma-separated)</label>
                    <input type="text" id="ipWhitelist" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" bind:value={settings.security.ipWhitelist}>
                  </div>
                {/if}
              </div>
            </div>

            <div>
              <h4 class="text-md font-medium text-gray-800">SSL/TLS Configuration</h4>
              <div class="mt-2 space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox" bind:checked={settings.security.enforceHTTPS}>
                  <span class="ml-2 text-sm text-gray-700">Enforce HTTPS</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" class="form-checkbox" bind:checked={settings.security.enableHSTS}>
                  <span class="ml-2 text-sm text-gray-700">Enable HTTP Strict Transport Security (HSTS)</span>
                </label>
              </div>
            </div>

            <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" on:click={handleSecuritySettingsUpdate}>
              Save Security Settings
            </button>
          </div>
        {:else}
          <p class="text-sm text-gray-600">Security settings are not available.</p>
        {/if}
      </div>
    {/if}
  </div>
</div>
