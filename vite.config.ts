import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input: { main: 'index.html', sharedTrip: 'shared-trip.html' } } },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
});
