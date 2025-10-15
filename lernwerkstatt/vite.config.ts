import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
    base: "/",
    plugins: [
        tailwindcss(),
    ],
    define: {
        'import.meta.env.BackendIP': JSON.stringify(process.env.VITE_BACKEND_IP || 'localhost')
    }
})