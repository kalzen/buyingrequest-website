declare global {
    interface Window {
        Ziggy?: {
            routes: Record<string, unknown>;
            url?: string;
            port?: number | null;
            defaults?: Record<string, unknown>;
        } & Record<string, unknown>;
    }
}

export {};
