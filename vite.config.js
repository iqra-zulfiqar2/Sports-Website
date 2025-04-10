import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      manifestFilename: 'manifest.json',
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'Live Match Zone',
        short_name: 'PWA App',
        description: 'Your Ultimate Destination for Live Sports!',
        theme_color: '#000000',
        background_color: '#000000',
        display: 'standalone',
        icons: [
          {
            "src": "/icons/icon192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icons/icon512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
      }
    })
  ]
});
