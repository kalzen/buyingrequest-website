import { Link, usePage } from '@inertiajs/react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Menu, ArrowRight, Linkedin, Twitter, Youtube, Mail, Phone } from 'lucide-react';
import { PropsWithChildren, useMemo } from 'react';
import { home, login, register } from '@/routes';
import type { SharedData, CmsPageLink } from '@/types';

const NAV_LINKS = [
    { key: 'buyers', label: 'For Buyers' },
    { key: 'suppliers', label: 'For Suppliers' },
    { key: 'insights', label: 'Industry Insights' },
    { key: 'about', label: 'About Us' },
    { key: 'support', label: 'Support' },
];

export default function LandingLayout({ children }: PropsWithChildren) {
    const { props } = usePage<SharedData>();
    const cms = props.cms;
    const homeUrl = home().url;

    const footerMarketplace = cms?.footerLinks.marketplace ?? [];
    const footerSuppliers = cms?.footerLinks.suppliers ?? [];

    const navigation = useMemo(
        () =>
            NAV_LINKS.map((link) => ({
                ...link,
                href:
                    link.key === 'buyers'
                        ? `${homeUrl}#buyers`
                        : link.key === 'suppliers'
                        ? `${homeUrl}#suppliers`
                        : link.key === 'insights'
                        ? `${homeUrl}#insights`
                        : link.key === 'support'
                        ? `${homeUrl}#support`
                        : `${homeUrl}#about`,
            })),
        [homeUrl],
    );

    const renderFooterLinks = (links: CmsPageLink[]) => (
        <ul className="mt-4 space-y-2">
            {links.map((link) => (
                <li key={link.id}>
                    <Link href={link.url} className="transition hover:text-primary">
                        {link.title}
                    </Link>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="min-h-screen bg-[#f5f7fb] text-foreground">
            <header className="border-b border-[#d6e0f5] bg-white/90 backdrop-blur">
                <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-4 py-4">
                    <Link href={homeUrl} className="flex items-center gap-3 text-primary">
                        <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
                            II
                        </span>
                        <div className="leading-tight">
                            <p className="text-lg font-semibold text-foreground">INDUSTRIAL HUB</p>
                            <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">
                                Connect. Source. Grow.
                            </p>
                        </div>
                    </Link>

                    <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                        {navigation.map((item) => (
                            <Link
                                key={item.key}
                                href={item.href}
                                className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                            >
                                {item.label}
                                <ArrowRight className="size-3 translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                            </Link>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        <Button variant="ghost" className="text-sm font-semibold text-primary" asChild>
                            <Link href={login().url}>Log in</Link>
                        </Button>
                        <Button className="rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/20 hover:bg-primary/90" asChild>
                            <Link href={register().url}>Register</Link>
                        </Button>
                    </div>

                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="md:hidden">
                                <Menu className="size-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-72 border-l border-[#d6e0f5] bg-white">
                            <SheetHeader>
                                <SheetTitle className="text-primary">INDUSTRIAL HUB</SheetTitle>
                            </SheetHeader>
                            <div className="mt-6 flex flex-col gap-5">
                                {navigation.map((item) => (
                                    <Link key={item.key} href={item.href} className="text-sm font-medium text-slate-600 transition hover:text-primary">
                                        {item.label}
                                    </Link>
                                ))}
                                <Separator />
                                <div className="flex flex-col gap-2">
                                    <Button variant="outline" asChild>
                                        <Link href={login().url}>Log in</Link>
                                    </Button>
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                        <Link href={register().url}>Register</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </header>

            <main className="bg-gradient-to-b from-white via-[#f0f4ff] to-[#f5f7fb]">
                {children}
            </main>

            <footer id="support" className="border-t border-[#d6e0f5] bg-white">
                <div className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-12 lg:grid-cols-[1.5fr,1fr,1fr,1fr]">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-primary">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">II</span>
                            <div className="font-semibold text-foreground">INDUSTRIAL HUB</div>
                        </div>
                        <p className="text-sm text-slate-600">
                            We connect global buyers with trusted industrial suppliers to accelerate sourcing, innovation, and growth.
                        </p>
                        <div className="flex items-center gap-3">
                            {[
                                { icon: Linkedin, href: 'https://www.linkedin.com' },
                                { icon: Twitter, href: 'https://www.twitter.com' },
                                { icon: Youtube, href: 'https://www.youtube.com' },
                            ].map(({ icon: Icon, href }) => (
                                <a
                                    key={href}
                                    href={href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex size-9 items-center justify-center rounded-full border border-[#d6e0f5] text-primary transition hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Icon className="size-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-foreground">Marketplace</h4>
                        {renderFooterLinks(footerMarketplace)}
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-foreground">Suppliers</h4>
                        {renderFooterLinks(footerSuppliers)}
                    </div>

                    <div className="text-sm text-slate-600">
                        <h4 className="text-sm font-semibold text-foreground">Contact</h4>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-center gap-2">
                                <Mail className="size-4 text-primary" />
                                <a href={`mailto:${cms?.contact.email ?? 'hello@industrialhub.com'}`} className="transition hover:text-primary">
                                    {cms?.contact.email ?? 'hello@industrialhub.com'}
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="size-4 text-primary" />
                                <a href={`tel:${cms?.contact.phone ?? '+18880001234'}`} className="transition hover:text-primary">
                                    {cms?.contact.phone ?? '+1 (888) 000-1234'}
                                </a>
                            </li>
                            <li>{cms?.contact.hours ?? 'Mon - Fri · 9:00 - 18:00 (UTC+7)'}</li>
                            <li>{cms?.contact.locations?.join(', ') ?? 'Singapore · Ho Chi Minh City'}</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-[#d6e0f5] bg-[#eef2fb] py-4 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} Industrial Hub. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
