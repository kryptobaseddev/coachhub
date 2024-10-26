<!-- src/routes/notifications/NotificationSettings.svelte  -->

<!-- Features:

Notification method toggles (Email/Push)
Category management
Visual feedback
Real-time updates -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Settings, Mail, Bell, Shield } from 'lucide-svelte';
  import { slide } from 'svelte/transition';

  export let settings;
  const dispatch = createEventDispatcher();

  function updateSettings(updates) {
    dispatch('update', { updates });
  }

  const categories = [
    { id: 'system', label: 'System Alerts', icon: Settings },
    { id: 'maintenance', label: 'Maintenance', icon: Shield },
    { id: 'security', label: 'Security', icon: Bell }
  ];
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b">
    <div class="flex items-center space-x-2">
      <Settings class="text-gray-500" />
      <h2 class="text-lg font-medium">Notification Settings</h2>
    </div>
  </div>

  <div class="p-4 space-y-6">
    <!-- Notification Methods -->
    <div class="space-y-4">
      <h3 class="font-medium text-gray-900">Notification Methods</h3>
      
      <label class="flex items-center space-x-3">
        <input
          type="checkbox"
          bind:checked={settings.email}
          on:change={() => updateSettings({ email: settings.email })}
          class="form-checkbox rounded text-blue-600"
        />
        <div class="flex items-center space-x-2">
          <Mail size={16} />
          <span>Email Notifications</span>
        </div>
      </label>

      <label class="flex items-center space-x-3">
        <input
          type="checkbox"
          bind:checked={settings.push}
          on:change={() => updateSettings({ push: settings.push })}
          class="form-checkbox rounded text-blue-600"
        />
        <div class="flex items-center space-x-2">
          <Bell size={16} />
          <span>Push Notifications</span>
        </div>
      </label>
    </div>

    <!-- Categories -->
    <div class="space-y-4">
      <h3 class="font-medium text-gray-900">Notification Categories</h3>
      
      {#each categories as category}
        <label class="flex items-center space-x-3">
          <input
            type="checkbox"
            bind:checked={settings.categories[category.id]}
            on:change={() => updateSettings({
              categories: {
                ...settings.categories,
                [category.id]: settings.categories[category.id]
              }
            })}
            class="form-checkbox rounded text-blue-600"
          />
          <div class="flex items-center space-x-2">
            <svelte:component this={category.icon} size={16} />
            <span>{category.label}</span>
          </div>
        </label>
      {/each}
    </div>
  </div>
</div>