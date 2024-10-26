<!-- src/routes/admin/coach/+page.svelte -->
<script lang="ts">
    import { isDemoMode } from '$lib/stores/demoMode';
    import { Home, Server, Settings, Layout } from 'lucide-svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;
    
    let coach = data.coach;
    let configurations = data.configurations;
    
    let activeTab = 'info';
    let editingZone: any = null;
    let newZoneName = '';
    
    const tabs = [
        { id: 'info', label: 'Coach Info', icon: Home },
        { id: 'devices', label: 'Device Groups', icon: Server },
        { id: 'zones', label: 'Zones', icon: Layout }
    ];

    let selectedMake = coach?.make || '';
    let selectedModel = coach?.model || '';
    let selectedYear = coach?.year || '';
    let selectedFloorplan = coach?.floorplan || '';

    $: currentMake = configurations.makes.find((m: any) => m.name === selectedMake);
    $: currentModel = currentMake?.models.find((m: any) => m.name === selectedModel);
    $: currentYear = currentModel?.years.find((y: any) => y.year === selectedYear);

    $: availableModels = currentMake?.models || [];
    $: availableYears = currentModel?.years || [];
    $: availableFloorplans = currentYear?.floorplans || [];

    function updateCoach() {
        coach = {
            ...coach,
            make: selectedMake,
            model: selectedModel,
            year: selectedYear,
            floorplan: selectedFloorplan
        };
        console.log('Updated coach:', coach);
    }

    function handleMakeChange(event: any) {
        selectedMake = event.target.value;
        selectedModel = '';
        selectedYear = '';
        selectedFloorplan = '';
        updateCoach();
    }

    function handleModelChange(event: any) {
        selectedModel = event.target.value;
        selectedYear = '';
        selectedFloorplan = '';
        updateCoach();
    }

    function handleYearChange(event: any) {
        selectedYear = event.target.value;
        selectedFloorplan = '';
        updateCoach();
    }

    function handleFloorplanChange(event: any) {
        selectedFloorplan = event.target.value;
        updateCoach();
    }

    function addZone() {
        if (newZoneName.trim()) {
            coach.zones = [...coach.zones, newZoneName.trim()];
            handleCoachUpdate({ zones: coach.zones });
            newZoneName = '';
        }
    }

    function deleteZone(zoneName: any) {
        coach.zones = coach.zones.filter((z: any) => z !== zoneName);
        handleCoachUpdate({ zones: coach.zones });
    }

    async function handleCoachUpdate(updates: any) {
        if ($isDemoMode) {
            coach = { ...coach, ...updates };
        } else {
            try {
                const response = await fetch('/api/admin/coach', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updates)
                });
                if (!response.ok) throw new Error('Failed to update coach settings');
            } catch (error) {
                console.error('Error updating coach:', error);
            }
        }
    }
</script>

<div class="space-y-6">
    <div class="flex justify-between items-center">
        <h1 class="text-2xl font-bold text-gray-900">Coach Configuration</h1>
        {#if $isDemoMode}
            <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Demo Mode</span>
        {/if}
    </div>

    <!-- Tabs -->
    <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
            {#each tabs as tab}
                <button
                    type="button"
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
        {#if activeTab === 'info'}
            <form class="p-6 space-y-6" on:submit|preventDefault={updateCoach}>
                <div class="grid grid-cols-1 gap-6">
                    <!-- Coach Name -->
                    <div>
                        <label for="coach-name" class="block text-sm font-medium text-gray-700">
                            Coach Name
                        </label>
                        <input
                            id="coach-name"
                            type="text"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            placeholder="My Coach"
                            bind:value={coach.name}
                        />
                    </div>
                    
                    <!-- Make -->
                    <div>
                        <label for="coach-make" class="block text-sm font-medium text-gray-700">
                            Make
                        </label>
                        <select
                            id="coach-make"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            bind:value={selectedMake}
                            on:change={handleMakeChange}
                        >
                            <option value="">Select Make</option>
                            {#each configurations.makes as make}
                                <option value={make.name}>{make.name}</option>
                            {/each}
                        </select>
                    </div>

                    <!-- Model -->
                    <div>
                        <label for="coach-model" class="block text-sm font-medium text-gray-700">
                            Model
                        </label>
                        <select
                            id="coach-model"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            bind:value={selectedModel}
                            on:change={handleModelChange}
                            disabled={!selectedMake}
                        >
                            <option value="">Select Model</option>
                            {#each availableModels as model}
                                <option value={model.name}>{model.name}</option>
                            {/each}
                        </select>
                    </div>

                    <!-- Year -->
                    <div>
                        <label for="coach-year" class="block text-sm font-medium text-gray-700">
                            Year
                        </label>
                        <select
                            id="coach-year"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            bind:value={selectedYear}
                            on:change={handleYearChange}
                            disabled={!selectedModel}
                        >
                            <option value="">Select Year</option>
                            {#each availableYears as yearObj}
                                <option value={yearObj.year}>{yearObj.year}</option>
                            {/each}
                        </select>
                    </div>

                    <!-- Floorplan -->
                    <div>
                        <label for="coach-floorplan" class="block text-sm font-medium text-gray-700">
                            Floorplan
                        </label>
                        <select
                            id="coach-floorplan"
                            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                            bind:value={selectedFloorplan}
                            on:change={handleFloorplanChange}
                            disabled={!selectedYear}
                        >
                            <option value="">Select Floorplan</option>
                            {#each availableFloorplans as floorplan}
                                <option value={floorplan}>{floorplan}</option>
                            {/each}
                        </select>
                    </div>
                </div>

                <div class="pt-5">
                    <div class="flex justify-end">
                        <button
                            type="submit"
                            class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </form>
        {:else if activeTab === 'devices'}
            <div class="p-6">
                <div class="space-y-6">
                    {#each coach.deviceGroups as group}
                        <div class="border rounded-lg p-4">
                            <h3 class="font-medium text-lg mb-3">{group.name}</h3>
                            <div class="space-y-2">
                                {#each group.devices as deviceId}
                                    <div class="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                                        <span>{deviceId}</span>
                                        <button 
                                            type="button"
                                            class="text-red-600 hover:text-red-800"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {:else if activeTab === 'zones'}
            <div class="p-6">
                <div class="mb-6">
                    <div class="flex space-x-4">
                        <label for="new-zone-name" class="sr-only">New zone name</label>
                        <input
                            id="new-zone-name"
                            type="text"
                            class="flex-1 rounded-md border-gray-300 shadow-sm"
                            placeholder="New zone name"
                            bind:value={newZoneName}
                        />
                        <button
                            type="button"
                            class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            on:click={addZone}
                        >
                            Add Zone
                        </button>
                    </div>
                </div>

                <div class="space-y-4">
                    {#each coach.zones as zone}
                        <div class="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg">
                            {#if editingZone === zone}
                                <label for="edit-zone-{zone}" class="sr-only">Edit zone name</label>
                                <input
                                    id="edit-zone-{zone}"
                                    type="text"
                                    class="rounded-md border-gray-300 shadow-sm"
                                    bind:value={zone}
                                    on:blur={() => editingZone = null}
                                />
                            {:else}
                                <span>{zone}</span>
                            {/if}
                            <div class="flex space-x-2">
                                <button
                                    type="button"
                                    class="text-gray-600 hover:text-gray-800"
                                    on:click={() => editingZone = zone}
                                    aria-label="Edit zone"
                                >
                                    <Settings size={16} />
                                </button>
                                <button
                                    type="button"
                                    class="text-red-600 hover:text-red-800"
                                    on:click={() => deleteZone(zone)}
                                    aria-label="Delete zone"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </div>
</div>