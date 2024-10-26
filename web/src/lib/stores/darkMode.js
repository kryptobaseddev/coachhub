import { writable } from 'svelte/store';
import { browser } from '$app/environment';

// Function to get initial dark mode state
function getInitialDarkMode() {
    if (browser) {
        // Check for user's preference in localStorage
        const savedMode = localStorage.getItem('darkMode');
        if (savedMode !== null) {
            return savedMode === 'true';
        }
        // If not set, check for system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false; // Default to light mode on the server
}

// Create the writable store
export const darkMode = writable(getInitialDarkMode());

// Function to toggle dark mode
export function toggleDarkMode() {
    darkMode.update(current => {
        const newMode = !current;
        if (browser) {
            localStorage.setItem('darkMode', newMode.toString());
            updateDarkMode(newMode);
        }
        return newMode;
    });
}

// Function to update the DOM for dark mode
function updateDarkMode(isDark) {
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

// Initialize dark mode on the client side
if (browser) {
    darkMode.subscribe(isDark => {
        updateDarkMode(isDark);
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        darkMode.set(e.matches);
    });
}
