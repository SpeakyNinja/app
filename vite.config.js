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
                        src: 'pwa.svg',
                        sizes: '72x72 96x96 120x120 128x128 144x144 152x152 180x180 192x192 256x256 512x512',
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
