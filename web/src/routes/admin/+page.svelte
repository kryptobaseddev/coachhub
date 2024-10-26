<!-- src/routes/admin/+page.svelte -->

<!-- Features:
  - Quick stats
  - Admin sections
  - Icons
  - Card component
-->

<script>
    import Icon from '$lib/components/common/Icon.svelte';
    import Card from '$lib/components/common/Card.svelte';
    import { goto } from '$app/navigation';

    /** @type {import('./$types').PageData} */
    export let data;

    const adminSections = [
        {
            title: 'System Configuration',
            icon: 'Settings',
            description: 'Configure system-wide settings and preferences',
            link: '/admin/system',
            stats: `Last updated: ${new Date(data.stats.systemStatus.lastUpdate).toLocaleDateString()}`
        },
        {
            title: 'Coach Configuration',
            icon: 'Truck',
            description: 'Manage coach details, floorplans, and equipment',
            link: '/admin/coach',
            stats: 'Configure coach settings'
        },
        {
            title: 'User Management',
            icon: 'Users',
            description: 'Manage user accounts and permissions',
            link: '/admin/users',
            stats: `${data.stats.totalUsers} total users`
        },
        {
            title: 'Automation Rules',
            icon: 'Zap',
            description: 'Create and manage automation rules',
            link: '/admin/automations',
            stats: 'Manage automations'
        }
    ];

    // Quick stats for the admin dashboard
    const quickStats = [
        {
            title: 'Active Devices',
            value: data.stats.activeDevices,
            icon: 'Cpu'
        },
        {
            title: 'Battery Level',
            value: `${data.stats.systemStatus.batteryLevel}%`,
            icon: 'Battery'
        },
        {
            title: 'Fresh Water',
            value: `${data.stats.systemStatus.freshWater}%`,
            icon: 'Droplet'
        },
        {
            title: 'Notifications',
            value: data.stats.unreadNotifications,
            icon: 'Bell'
        }
    ];
</script>

<div class="space-y-6">
    <div class="flex items-center space-x-2">
        <Icon name="Shield" class="h-6 w-6" />
        <h1 class="text-2xl font-semibold">Admin Dashboard</h1>
    </div>

    <!-- Quick Stats -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {#each quickStats as stat}
            <Card class="flex items-center space-x-4">
                <div class="p-3 bg-blue-100 rounded-lg">
                    <Icon name={stat.icon} class="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <p class="text-sm text-gray-500">{stat.title}</p>
                    <p class="text-xl font-semibold">{stat.value}</p>
                </div>
            </Card>
        {/each}
    </div>

    <!-- Admin Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        {#each adminSections as section}
            <Card class="cursor-pointer hover:shadow-lg transition-shadow duration-200"
                  on:click={() => goto(section.link)}>
                <div class="flex items-start space-x-4">
                    <div class="p-3 bg-blue-100 rounded-lg">
                        <Icon name={section.icon} class="h-6 w-6 text-blue-600" />
                    </div>
                    <div class="flex-1">
                        <h3 class="text-lg font-medium">{section.title}</h3>
                        <p class="text-gray-500 text-sm mt-1">{section.description}</p>
                        <p class="text-sm text-blue-600 mt-2">{section.stats}</p>
                    </div>
                    <Icon name="ChevronRight" class="h-5 w-5 text-gray-400" />
                </div>
            </Card>
        {/each}
    </div>
</div>