<!-- src/lib/components/common/Icon.svelte -->
<script lang="ts">
    import type { Component } from 'svelte';
    import * as LucideIcons from 'lucide-svelte';

    type IconName = keyof typeof LucideIcons;

    const {
        name,
        size = 24,
        className = '',
        strokeWidth = undefined,
        absoluteStrokeWidth = undefined,
        color = undefined
    } = $props<{
        name: IconName;
        size?: number;
        className?: string;
        strokeWidth?: number;
        absoluteStrokeWidth?: number;
        color?: string;
    }>();

    const IconComponent = $derived(LucideIcons[name] as Component);
</script>

{#if IconComponent}
    {#key name}
        <IconComponent 
            {size} 
            {strokeWidth}
            {absoluteStrokeWidth}
            {color}
            class={className}
        />
    {/key}
{/if}
