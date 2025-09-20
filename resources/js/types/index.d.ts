import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import { route as ziggyRoute } from 'ziggy-js';

declare global {
    function route(name: string, params?: any, absolute?: boolean): string;
}

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface CmsPageLink {
    id: number;
    slug: string;
    title: string;
    slug: string;
    url: string;
    routeName: string;
    routeParams: Record<string, unknown>;
}

export interface CmsSlideLink {
    id: number;
    title: string;
    description?: string | null;
    cta?: string | null;
    ctaRoute?: string | null;
    ctaUrl?: string | null;
    image: string;
}

export interface SharedCms {
    slides: CmsSlideLink[];
    footerLinks: {
        marketplace: CmsPageLink[];
        suppliers: CmsPageLink[];
    };
    contact: {
        email: string;
        phone: string;
        hours: string;
        locations: string[];
    };
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    cms?: SharedCms;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

export interface MarketplaceCategory {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    requestsCount: number;
}

export interface FeaturedSupplierCategory {
    name: string;
    slug: string;
}

export interface FeaturedSupplier {
    id: number;
    companyName: string;
    headline: string;
    logoUrl?: string | null;
    coverImageUrl?: string | null;
    location?: string | null;
    rating: number;
    isVerified: boolean;
    countriesServed: string[];
    categories: FeaturedSupplierCategory[];
    url: string;
}

export interface MarketplaceRequest {
    id: number;
    slug: string;
    title: string;
    summary?: string | null;
    category?: string | null;
    budgetMin?: number | null;
    budgetMax?: number | null;
    currency: string;
    quantity?: number | null;
    unit?: string | null;
    preferredLocation?: string | null;
    leadValidUntil?: string | null;
    createdAt?: string | null;
    status: string;
    buyer?: {
        name: string;
    };
}

export interface HeroSlide {
    id: number;
    title: string;
    description?: string | null;
    cta?: string | null;
    ctaRoute?: string | null;
    ctaUrl?: string | null;
    image: string;
}

export interface MarketplaceStats {
    verifiedSuppliers: number;
    activeBuyRequests: number;
    countriesCovered: number;
}





