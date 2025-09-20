import { Link, router, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
    LayoutDashboard,
    FileText,
    Images,
    ListChecks,
    Users,
    LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import adminRoutes from '@/routes/admin';
import { logout } from '@/routes';
import type { SharedData } from '@/types';

interface AdminLayoutProps {
    children: ReactNode;
    title?: string;
}

const navItems = [
    {
        title: 'Overview',
        icon: LayoutDashboard,
        route: adminRoutes.dashboard,
    },
    {
        title: 'Pages',
        icon: FileText,
        route: adminRoutes.pages.index,
    },
    {
        title: 'Slides',
        icon: Images,
        route: adminRoutes.slides.index,
    },
    {
        title: 'Buyer Requests',
        icon: ListChecks,
        route: adminRoutes.buyerRequests.index,
    },
    {
        title: 'Suppliers',
        icon: Users,
        route: adminRoutes.suppliers.index,
    },
    {
        title: 'Media Library',
        icon: Images,
        route: adminRoutes.media.index,
    },
];

export default function AdminLayout({ children, title }: AdminLayoutProps) {
    const { url, props } = usePage<SharedData>();

    return (
        <div className="min-h-screen bg-neutral-950 text-neutral-100">
            <aside className="fixed inset-y-0 left-0 hidden w-64 flex-col border-r border-white/10 bg-neutral-950/90 px-4 py-6 lg:flex">
                <Link
                    href={adminDashboard()}
                    className="mb-8 flex items-center gap-2 text-lg font-semibold text-white"
                >
                    SupplySphere Admin
                </Link>
                <nav className="flex flex-1 flex-col gap-1">
                    {navItems.map((item) => {
                        const href = item.route();
                        const isActive = url.startsWith(
                            typeof href === 'string' ? href : href.url,
                        );
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.title}
                                href={href}
                                className={cn(
                                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition',
                                    isActive
                                        ? 'bg-orange-500 text-white'
                                        : 'text-neutral-400 hover:bg-neutral-800 hover:text-white',
                                )}
                            >
                                <Icon className="size-4" />
                                {item.title}
                            </Link>
                        );
                    })}
                </nav>
                <Separator className="my-4 bg-white/10" />
                <Button
                    variant="ghost"
                    className="justify-start gap-2 text-neutral-400 hover:bg-neutral-800 hover:text-white"
                    onClick={() => router.post(logout())}
                >
                    <LogOut className="size-4" />
                    Sign out
                </Button>
            </aside>
            <div className="lg:pl-64">
                <header className="border-b border-white/10 bg-neutral-950/60 backdrop-blur">
                    <div className="flex h-16 items-center justify-between px-4">
                        <div>
                            <p className="text-xs uppercase tracking-widest text-neutral-500">
                                Admin Console
                            </p>
                            <h1 className="text-xl font-semibold text-white">
                                {title ?? 'Dashboard'}
                            </h1>
                        </div>
                        <div className="hidden items-center gap-2 text-sm text-neutral-400 md:flex">
                            <span>Signed in as</span>
                            <strong className="text-white">
                                {props.auth.user?.name}
                            </strong>
                        </div>
                    </div>
                </header>
                <main className="min-h-[calc(100vh-4rem)] bg-neutral-950 px-4 py-8 text-neutral-100">
                    <div className="mx-auto w-full max-w-6xl space-y-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

