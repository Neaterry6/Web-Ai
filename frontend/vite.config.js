import { defineConfig } from 'vite';

export default defineConfig({
  root: './src', // Set the source directory as the root
  build: {
    outDir: '../dist', // Output the build to the `dist` folder
  },
})
