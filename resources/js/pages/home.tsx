import { useEffect, useMemo, useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import {
    type FeaturedSupplier,
    type MarketplaceCategory,
    type MarketplaceRequest,
    type HeroSlide,
    type MarketplaceStats,
    type SharedData,
} from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Box,
    Building,
    CheckCircle2,
    Clock,
    Cpu,
    Globe2,
    Handshake,
    HeartPulse,
    Leaf,
    Lightbulb,
    Package,
    Search,
    ShieldCheck,
    Shirt,
    Sparkles,
    TrendingUp,
    Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface HomePageProps {
    featuredSuppliers: FeaturedSupplier[];
    latestRequests: MarketplaceRequest[];
    topCategories: MarketplaceCategory[];
    heroSlides: HeroSlide[];
    stats: MarketplaceStats;
}

type PageProps = SharedData & HomePageProps;

const categoryIconMap: Record<string, LucideIcon> = {
    factory: Building,
    'industrial-machinery': Building,
    'consumer-electronics': Cpu,
    'packaging-printing': Package,
    'construction-materials': Building,
    'agriculture-food': Leaf,
    'textiles-apparel': Shirt,
    'health-beauty': HeartPulse,
    'logistics-transportation': Truck,
    box: Box,
};

function HeroSlider({ slides }: { slides: HeroSlide[] }) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (slides.length <= 1) {
            return;
        }

        const interval = window.setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 6000);

        return () => window.clearInterval(interval);
    }, [slides.length]);

    return (
        <div className="relative min-h-[460px] overflow-hidden rounded-3xl border border-orange-100 bg-orange-500/40 shadow-2xl">
            {slides.map((slide, index) => (
                <div
                    key={slide.title}
                    className={cn(
                        'absolute inset-0 grid h-full grid-cols-1 items-center overflow-hidden rounded-3xl transition-all duration-700 md:grid-cols-2',
                        index === activeIndex
                            ? 'opacity-100'
                            : 'pointer-events-none opacity-0',
                    )}
                >
                    <div
                        className="flex h-full flex-col justify-center gap-6 p-10 text-white"
                        style={{
                            backgroundImage: `linear-gradient(140deg, rgba(244, 115, 33, 0.92) 0%, rgba(235, 68, 27, 0.75) 55%, rgba(247, 148, 29, 0.35) 100%)`,
                        }}
                    >
                        <Badge className="w-fit bg-white/20 text-xs uppercase tracking-[0.35em] text-white">
                            Marketplace
                        </Badge>
                        <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                            {slide.title}
                        </h1>
                        <p className="max-w-xl text-base text-white/85 sm:text-lg">
                            {slide.description}
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-white/90" asChild>
                                <Link href={slide.ctaHref}>{slide.cta}</Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white/60 bg-transparent text-white hover:bg-white/10"
                                asChild
                            >
                                <Link href="/login">
                                    Discover marketplace
                                    <ArrowRight className="ml-2 size-4" />
                                </Link>
                            </Button>
                        </div>
                        <div className="flex flex-col gap-3 text-sm text-white/75 sm:flex-row sm:items-center sm:gap-6">
                            <span className="flex items-center gap-2">
                                <ShieldCheck className="size-4" />
                                Verified suppliers only
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock className="size-4" />
                                Response within 24h
                            </span>
                        </div>
                    </div>
                    <div className="relative hidden h-full w-full md:block">
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/70 via-orange-500/30 to-transparent" />
                    </div>
                </div>
            ))}
            <div className="relative z-20 flex items-center justify-center gap-2 pb-6 pt-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        type="button"
                        aria-label={`Show slide ${index + 1}`}
                        onClick={() => setActiveIndex(index)}
                        className={cn(
                            'size-2 rounded-full transition-all',
                            index === activeIndex
                                ? 'w-6 bg-white'
                                : 'bg-white/50 hover:bg-white/80',
                        )}
                    />
                ))}
            </div>
        </div>
    );
}

function StatCard({
    label,
    value,
    description,
}: {
    label: string;
    value: string;
    description: string;
}) {
    return (
        <Card className="border-orange-100/80 bg-white/80 backdrop-blur">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-orange-600">{value}</CardTitle>
                <CardDescription className="text-neutral-600">{label}</CardDescription>
            </CardHeader>
            <CardContent className="text-sm text-neutral-500">{description}</CardContent>
        </Card>
    );
}

function RequestCard({ request }: { request: MarketplaceRequest }) {
    const budgetMin = request.budgetMin ?? undefined;
    const budgetMax = request.budgetMax ?? undefined;
    const quantity = request.quantity ?? undefined;

    return (
        <Card className="group h-full border-neutral-200/70 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
            <CardHeader className="space-y-3">
                <Badge className="w-fit bg-orange-100 text-xs text-orange-600">
                    {request.category ?? 'General sourcing'}
                </Badge>
                <CardTitle className="text-xl font-semibold text-neutral-900">
                    {request.title}
                </CardTitle>
                <CardDescription className="text-neutral-600">
                    {request.summary}
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-neutral-600">
                <div className="grid grid-cols-2 gap-4 text-xs uppercase tracking-wide text-neutral-500">
                    <div>
                        <p className="font-semibold text-neutral-700">Budget</p>
                        <p className="text-neutral-600">
                            {budgetMin && budgetMax
                                ? `${request.currency} ${budgetMin.toLocaleString()} - ${request.currency} ${budgetMax.toLocaleString()}`
                                : 'Negotiable'}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-neutral-700">Quantity</p>
                        <p className="text-neutral-600">
                            {quantity
                                ? `${quantity.toLocaleString()} ${request.unit ?? ''}`
                                : 'Flexible'}
                        </p>
                    </div>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span>Preferred: {request.preferredLocation ?? 'Global'}</span>
                    <span>Open until: {request.leadValidUntil ?? 'Rolling'}</span>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Posted {request.createdAt ?? 'today'}</span>
                <Button variant="ghost" className="text-orange-600 hover:bg-orange-50" asChild>
                    <Link href="/login">
                        View details
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

function SupplierCard({ supplier }: { supplier: FeaturedSupplier }) {
    return (
        <Card className="group h-full overflow-hidden border-neutral-200/70 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
            <div className="relative h-40 w-full overflow-hidden">
                <img
                    src={
                        supplier.coverImageUrl ??
                        'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1400&q=80'
                    }
                    alt={supplier.companyName}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    {supplier.logoUrl ? (
                        <img
                            src={supplier.logoUrl}
                            alt={`${supplier.companyName} logo`}
                            className="size-12 rounded-full border-2 border-white object-cover"
                        />
                    ) : (
                        <div className="flex size-12 items-center justify-center rounded-full bg-white/90 text-lg font-semibold text-orange-600">
                            {supplier.companyName.slice(0, 1)}
                        </div>
                    )}
                    <div className="text-white">
                        <p className="text-lg font-semibold">{supplier.companyName}</p>
                        <p className="text-xs text-white/70">{supplier.location ?? 'Global'}</p>
                    </div>
                </div>
                {supplier.isVerified && (
                    <Badge className="absolute right-4 top-4 bg-emerald-500 text-white">
                        <ShieldCheck className="mr-1 size-3" /> Verified
                    </Badge>
                )}
            </div>
            <CardContent className="space-y-4 p-6">
                <p className="text-sm text-neutral-600">{supplier.headline}</p>
                <div className="flex flex-wrap gap-2">
                    {supplier.categories.slice(0, 3).map((category) => (
                        <Badge key={category.slug} variant="secondary" className="bg-orange-50 text-orange-600">
                            {category.name}
                        </Badge>
                    ))}
                </div>
                <Separator className="bg-orange-100" />
                <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-2">
                        <Globe2 className="size-4 text-orange-500" />
                        {supplier.countriesServed.length} markets
                    </span>
                    <span className="flex items-center gap-2">
                        <Sparkles className="size-4 text-orange-500" />
                        {supplier.rating.toFixed(1)} rating
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-end p-6 pt-0">
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" asChild>
                    <Link href="/login">Contact supplier</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

function CategoryCard({ category }: { category: MarketplaceCategory }) {
    const iconKey = category.icon?.toLowerCase() ?? category.slug;
    const IconComponent = categoryIconMap[iconKey] ?? Box;

    return (
        <Card className="h-full border-transparent bg-white/80 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
            <CardHeader className="space-y-3">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600">
                    <IconComponent className="size-6" />
                </div>
                <CardTitle className="text-lg text-neutral-900">{category.name}</CardTitle>
                <CardDescription className="text-sm text-neutral-600">
                    {category.description}
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex items-center justify-between text-xs text-neutral-500">
                <span>{category.requestsCount} active requests</span>
                <Button variant="ghost" className="text-orange-600 hover:bg-orange-50" asChild>
                    <Link href="/login">Browse</Link>
                </Button>
            </CardFooter>
        </Card>
    );
}

export default function Home() {
    const { props } = usePage<PageProps>();
    const { featuredSuppliers, latestRequests, topCategories, heroSlides, stats } = props;

    const statsDisplay = useMemo(
        () => [
            {
                label: 'Verified suppliers',
                value: stats.verifiedSuppliers.toLocaleString(),
                description: 'Only vetted manufacturers and service providers make it onto our marketplace.',
            },
            {
                label: 'Live buying requests',
                value: stats.activeBuyRequests.toLocaleString(),
                description: 'Fresh demand signals from global buyers updated in real time.',
            },
            {
                label: 'Countries covered',
                value: stats.countriesCovered.toLocaleString(),
                description: 'Our network spans established hubs and emerging manufacturing clusters.',
            },
        ],
        [stats],
    );

    return (
        <LandingLayout>
            <section className="relative mx-auto w-full max-w-6xl space-y-12 px-4 pb-16 pt-20">
                <HeroSlider slides={heroSlides} />
                <div className="grid gap-4 rounded-2xl bg-white/70 p-6 backdrop-blur md:grid-cols-4">
                    {statsDisplay.map((item) => (
                        <StatCard key={item.label} {...item} />
                    ))}
                    <Card className="border-orange-100 bg-orange-50/80">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg text-orange-700">
                                <TrendingUp className="size-5" />
                                Stay ahead
                            </CardTitle>
                            <CardDescription className="text-sm text-orange-700/80">
                                Get tailored matches delivered to your inbox weekly.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-orange-600 hover:bg-orange-600/90" asChild>
                                <Link href="/register">Create free sourcing plan</Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section id="buying-requests" className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <Badge className="bg-orange-100 text-orange-600">Live demand</Badge>
                        <h2 className="mt-4 text-3xl font-semibold text-neutral-900">
                            Latest buying requests
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
                            Capture real opportunities from vetted buyers. Respond and negotiate directly on SupplySphere.
                        </p>
                    </div>
                    <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" asChild>
                        <Link href="/register">Post a buying request</Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {latestRequests.map((request) => (
                        <RequestCard key={request.id} request={request} />
                    ))}
                </div>
            </section>

            <section id="solutions" className="bg-orange-50/70 py-20">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
                    <div className="text-center">
                        <Badge className="bg-orange-500 text-white">Why SupplySphere</Badge>
                        <h2 className="mt-4 text-3xl font-semibold text-neutral-900">
                            Designed to accelerate every sourcing journey
                        </h2>
                        <p className="mx-auto mt-3 max-w-3xl text-sm text-neutral-600">
                            From discovery to delivery, we combine curated supplier data, collaborative workspaces, and transparent insights to keep your supply chain moving.
                        </p>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {[
                            {
                                icon: Search,
                                title: 'Discover aligned partners',
                                description:
                                    'Instantly match with suppliers by capability, certificates, and lead times tailored to your project.',
                            },
                            {
                                icon: ShieldCheck,
                                title: 'Trust every connection',
                                description:
                                    'Know who you are working with. Every profile is screened for compliance, production capacity, and reliability.',
                            },
                            {
                                icon: Handshake,
                                title: 'Collaborate seamlessly',
                                description:
                                    'Secure communication, quote comparison, and contract workflows built into one intuitive dashboard.',
                            },
                            {
                                icon: Lightbulb,
                                title: 'Insights that guide decisions',
                                description:
                                    'Real-time analytics to compare offers, monitor RFQs, and forecast supply risk across your pipeline.',
                            },
                        ].map((item) => (
                            <Card
                                key={item.title}
                                className="h-full border-transparent bg-white shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg"
                            >
                                <CardHeader className="space-y-3">
                                    <div className="flex size-12 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-600">
                                        <item.icon className="size-6" />
                                    </div>
                                    <CardTitle className="text-lg text-neutral-900">
                                        {item.title}
                                    </CardTitle>
                                    <CardDescription className="text-sm text-neutral-600">
                                        {item.description}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <Badge className="bg-orange-100 text-orange-600">Top industries</Badge>
                        <h2 className="mt-4 text-3xl font-semibold text-neutral-900">
                            Explore high-demand categories
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
                            From industrial equipment to lifestyle brands, uncover the segments where buyers and suppliers are closing deals right now.
                        </p>
                    </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {topCategories.map((category) => (
                        <CategoryCard key={category.id} category={category} />
                    ))}
                </div>
            </section>

            <section id="suppliers" className="mx-auto w-full max-w-6xl space-y-8 px-4 py-16">
                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                    <div>
                        <Badge className="bg-orange-100 text-orange-600">Featured suppliers</Badge>
                        <h2 className="mt-4 text-3xl font-semibold text-neutral-900">
                            Meet industry leaders ready to collaborate
                        </h2>
                        <p className="mt-2 max-w-2xl text-sm text-neutral-600">
                            Verified profiles highlight production strengths, certifications, and average response times so you can partner with confidence.
                        </p>
                    </div>
                    <Button className="bg-orange-600 hover:bg-orange-600/90" asChild>
                        <Link href="/register">Join the supplier network</Link>
                    </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                    {featuredSuppliers.map((supplier) => (
                        <SupplierCard key={supplier.id} supplier={supplier} />
                    ))}
                </div>
            </section>

            <section className="bg-neutral-900 py-20">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 text-white">
                    <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                        <div className="max-w-2xl">
                            <Badge className="bg-white/10 text-white">How it works</Badge>
                            <h2 className="mt-4 text-3xl font-semibold">
                                Three steps to unlock a modern sourcing experience
                            </h2>
                        </div>
                        <Button variant="outline" className="border-white/40 text-white hover:bg-white/10" asChild>
                            <Link href="/register">Start sourcing today</Link>
                        </Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-3">
                        {[
                            {
                                icon: Sparkles,
                                title: 'Create your project brief',
                                description:
                                    'Describe your product, specs, and target pricing. Attach drawings or inspiration moodboards if available.',
                            },
                            {
                                icon: Handshake,
                                title: 'Engage curated suppliers',
                                description:
                                    'Our matching engine surfaces compatible suppliers. Compare quotes, samples, and chat in one workspace.',
                            },
                            {
                                icon: CheckCircle2,
                                title: 'Close confidently',
                                description:
                                    'Coordinate agreements, shipping, and quality checks using built-in workflows so nothing slips through.',
                            },
                        ].map((step, index) => (
                            <Card
                                key={step.title}
                                className="relative h-full overflow-hidden border-white/10 bg-white/5 p-6 text-white"
                            >
                                <span className="absolute right-6 top-6 text-5xl font-bold text-white/10">
                                    {index + 1}
                                </span>
                                <div className="flex size-12 items-center justify-center rounded-2xl bg-white/10 text-white">
                                    <step.icon className="size-6" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">{step.title}</h3>
                                <p className="mt-3 text-sm text-white/70">{step.description}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl gap-12 px-4 py-20">
                <div className="grid items-center gap-10 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-500/90 to-orange-600 p-10 text-white md:grid-cols-[1.5fr,1fr]">
                    <div className="space-y-4">
                        <Badge className="bg-white/20 text-xs uppercase tracking-[0.35em] text-white">
                            Stay connected
                        </Badge>
                        <h2 className="text-3xl font-semibold leading-tight">
                            Subscribe for curated opportunities & private events
                        </h2>
                        <p className="text-sm text-white/80">
                            Receive sourcing trends, featured supplier spotlights, and invite-only buyer briefings tailored to your industry.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                placeholder="Work email address"
                                className="h-12 flex-1 rounded-xl border border-white/30 bg-white/10 px-4 text-white placeholder:text-white/60 focus:border-white focus:outline-none"
                            />
                            <Button className="h-12 rounded-xl bg-white text-orange-600 hover:bg-white/90">
                                Join newsletter
                            </Button>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-white/70">
                            <ShieldCheck className="size-4" />
                            We respect your inbox. Unsubscribe anytime.
                        </div>
                    </div>
                    <div className="relative h-64 overflow-hidden rounded-3xl">
                        <img
                            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                            alt="Team collaboration"
                            className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-orange-500/40 to-orange-700/20" />
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}
