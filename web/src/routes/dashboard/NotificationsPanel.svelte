<!-- src/routes/dashboard/NotificationsPanel.svelte -->
<!-- Features:

Recent notifications summary
Individual notification details with timestamp
Consistent styling for all notifications -->

<script>
  import { Bell, AlertCircle, Info } from 'lucide-svelte';
  
  export let notifications;

  function getIcon(type) {
    switch (type) {
      case 'warning':
        return AlertCircle;
      default:
        return Info;
    }
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b flex items-center justify-between">
    <h2 class="text-lg font-medium">Recent Notifications</h2>
    <Bell class="text-gray-400" />
  </div>
  
  {#if notifications.length > 0}
    <div class="divide-y">
      {#each notifications as notification}
        <div class="p-4 flex items-start space-x-3">
          <svelte:component 
            this={getIcon(notification.type)}
            class="text-{notification.type === 'warning' ? 'yellow' : 'blue'}-500 flex-shrink-0"
          />
          <div>
            <p class="text-sm">{notification.message}</p>
            <p class="text-xs text-gray-500 mt-1">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="p-4 text-center text-gray-500">
      No new notifications
    </div>
  {/if}
</div>