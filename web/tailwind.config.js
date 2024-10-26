/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: {
					DEFAULT: '#0f172a',
					light: '#1e293b',
					dark: '#020617'
				},
				secondary: {
					DEFAULT: '#64748b',
					light: '#94a3b8',
					dark: '#475569'
				}
			}
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('@tailwindcss/forms'),
		require('@tailwindcss/container-queries'),
		require('@tailwindcss/aspect-ratio')
	]
};