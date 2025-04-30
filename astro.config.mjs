import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import path from 'path'

// https://astro.build/config
export default defineConfig({
  integrations: [vue(), tailwind()],
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src'), 
      },
    },
  },
});
