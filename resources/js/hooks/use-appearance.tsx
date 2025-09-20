import { useCallback, useEffect, useState } from 'react';

// Chỉ cho phép theme light
export type Appearance = 'light';

const setCookie = (name: string, value: string, days = 365) => {
    if (typeof document === 'undefined') {
        return;
    }

    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const applyTheme = () => {
    // Luôn áp dụng theme light
    document.documentElement.classList.remove('dark');
    document.documentElement.classList.add('light');
    document.documentElement.style.colorScheme = 'light';
};

export function initializeTheme() {
    // Luôn áp dụng theme light
    applyTheme();
}

export function useAppearance() {
    // Luôn là light
    const [appearance, setAppearance] = useState<Appearance>('light');

    const updateAppearance = useCallback(() => {
        setAppearance('light');
        localStorage.setItem('appearance', 'light');
        setCookie('appearance', 'light');
        applyTheme();
    }, []);

    useEffect(() => {
        updateAppearance();
        // Không cần removeEventListener vì không lắng nghe thay đổi hệ thống nữa
    }, [updateAppearance]);

    return { appearance, updateAppearance } as const;
}
