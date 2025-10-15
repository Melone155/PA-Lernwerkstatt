import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    define: {
        'import.meta.env.BackendIP': JSON.stringify('localhost')
    },
    plugins: [react(), tailwindcss()],
    build: {
        rollupOptions: {
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === 'favicon.ico') {
                        return 'favicon.ico'
                    }
                    return 'assets/[name]-[hash][extname]'
                }
            }
        }
    },
    publicDir: 'public',
    server: {
        port: 3000,
        open: true
    }
})

