// web/src/routes/+page.svelte
<script>
    import { onMount } from 'svelte';
    import Dashboard from '$lib/components/Dashboard.svelte';
    import Sidebar from '$lib/components/Sidebar.svelte';

    let messages = [];

    onMount(async () => {
        const res = await fetch('/api/messages');
        if (res.ok) {
            messages = await res.json();
        }
    });
</script>

<div>
    <Sidebar />
    <Dashboard />
    <h1>Messages</h1>
    <ul>
        {#each messages as message}
            <li>
                PGN: {message.pgn}, Data: {message.data}, Timestamp: {message.timestamp}
            </li>
        {/each}
    </ul>
</div>
