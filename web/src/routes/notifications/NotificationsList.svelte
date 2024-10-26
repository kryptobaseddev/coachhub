<!-- src/routes/notifications/NotificationsList.svelte  -->

<!-- Features:

Filtering (All/Unread/Read)
Type-based icons and colors
Action menu for each notification
Read/unread status
Timestamp display
Smooth transitions -->

<script>
  import { createEventDispatcher } from 'svelte';
  import { Bell, CheckCircle, AlertCircle, Info, Trash2, MoreVertical } from 'lucide-svelte';
  import { slide, fade } from 'svelte/transition';

  export let notifications;
  const dispatch = createEventDispatcher();

  let selectedFilter = 'all';
  let showingMore = new Set();

  $: filteredNotifications = notifications.filter(n => {
    if (selectedFilter === 'unread') return !n.read;
    if (selectedFilter === 'read') return n.read;
    return true;
  });

  function getIcon(type) {
    switch (type) {
      case 'warning': return AlertCircle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  }

  function getTypeColor(type) {
    switch (type) {
      case 'warning': return 'yellow';
      case 'success': return 'green';
      default: return 'blue';
    }
  }

  function toggleMore(id) {
    if (showingMore.has(id)) {
      showingMore.delete(id);
    } else {
      showingMore.add(id);
    }
    showingMore = showingMore; // Trigger reactivity
  }

  function formatDate(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
</script>

<div class="bg-white rounded-lg shadow">
  <div class="p-4 border-b flex justify-between items-center">
    <div class="flex items-center space-x-2">
      <Bell class="text-gray-500" />
      <h2 class="text-lg font-medium">Notifications</h2>
    </div>
    <select
      bind:value={selectedFilter}
      class="form-select rounded-md border-gray-300 text-sm"
    >
      <option value="all">All</option>
      <option value="unread">Unread</option>
      <option value="read">Read</option>
    </select>
  </div>

  {#if filteredNotifications.length > 0}
    <div class="divide-y">
      {#each filteredNotifications as notification (notification.id)}
        <div 
          class="p-4 relative {notification.read ? 'bg-gray-50' : ''}"
          transition:slide
        >
          <div class="flex items-start space-x-3">
            <div class="flex-shrink-0">
              <svelte:component 
                this={getIcon(notification.type)}
                class="text-{getTypeColor(notification.type)}-500"
                size={20}
              />
            </div>
            <div class="flex-grow">
              <p class="text-sm {notification.read ? 'text-gray-600' : 'text-gray-900'}">
                {notification.message}
              </p>
              <p class="text-xs text-gray-500 mt-1">
                {formatDate(notification.timestamp)}
              </p>
            </div>
            <div class="flex-shrink-0 relative">
              <button
                class="p-1 rounded-full hover:bg-gray-100"
                on:click={() => toggleMore(notification.id)}
              >
                <MoreVertical size={16} />
              </button>
              
              {#if showingMore.has(notification.id)}
                <div 
                  class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  transition:fade
                >
                  <div class="py-1">
                    {#if !notification.read}
                      <button
                        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                        on:click={() => {
                          dispatch('action', { id: notification.id, action: 'markRead' });
                          toggleMore(notification.id);
                        }}
                      >
                        <CheckCircle size={16} class="mr-2" />
                        Mark as read
                      </button>
                    {/if}
                    <button
                      class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full"
                      on:click={() => {
                        dispatch('action', { id: notification.id, action: 'delete' });
                        toggleMore(notification.id);
                      }}
                    >
                      <Trash2 size={16} class="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="p-8 text-center text-gray-500">
      No notifications found
    </div>
  {/if}
</div>