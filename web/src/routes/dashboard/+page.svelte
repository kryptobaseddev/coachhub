<!-- src/routes/dashboard/+page.svelte -->

<!-- Features:
Server-side data loading with demo mode support
Main dashboard layout with responsive grid
Quick status overview cards
Quick actions panel for common controls
Device overview with categorized listings
Recent notifications panel -->
<script>
  import { isDemoMode } from '$lib/stores/demoMode';
  import StatusOverview from './StatusOverview.svelte';
  import QuickActions from './QuickActions.svelte';
  import NotificationsPanel from './NotificationsPanel.svelte';
  import DeviceOverview from './DeviceOverview.svelte';

  export let data;

  $: ({ deviceStatus, systemStatus, notifications } = data);
</script>

<div class="space-y-6">
  <div class="flex justify-between items-center">
    <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
    {#if $isDemoMode}
      <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
    {/if}
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <!-- Quick overview cards -->
    <StatusOverview {systemStatus} />
    
    <!-- Quick actions panel -->
    <div class="lg:col-span-2">
      <QuickActions {deviceStatus} />
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
    <!-- Device status overview -->
    <div class="lg:col-span-2">
      <DeviceOverview {deviceStatus} />
    </div>

    <!-- Recent notifications -->
    <div>
      <NotificationsPanel {notifications} />
    </div>
  </div>
</div>