<!-- src/routes/admin/users/+page.svelte -->
<script>
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    import Icon from '$lib/components/common/Icon.svelte';
    import Button from '$lib/components/common/Button.svelte';
    import Input from '$lib/components/common/Input.svelte';
    import Card from '$lib/components/common/Card.svelte';
    
    /** @type {import('./$types').PageData} */
    export let data;

    let users = data.users;
    let searchTerm = '';
    let showUserDialog = false;
    let editingUser = null;
    let message = '';

    $: filteredUsers = users.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    function showMessage(msg, duration = 3000) {
        message = msg;
        setTimeout(() => message = '', duration);
    }

    function handleUserFormSubmit(event) {
        const formData = new FormData(event.target);
        
        if (editingUser) {
            users = users.map(user => 
                user.id === editingUser.id 
                    ? {
                        ...user,
                        name: formData.get('name'),
                        email: formData.get('email'),
                        role: formData.get('role')
                    } 
                    : user
            );
        } else {
            users = [...users, {
                id: String(users.length + 1),
                name: formData.get('name'),
                email: formData.get('email'),
                role: formData.get('role'),
                lastLogin: new Date().toISOString()
            }];
        }

        showUserDialog = false;
        editingUser = null;
        showMessage(`User ${editingUser ? 'updated' : 'created'} successfully`);
    }

    function handleDeleteUser(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            users = users.filter(user => user.id !== userId);
            showMessage('User deleted successfully');
        }
    }
</script>

<div class="space-y-4">
    <Card>
        <!-- Header -->
        <div class="flex justify-between items-center mb-6">
            <div class="flex items-center space-x-2">
                <Icon name="Users" class="h-6 w-6" />
                <h1 class="text-2xl font-semibold">User Management</h1>
            </div>
            <Button 
                on:click={() => {
                    editingUser = null;
                    showUserDialog = true;
                }}
            >
                <Icon name="Plus" class="h-4 w-4 mr-2" />
                Add User
            </Button>
        </div>

        <!-- Search -->
        <div class="mb-6">
            <Input
                type="text"
                bind:value={searchTerm}
                placeholder="Search users..."
                class="pl-10"
            >
                <Icon name="Search" class="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            </Input>
        </div>

        <!-- Message Display -->
        {#if message}
            <div 
                transition:fade 
                class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6"
            >
                {message}
            </div>
        {/if}

        <!-- Users Table -->
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Last Login</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {#each filteredUsers as user (user.id)}
                        <tr transition:fade>
                            <td class="px-6 py-4 whitespace-nowrap">{user.name}</td>
                            <td class="px-6 py-4 whitespace-nowrap">{user.email}</td>
                            <td class="px-6 py-4 whitespace-nowrap capitalize">{user.role}</td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                {new Date(user.lastLogin).toLocaleString()}
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right">
                                <Button
                                    variant="ghost"
                                    on:click={() => {
                                        editingUser = user;
                                        showUserDialog = true;
                                    }}
                                >
                                    <Icon name="Edit2" class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    on:click={() => handleDeleteUser(user.id)}
                                >
                                    <Icon name="Trash2" class="h-4 w-4 text-red-500" />
                                </Button>
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </Card>
</div>

<!-- User Dialog -->
{#if showUserDialog}
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" transition:fade>
        <Card class="w-full max-w-md">
            <h3 class="text-lg font-semibold mb-4">
                {editingUser ? 'Edit User' : 'Add New User'}
            </h3>
            
            <form 
                on:submit|preventDefault={handleUserFormSubmit}
                class="space-y-4"
            >
                {#if editingUser}
                    <input type="hidden" name="id" value={editingUser.id} />
                {/if}
                
                <Input
                    type="text"
                    name="name"
                    label="Name"
                    required
                    value={editingUser?.name ?? ''}
                />
                
                <Input
                    type="email"
                    name="email"
                    label="Email"
                    required
                    value={editingUser?.email ?? ''}
                />
                
                <div>
                    <label class="block text-sm font-medium text-gray-700">Role</label>
                    <select 
                        name="role"
                        required
                        class="mt-1 w-full p-2 border rounded-md"
                        value={editingUser?.role ?? 'user'}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                
                <div class="flex justify-end space-x-2 pt-4">
                    <Button
                        variant="secondary"
                        on:click={() => {
                            showUserDialog = false;
                            editingUser = null;
                        }}
                    >
                        Cancel
                    </Button>
                    <Button type="submit">
                        {editingUser ? 'Save Changes' : 'Create User'}
                    </Button>
                </div>
            </form>
        </Card>
    </div>
{/if}