import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dricaoliveirafotografia.com.br',
  integrations: [react(), sitemap({
    changefreq: 'daily',
    priority: 0.7
  })],
  vite: {
    plugins: [tailwindcss()]
  }
});