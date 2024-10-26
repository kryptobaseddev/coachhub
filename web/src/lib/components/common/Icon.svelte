<!-- src/lib/components/common/Icon.svelte -->
<script lang="ts">
    import type { SvelteComponent } from 'svelte';
    import * as LucideIcons from 'lucide-svelte';

    type IconName = keyof typeof LucideIcons;

    export let name: IconName;
    export let size = 24;
    export let className = '';

    let IconComponent: typeof SvelteComponent;

    $: IconComponent = LucideIcons[name] as unknown as typeof SvelteComponent;
</script>

{#if IconComponent}
    <svelte:component 
        this={IconComponent}
        {size} 
        class={className}
        {...$$restProps}
    />
{/if}
