import { Link } from '@inertiajs/react';
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
import { PropsWithChildren } from 'react';

const navItems = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Buying Requests', href: '#buying-requests' },
    { label: 'Suppliers', href: '#suppliers' },
    { label: 'Resources', href: '#resources' },
];

function NavigationLinks({
    className = '',
    onClick,
}: {
    className?: string;
    onClick?: () => void;
}) {
    return (
        <nav className={`flex items-center gap-6 text-sm font-medium ${className}`}>
            {navItems.map((item) => (
                <a
                    key={item.label}
                    href={item.href}
                    className="group inline-flex items-center gap-1 text-white/80 transition hover:text-white"
                    onClick={onClick}
                >
                    {item.label}
                    <ArrowRight className="size-3 translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                </a>
            ))}
        </nav>
    );
}

export default function LandingLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-gradient-to-b from-orange-500 via-orange-500/90 to-orange-50">
            <header className="sticky top-0 z-40 border-b border-white/15 bg-orange-500/95 backdrop-blur">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4">
                    <Link href="/" className="flex items-center gap-2 text-white">
                        <span className="flex size-10 items-center justify-center rounded-xl bg-white/15 text-2xl font-bold">S</span>
                        <div className="leading-tight">
                            <p className="font-semibold tracking-wide">SupplySphere</p>
                            <p className="text-xs text-white/70">Global sourcing network</p>
                        </div>
                    </Link>

                    <div className="hidden items-center gap-6 md:flex">
                        <NavigationLinks />
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" className="text-white/80 hover:text-white" asChild>
                                <Link href="/login">Sign in</Link>
                            </Button>
                            <Button className="bg-white text-orange-600 hover:bg-white/90" asChild>
                                <Link href="/register">Join as supplier</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="flex md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-white">
                                    <Menu className="size-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-72 bg-white">
                                <SheetHeader>
                                    <SheetTitle>SupplySphere</SheetTitle>
                                </SheetHeader>
                                <div className="mt-6 flex flex-col gap-6">
                                    <NavigationLinks
                                        className="flex-col items-start gap-3 text-base text-neutral-700"
                                        onClick={() => undefined}
                                    />
                                    <Separator />
                                    <div className="flex flex-col gap-2">
                                        <Button variant="outline" asChild>
                                            <Link href="/login">Sign in</Link>
                                        </Button>
                                        <Button className="bg-orange-500 hover:bg-orange-500/90" asChild>
                                            <Link href="/register">Join as supplier</Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>

            <main className="bg-white text-neutral-900">{children}</main>

            <footer className="border-t border-orange-100 bg-white" id="resources">
                <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 md:grid-cols-4">
                    <div>
                        <div className="flex items-center gap-2 text-orange-600">
                            <span className="flex size-10 items-center justify-center rounded-xl bg-orange-500/10 text-2xl font-bold">
                                S
                            </span>
                            <div className="font-semibold">SupplySphere</div>
                        </div>
                        <p className="mt-4 text-sm text-neutral-600">
                            Powering trusted partnerships between ambitious buyers and world-class manufacturers.
                        </p>
                        <div className="mt-5 flex items-center gap-3 text-orange-600">
                            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="rounded-full bg-orange-500/10 p-2 transition hover:bg-orange-500/80 hover:text-white">
                                <Linkedin className="size-4" />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noreferrer" className="rounded-full bg-orange-500/10 p-2 transition hover:bg-orange-500/80 hover:text-white">
                                <Twitter className="size-4" />
                            </a>
                            <a href="https://www.youtube.com" target="_blank" rel="noreferrer" className="rounded-full bg-orange-500/10 p-2 transition hover:bg-orange-500/80 hover:text-white">
                                <Youtube className="size-4" />
                            </a>
                        </div>
                    </div>
                    <div className="text-sm text-neutral-600">
                        <p className="font-semibold text-neutral-800">Marketplace</p>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="#buying-requests" className="transition hover:text-orange-600">
                                    Live buying requests
                                </a>
                            </li>
                            <li>
                                <a href="#suppliers" className="transition hover:text-orange-600">
                                    Verified suppliers
                                </a>
                            </li>
                            <li>
                                <a href="#solutions" className="transition hover:text-orange-600">
                                    Solutions overview
                                </a>
                            </li>
                            <li>
                                <a href="#resources" className="transition hover:text-orange-600">
                                    Help center
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm text-neutral-600">
                        <p className="font-semibold text-neutral-800">For suppliers</p>
                        <ul className="mt-4 space-y-2">
                            <li>
                                <a href="/register" className="transition hover:text-orange-600">
                                    Become a partner
                                </a>
                            </li>
                            <li>
                                <a href="/login" className="transition hover:text-orange-600">
                                    Supplier sign in
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition hover:text-orange-600">
                                    Advertising options
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition hover:text-orange-600">
                                    Success stories
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="text-sm text-neutral-600">
                        <p className="font-semibold text-neutral-800">Contact</p>
                        <ul className="mt-4 space-y-3">
                            <li className="flex items-center gap-2">
                                <Mail className="size-4 text-orange-500" />
                                <a href="mailto:hello@supplysphere.com" className="transition hover:text-orange-600">
                                    hello@supplysphere.com
                                </a>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone className="size-4 text-orange-500" />
                                <a href="tel:+18880001234" className="transition hover:text-orange-600">
                                    +1 (888) 000-1234
                                </a>
                            </li>
                            <li>
                                <span>Mon - Fri, 9:00 - 18:00 (UTC+7)</span>
                            </li>
                            <li>
                                <span>Ho Chi Minh City &amp; Singapore</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-orange-100 bg-orange-50/60 py-4 text-center text-xs text-neutral-500">
                    © {new Date().getFullYear()} SupplySphere. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
