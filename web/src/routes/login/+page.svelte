<!-- src/routes/login/+page.svelte -->
<script>
  import { enhance } from '$app/forms';
  import Card from '$lib/components/common/Card.svelte';
  import Input from '$lib/components/common/Input.svelte';
  import Button from '$lib/components/common/Button.svelte';

  export let form;
  let isLoading = false;
  let identifier = ''; // Holds either email or username
</script>

<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="w-full max-w-md">
    <Card>
      <form 
        method="POST" 
        class="space-y-4"
        use:enhance={() => {
          isLoading = true;
          return async ({ update, result }) => {
            await update();
            isLoading = false;
            
            // Show form error message if login fails
            if (result.type === 'failure' && result.data.error) {
              form = result.data;
            }
          };
        }}
      >
        <div class="text-center">
          <div class="flex justify-center">
            <!-- Coachhub logo -->
            <img src="/coachhub-logo-ImageLine.svg" alt="Coachub Logo" class="h-auto w-auto" />
          </div>
          <p class="text-gray-600 mt-2">Enter your credentials to access your motorhome controls</p>
        </div>

        {#if form?.error}
          <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span class="block sm:inline">{form.error}</span>
          </div>
        {/if}

        <Input
          label="Email or Username"
          id="identifier"
          type="text"
          name="identifier"
          bind:value={identifier}
          required
        />

        <Input
          label="Password"
          id="password"
          type="password"
          name="password"
          required
        />

        <Button
          type="submit"
          disabled={isLoading}
          class="w-full"
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>

        <div class="text-center text-sm text-gray-600">
          <p class="font-medium mb-1">Demo credentials:</p>
          <p>Admin: admin / admin</p>
          <p>User: user / user</p>
        </div>
      </form>
    </Card>
  </div>
</div>
