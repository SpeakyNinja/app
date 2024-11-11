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
            includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
            manifest: {
                name: 'Speaky Ninja',
                short_name: 'Speaky Ninja',
                description: 'Приложение для изучения английского по инновационной методике',
                display: "fullscreen",
                background_color: "#30313f",
                theme_color: '#30313f',
                icons: [
                    {
                        src: 'pwa-192x192.png',
                        sizes: '192x192',
                        type: 'image/png',
                        purpose: "maskable"
                    },
                    {
                        src: 'pwa-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: "maskable"
                    }
                ]
            },
            devOptions: {
                enabled: true,
            }
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
