import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { ReduxProvider } from './components/shared';

const appName = import.meta.env.VITE_APP_NAME || 'Cyperus';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <StrictMode>
                <ReduxProvider>
                    <App {...props} />
                </ReduxProvider>
            </StrictMode>,
        );
    },
    progress: {
        color: '#4A651F',
    },
});

// This will set light / dark mode on load...
initializeTheme();
