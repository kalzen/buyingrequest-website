import { route as ziggyRoute } from 'ziggy-js';

declare global {
    interface Window {
        Ziggy?: {
            url?: string;
        } & Record<string, unknown>;
    }
}

function resolveIdentifier(params: unknown, keys: string[]): string | number | undefined {
    if (typeof params === 'string' || typeof params === 'number') {
        return params;
    }

    if (params && typeof params === 'object') {
        const payload = params as Record<string, unknown>;
        for (const key of keys) {
            const candidate = payload[key];
            if (typeof candidate === 'string' || typeof candidate === 'number') {
                return candidate;
            }
        }
    }

    return undefined;
}

function resolveBaseUrl(): { origin: string; path: string } {
    if (typeof window === 'undefined') {
        return { origin: '', path: '' };
    }

    const ziggyUrl = window.Ziggy?.url;
    if (typeof ziggyUrl === 'string' && ziggyUrl.length > 0) {
        try {
            const url = new URL(ziggyUrl);
            return {
                origin: `${url.protocol}//${url.host}`,
                path: url.pathname.replace(/\/$/, ''),
            };
        } catch (_error) {
            const cleaned = ziggyUrl.replace(/\/$/, '');
            return { origin: cleaned, path: '' };
        }
    }

    return { origin: '', path: '' };
}

function buildUrl(path: string, absolute?: boolean): string {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    const { origin, path: basePath } = resolveBaseUrl();
    const mergedPath = `${basePath}${normalizedPath}`;

    if (absolute) {
        return `${origin}${mergedPath}`;
    }

    return mergedPath;
}

function buildResourceUrl(segment: string, identifier: string | number, absolute?: boolean): string {
    const encoded = encodeURIComponent(String(identifier));
    return buildUrl(`/${segment}/${encoded}`, absolute);
}

const fallbackRoutes: Record<string, (absolute?: boolean) => string> = {
    register: (absolute) => buildUrl('/register', absolute),
    login: (absolute) => buildUrl('/login', absolute),
    home: (absolute) => buildUrl('/', absolute),
    dashboard: (absolute) => buildUrl('/dashboard', absolute),
    'suppliers.index': (absolute) => buildUrl('/suppliers', absolute),
    'categories.show': (absolute) => buildUrl('/categories', absolute),
    'requests.show': (absolute) => buildUrl('/requests', absolute),
};

export function route(name: string, params?: any, absolute?: boolean): string {
    // Fallback when Ziggy has not initialized yet
    try {
        const config = typeof window !== 'undefined' ? window.Ziggy : undefined;
        return ziggyRoute(name, params, absolute, config);
    } catch (error) {
        console.warn('Ziggy route not found:', name, error);

        const supplierId = resolveIdentifier(params, ['supplierProfile', 'slug', 'id']);
        if (name === 'suppliers.show' && supplierId !== undefined) {
            return buildResourceUrl('suppliers', supplierId, absolute);
        }
        const categoryId = resolveIdentifier(params, ['category', 'slug', 'id']);
        if (name === 'categories.show' && categoryId !== undefined) {
            return buildResourceUrl('categories', categoryId, absolute);
        }

        const requestId = resolveIdentifier(params, ['buyerRequest', 'slug', 'id']);
        if (name === 'requests.show' && requestId !== undefined) {
            return buildResourceUrl('requests', requestId, absolute);
        }

        const fallback = fallbackRoutes[name];
        return fallback ? fallback(absolute) : '#';
    }
}


