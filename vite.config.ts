// import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        // Wayfinder temporarily disabled - routes already generated
        // Run manually: D:\laragon\bin\php\php-8.3.20-nts-Win32-vs16-x64\php.exe artisan wayfinder:generate --with-form
        // wayfinder({
        //     formVariants: true,
        //     phpBinary: 'D:\\laragon\\bin\\php\\php-8.3.20-nts-Win32-vs16-x64\\php.exe',
        // }),
    ],
    esbuild: {
        jsx: 'automatic',
    },
});
