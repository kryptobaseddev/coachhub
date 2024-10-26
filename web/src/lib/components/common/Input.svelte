<!-- src/lib/components/common/Input.svelte -->
<script>
    export let type = 'text';
    export let value = '';
    export let placeholder = '';
    export let label = '';
    export let error = '';
    export let required = false;

    $: inputClasses = `
        w-full
        px-3 py-2
        border rounded-md
        focus:outline-none focus:ring-2 focus:ring-blue-500
        disabled:bg-gray-100 disabled:cursor-not-allowed
        ${error ? 'border-red-500' : 'border-gray-300'}
        ${$$props.class || ''}
    `;
    let inputId = `input-${Math.random().toString(36).substr(2, 9)}`;
</script>

{#if label}
  <label for={inputId} class="block text-sm font-medium text-gray-700 mb-1">
    {label}
    {#if required}
      <span class="text-red-500">*</span>
    {/if}
  </label>
{/if}

<input
  id={inputId}
  {type}
  bind:value
  {placeholder}
  {required}
  class={inputClasses}
  {...$$restProps}
/>

{#if error}
    <p class="mt-1 text-sm text-red-600">{error}</p>
{/if}