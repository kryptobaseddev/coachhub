// web/src/routes/+layout.svelte
<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import { i18n } from '$lib/i18n';
	import { ParaglideJS } from '@inlang/paraglide-sveltekit';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Dashboard from '$lib/components/Dashboard.svelte';
	import { page } from '$app/stores'; // Import necessary SvelteKit stores if needed
	let { children } = $props();

	let isAuthenticated = false;

onMount(() => {
		// For testing purposes, let's set isAuthenticated to true
		isAuthenticated = true;
	});
</script>

<ParaglideJS {i18n}>
	{@render children()}
</ParaglideJS>

<main class="flex h-screen bg-gray-100">
	{#if isAuthenticated}
	  <Sidebar />
	  <Dashboard />
	{:else}
	  <div class="w-full max-w-md mx-auto mt-20">
		<h1 class="text-3xl font-bold mb-6 text-center">CoachHub Login</h1>
		<form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
		  <div class="mb-4">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="username">
			  Username
			</label>
			<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" required>
		  </div>
		  <div class="mb-6">
			<label class="block text-gray-700 text-sm font-bold mb-2" for="password">
			  Password
			</label>
			<input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" required>
		  </div>
		  <div class="flex items-center justify-between">
			<button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
			  Sign In
			</button>
		  </div>
		</form>
	  </div>
	{/if}
  </main>