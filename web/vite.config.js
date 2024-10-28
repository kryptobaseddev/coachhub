// vite.config.js
import { defineConfig } from 'vite';
import { paraglide } from '@inlang/paraglide-sveltekit/vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [
    sveltekit(),
    paraglide({
      project: './project.inlang',
      outdir: './src/lib/paraglide'
    })
  ],
  ssr: {
    noExternal: ['lucide-svelte']
  },
  // build: {
  //   rollupOptions: {
  //     input: {
  //       demoData: 'src/lib/demoData/demoData.js',
  //       coachConfigs: 'src/lib/demoData/coachConfigs.js',
  //       main: 'src/routes/index.svelte',
  //       login: 'src/routes/login/+page.svelte'
  //     }
  //   }
  // }
});
