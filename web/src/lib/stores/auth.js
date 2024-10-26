// src/lib/stores/auth.js
import { writable, derived } from 'svelte/store';

function createAuthStore() {
    const { subscribe, set, update } = writable(null);

    return {
        subscribe,
        set,
        update,
        logout: () => {
            set(null);
            // Add any other cleanup needed
        },
        updateUser: (userData) => {
            set(userData);
        }
    };
}

export const user = createAuthStore();
export const isAuthenticated = derived(user, $user => !!$user);
export const isAdmin = derived(user, $user => $user?.role === 'admin');