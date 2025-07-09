import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from './src/sanity/schemas';

export default defineConfig({
    name: 'default',
    title: 'Adriana Oliveira Fotografias',
    projectId: process.env.VITE_PROJECT_ID || 'luh7pu5f',
    dataset: process.env.VITE_DATASET || 'production',
    plugins: [deskTool()],
    schema: {
        types: [...schemas],
    },
});
