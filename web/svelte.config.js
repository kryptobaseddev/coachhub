// svelte.config.js
import adapterNode from '@sveltejs/adapter-node';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapterNode({ out: 'build' }),  // Node adapter output for SSR deployment
    alias: {
      $components: 'src/lib/components',
      $stores: 'src/lib/stores',
      $utils: 'src/lib/utils',
      $models: 'src/lib/models'
    }
  },
  preprocess: sveltePreprocess()
};

export default config;
