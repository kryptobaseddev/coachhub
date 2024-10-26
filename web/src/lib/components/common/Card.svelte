<!-- src/lib/components/common/Card.svelte -->
<script>
    export let title = '';
    export let subtitle = '';
    export let padding = true;

    $: containerClasses = `
        bg-white
        rounded-lg
        shadow
        ${padding ? 'p-6' : ''}
        ${$$props.class || ''}
    `;
</script>

<div class={containerClasses}>
    {#if title}
        <div class="mb-4">
            <h3 class="text-lg font-medium text-gray-900">{title}</h3>
            {#if subtitle}
                <p class="mt-1 text-sm text-gray-500">{subtitle}</p>
            {/if}
        </div>
    {/if}
    <slot />
</div>