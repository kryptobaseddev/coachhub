<!-- src/routes/login/+page.svelte -->
<script>
    import { enhance } from '$app/forms';
    import Card from '$lib/components/common/Card.svelte';
    import Input from '$lib/components/common/Input.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import Icon from '$lib/components/common/Icon.svelte';
    
    export let form;
    let isLoading = false;
  </script>
  
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md">
      <Card>
        <form 
          method="POST" 
          class="space-y-6"
          use:enhance={() => {
            isLoading = true;
            return async ({ update }) => {
              await update();
              isLoading = false;
            };
          }}
        >
          <div class="text-center">
            <div class="flex justify-center mb-2">
              <Icon name="Home" class="h-8 w-8 text-blue-600" />
            </div>
            <h1 class="text-2xl font-bold">CoachHub</h1>
            <p class="text-gray-600 mt-2">Enter your credentials to access your motorhome controls</p>
          </div>
  
          {#if form?.error}
            <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <span class="block sm:inline">{form.error}</span>
            </div>
          {/if}
  
          <Input
            label="Email"
            id="email"
            type="email"
            name="email"
            value={form?.email ?? ''}
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
            <p>Admin: admin@demo.com / admin</p>
            <p>User: user@demo.com / user</p>
          </div>
        </form>
      </Card>
    </div>
  </div>