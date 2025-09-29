import AppLogoIcon from '@/components/app-logo-icon';
import { home } from '@/routes';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    name?: string;
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div className="relative flex min-h-screen flex-col lg:flex-row">
            <div className="relative hidden w-full flex-1 flex-col justify-between bg-gradient-to-br from-[#0b3d91] via-[#1f6feb] to-[#0b3d91] px-12 py-16 text-white lg:flex">
                <div className="flex items-center gap-3 text-white/90">
                    <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold">II</span>
                    <div>
                        <p className="text-lg font-semibold">INDUSTRIAL HUB</p>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/70">Global Sourcing Network</p>
                    </div>
                </div>
                <div className="max-w-md space-y-6">
                    <h2 className="text-3xl font-semibold leading-snug">
                        Accelerate supplier discovery with curated industrial insights.
                    </h2>
                    <p className="text-sm text-white/80">
                        Join a trusted community of buyers and manufacturers collaborating on high-impact projects worldwide.
                    </p>
                    <div className="grid gap-4 text-sm">
                        {[ '6M+ verified buyers', '50K audited suppliers', '48h average match time' ].map((item) => (
                            <div key={item} className="flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3">
                                <span className="flex size-6 items-center justify-center rounded-full bg-white/20 text-xs font-semibold">•</span>
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="text-xs text-white/60">
                    © {new Date().getFullYear()} Industrial Hub. All rights reserved.
                </div>
            </div>

            <div className="flex w-full flex-1 items-center justify-center bg-[#f5f7fb] px-6 py-12 lg:px-16">
                <div className="w-full max-w-md rounded-3xl border border-[#d6e0f5] bg-white p-10 shadow-xl">
                    <Link href={home()} className="flex items-center gap-2 text-primary">
                        <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                            <AppLogoIcon className="size-8 text-primary" />
                        </span>
                        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary/80">Industrial Hub</span>
                    </Link>
                    <div className="mt-6 space-y-2">
                        <h1 className="text-2xl font-semibold text-foreground">{title}</h1>
                        <p className="text-sm text-slate-600">{description}</p>
                    </div>
                    <div className="mt-8 space-y-6">{children}</div>
                </div>
            </div>
        </div>
    );
}
