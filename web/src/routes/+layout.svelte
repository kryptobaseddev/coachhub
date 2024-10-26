<!-- src/routes/+layout.svelte -->
<script>
    import '../app.css';
    import { page } from '$app/stores';
    import { user } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import { 
        Home, 
        Sun, 
        CloudSun, 
        Droplet, 
        Bell, 
        Settings, 
        Users, 
        Power, 
        Menu 
    } from 'lucide-svelte';
    
    // Get the user data from server load function
    export let data;
    
    // Initialize the user store with server data
    $: $user = data.user;
  
    let isSidebarOpen = true;
  
    $: isLoggedIn = !!$user;
    $: userRole = $user?.role;
  
    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/dashboard' },
        { icon: Sun, label: 'Interior Devices', href: '/interior' },
        { icon: CloudSun, label: 'Exterior Devices', href: '/exterior' },
        { icon: Power, label: 'Climate Control', href: '/climate' },
        { icon: Droplet, label: 'Status Panel', href: '/status' },
        { icon: Bell, label: 'Notifications', href: '/notifications' },
    ];
  
    const adminMenuItems = [
        { icon: Settings, label: 'System Config', href: '/admin/system' },
        { icon: Settings, label: 'Coach Config', href: '/admin/coach' },
        { icon: Settings, label: 'Automations', href: '/admin/automations' },
        { icon: Users, label: 'User Management', href: '/admin/users' },
    ];
  
    $: allMenuItems = userRole === 'admin' ? [...menuItems, ...adminMenuItems] : menuItems;
  
    function handleLogout() {
        $user = null;
        goto('/login');
    }
</script>

{#if isLoggedIn && !$page.url.pathname.startsWith('/login')}
    <!-- Top Navigation Bar -->
    <nav class="bg-white shadow-sm fixed w-full z-50">
        <div class="mx-auto px-4">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <button
                        on:click={() => isSidebarOpen = !isSidebarOpen}
                        class="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none"
                    >
                        <Menu size={24} />
                    </button>
                    <div class="ml-4 font-semibold text-xl">CoachHub</div>
                </div>
                <div class="flex items-center">
                    <span class="mr-4">{$user?.email}</span>
                    <button
                        on:click={handleLogout}
                        class="px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Sidebar -->
    <div
        class="fixed inset-y-0 left-0 transform {isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        w-64 bg-white shadow-lg transition-transform duration-200 ease-in-out z-40 pt-16"
    >
        <nav class="mt-5">
            {#each allMenuItems as item}
                <a
                    href={item.href}
                    class="flex items-center px-6 py-3 text-gray-600 hover:bg-gray-100 
                    {$page.url.pathname === item.href ? 'bg-gray-100' : ''}"
                >
                    <svelte:component this={item.icon} size={20} />
                    <span class="ml-3">{item.label}</span>
                </a>
            {/each}
        </nav>
    </div>

    <!-- Main Content -->
    <main class="pt-16 {isSidebarOpen ? 'ml-64' : 'ml-0'} transition-all duration-200 ease-in-out">
        <div class="p-6">
            <slot />
        </div>
    </main>
{:else}
    <slot />
{/if}