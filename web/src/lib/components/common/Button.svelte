<!-- src/lib/components/common/Button.svelte -->
<script>
    export let variant = 'primary'; // primary, secondary, ghost, danger
    export let size = 'md'; // sm, md, lg
    export let type = 'button';
    export let disabled = false;

    const variants = {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    };

    const sizes = {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2',
        lg: 'px-6 py-3 text-lg'
    };

    $: classes = `
        ${variants[variant]}
        ${sizes[size]}
        rounded-md
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        inline-flex items-center justify-center
        transition-colors duration-200
        ${$$props.class || ''}
    `;
</script>

<button
    {type}
    {disabled}
    class={classes}
    on:click
    {...$$restProps}
>
    <slot />
</button>