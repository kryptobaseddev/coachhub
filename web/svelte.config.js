// svelte.config.js
import adapterStatic from '@sveltejs/adapter-static';
import adapterAuto from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: process.env.DEMO_MODE === 'true' 
      ? adapterStatic({ pages: 'build', assets: 'build', fallback: null })
      : adapterAuto(),
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils',
      $models: 'src/lib/models'
    }
  },
  preprocess: vitePreprocess()
};

export default config;
