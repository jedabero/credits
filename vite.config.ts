/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/credits/',
  plugins: [react(), eslint()],
  server: {
    watch: {
      ignored: ['**/coverage/**'],
    },
  },
});
