// frontend/vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        proxy: {
            '/login': 'http://localhost:3001',
            '/logout': 'http://localhost:3001',
            '/dashboard': 'http://localhost:3001',
        },
    },
});
