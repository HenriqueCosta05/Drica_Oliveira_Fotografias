import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import sanity from '@sanity/astro'

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dricaoliveirafotografia.com.br',
  integrations: [react(), sitemap({
    changefreq: 'daily',
    priority: 0.7
  }),
    sanity({
      projectId: import.meta.env.VITE_PROJECT_ID,
      dataset: import.meta.env.VITE_DATASET,
      studioBasePath: '/studio',
    })],
  output: 'server',
  vite: {
    plugins: [tailwindcss()]
  }
});