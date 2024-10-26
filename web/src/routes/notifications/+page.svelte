<!-- src/routes/notifications/+page.svelte  -->

<!-- Features:

Complete notification management
Filter and sort capabilities
Interactive notifications list
Comprehensive settings control
Demo mode support
Responsive layout
Smooth animations -->

<script>
  import { isDemoMode } from '$lib/stores/demoMode';
  import NotificationsList from './NotificationsList.svelte';
  import NotificationSettings from './NotificationSettings.svelte';
  import { createEventDispatcher } from 'svelte';

  export let data;
  const dispatch = createEventDispatcher();

  $: ({ notifications, settings } = data);

  async function handleSettingsUpdate(event) {
    const { updates } = event.detail;
    
    if ($isDemoMode) {
      settings = { ...settings, ...updates };
    } else {
      try {
        const response = await fetch('/api/notifications/settings', {
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

  async function handleNotificationAction(event) {
    const { id, action } = event.detail;
    
    if ($isDemoMode) {
      if (action === 'markRead') {
        notifications = notifications.map(n => 
          n.id === id ? { ...n, read: true } : n
        );
      } else if (action === 'delete') {
        notifications = notifications.filter(n => n.id !== id);
      }
    } else {
      try {
        const response = await fetch(`/api/notifications/${id}/${action}`, {
          method: 'POST'
        });
        if (!response.ok) throw new Error(`Failed to ${action} notification`);
      } catch (error) {
        console.error('Error updating notification:', error);
      }
    }
  }
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Notifications</h1>
    {#if $isDemoMode}
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
    {/if}
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Notifications List -->
    <div class="lg:col-span-2">
      <NotificationsList 
        {notifications}
        on:action={handleNotificationAction}
      />
    </div>

    <!-- Settings Panel -->
    <div>
      <NotificationSettings 
        {settings}
        on:update={handleSettingsUpdate}
      />
    </div>
  </div>
</div>