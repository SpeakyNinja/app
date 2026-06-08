import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: [],
            workbox: {
                cleanupOutdatedCaches: true,
                navigateFallback: 'index.html',
                navigateFallbackDenylist: [/^\/api\//],
            },
            devOptions: {
                enabled: true,
            },
        })
    ],

    resolve: {
        alias: {
          '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: `@import "@/assets/scss/global.scss";`,
    //         },
    //     },
    // },
})
