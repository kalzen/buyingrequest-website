import '../css/app.css';

import type { Page } from '@inertiajs/core';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

type ZiggyPage = Page<Record<string, unknown>>;

const syncZiggy = (page?: ZiggyPage) => {
    if (typeof window === 'undefined') {
        return;
    }

    const ziggy = page?.props?.ziggy;
    if (ziggy) {
        window.Ziggy = ziggy as Window['Ziggy'];
    }
};

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        syncZiggy(props.initialPage as ZiggyPage);

        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

router.on('navigate', (event) => {
    syncZiggy(event.detail.page as ZiggyPage);
});

// This will set light / dark mode on load...
initializeTheme();
