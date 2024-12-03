import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['jwt-decode'],
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
  define: {
    'process.env': {
      PAYPAL_CLIENT_ID: JSON.stringify(process.env.PAYPAL_CLIENT_ID),
    },
  },
});