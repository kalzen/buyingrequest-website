import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { route } from 'ziggy-js';
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    Compass,
    CircleDollarSign,
    Clock3,
    Cpu,
    Factory,
    FlaskConical,
    Globe2,
    Leaf,
    Layers,
    MapPin,
    Package,
    Plug,
    Search,
    Ship,
    ShieldCheck,
    Star,
    Users,
    Wrench,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type {
    FeaturedSupplier,
    HeroSlide,
    MarketplaceCategory,
    MarketplaceRequest,
    MarketplaceStats,
    SharedData,
} from '@/types';

interface HomePageProps {
    featuredSuppliers: FeaturedSupplier[];
    latestRequests: MarketplaceRequest[];
    topCategories: MarketplaceCategory[];
    heroSlides: HeroSlide[];
    stats: MarketplaceStats;
}

type PageProps = SharedData & HomePageProps;

export default function Home({
    featuredSuppliers,
    latestRequests,
    topCategories,
    heroSlides,
    stats,
}: PageProps) {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const timer = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => window.clearInterval(timer);
    }, [heroSlides.length]);

    const activeHero = heroSlides[activeSlide] ?? heroSlides[0];
    const supplierLogos = featuredSuppliers.slice(0, 6);

    const formatBudgetRange = (request: MarketplaceRequest) => {
        const currency = request.currency ?? 'USD';
        if (request.budgetMin && request.budgetMax) {
            return `${request.budgetMin.toLocaleString('en-US', { style: 'currency', currency })} - ${request.budgetMax.toLocaleString('en-US', { style: 'currency', currency })}`;
        }
        if (request.budgetMin) {
            return `From ${request.budgetMin.toLocaleString('en-US', { style: 'currency', currency })}`;
        }
        if (request.budgetMax) {
            return `Up to ${request.budgetMax.toLocaleString('en-US', { style: 'currency', currency })}`;
        }
        return 'Budget on negotiation';
    };

    const formatDate = (dateString?: string | null) => {
        if (!dateString) return 'Date not specified';
        return new Date(dateString).toLocaleDateString('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const statsCards = useMemo(
        () => [
            {
                label: 'Verified suppliers',
                value: stats.verifiedSuppliers?.toLocaleString('en-US') ?? '5,200+',
                description: 'Audited profiles across 40+ industries',
            },
            {
                label: 'Active buyer projects',
                value: stats.activeBuyRequests?.toLocaleString('en-US') ?? '18,000+',
                description: 'Opportunities posted in the last 12 months',
            },
            {
                label: 'Average match time',
                value: '48h',
                description: 'From project brief to supplier shortlist',
            },
            {
                label: 'Global markets',
                value: stats.countriesCovered ? `${stats.countriesCovered}+` : '65+',
                description: 'Countries buyers source from on the platform',
            },
        ],
        [stats],
    );

    return (
        <LandingLayout>
            <HeroSection
                slide={activeHero}
                allSlides={heroSlides}
                activeIndex={activeSlide}
                onSelect={setActiveSlide}
                categories={topCategories}
            />
            <section id="buying-requests" className="bg-white py-20">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <Badge className="bg-[#e0ecff] text-primary">Latest buyer requests</Badge>
                            <h2 className="mt-4 text-3xl font-semibold text-foreground">Stay ahead of global sourcing demand</h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Real-time briefs from verified procurement teams looking for qualified suppliers across multiple industries.
                                Connect quickly with opportunities that match your capabilities.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10" asChild>
                                <Link
                                    href={
                                        topCategories.length > 0
                                            ? route('categories.show', { category: topCategories[0].slug })
                                            : route('home')
                                    }
                                >
                                    Browse categories
                                </Link>
                            </Button>
                            <Button className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90" asChild>
                                <Link href={route('buyer.requests.create')}>Post a buying request</Link>
                            </Button>
                        </div>
                    </div>

                    <Card className="mt-10 border border-[#d6e0f5] bg-[#f8faff]">
                        <CardContent className="p-0">
                            <div className="divide-y divide-[#d6e0f5]/60">
                                {latestRequests.slice(0, 6).map((request) => {
                                    const quantityLabel = request.quantity
                                        ? `${request.quantity.toLocaleString('en-US')} ${request.unit ?? ''}`
                                        : 'Flexible MOQ';
                                    const statusLabel = (request.status ?? 'open').replace(/[_-]/g, ' ');

                                    return (
                                        <div
                                            key={request.id}
                                            className="flex flex-col gap-4 p-5 transition duration-200 hover:bg-white md:flex-row md:items-center md:justify-between"
                                        >
                                            <div className="space-y-3 md:max-w-2xl">
                                                <div className="flex flex-wrap items-center gap-2 text-xs text-primary/80">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
                                                        <Compass className="size-4" />
                                                        {request.preferredLocation ?? 'Worldwide'}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-slate-600 shadow-sm">
                                                        {formatDate(request.createdAt)}
                                                    </span>
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="text-base font-semibold text-foreground md:text-lg">
                                                        {request.title ?? 'Custom manufacturing program'}
                                                    </h3>
                                                    <p className="text-sm text-slate-600 line-clamp-2">
                                                        {request.summary ??
                                                            'The buyer is sourcing export-ready partners capable of premium quality control and flexible production timelines.'}
                                                    </p>
                                                </div>
                                                <div className="flex flex-wrap items-center gap-2 text-xs">
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
                                                        <Layers className="size-4" />
                                                        {request.category ?? 'Multi-industry'}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-slate-600 shadow-sm">
                                                        <Package className="size-4 text-primary/70" />
                                                        {quantityLabel}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-slate-600 shadow-sm">
                                                        <CircleDollarSign className="size-4 text-primary/70" />
                                                        {formatBudgetRange(request)}
                                                    </span>
                                                    <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-slate-600 shadow-sm">
                                                        <Clock3 className="size-4 text-primary/70" />
                                                        {statusLabel}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-start gap-2 text-sm text-slate-600 md:items-end">
                                                <Button asChild variant="link" className="h-auto p-0 text-primary">
                                                    <Link href={route('requests.show', request.slug ?? request.id)}>View details</Link>
                                                </Button>
                                                <Button
                                                    asChild
                                                    size="sm"
                                                    className="rounded-full bg-primary px-4 text-primary-foreground hover:bg-primary/90"
                                                >
                                                    <Link href={route('login')}>Respond now</Link>
                                                </Button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="bg-gradient-to-br from-[#0b3d91] to-[#1f6feb] py-20" id="featured-suppliers">
                <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 text-white">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <Badge className="bg-white/20 text-white">Featured suppliers</Badge>
                            <h2 className="mt-4 text-3xl font-semibold">Verified partners delivering export-ready quality</h2>
                            <p className="mt-2 max-w-2xl text-sm text-white/80">
                                Curated manufacturers audited by the Export Go team for production capacity, certifications, and proven project delivery.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90" asChild>
                                <Link href={route('suppliers.index')}>Explore the supplier directory</Link>
                            </Button>
                            <Button variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10" asChild>
                                <Link href="#buyers">See buyer benefits</Link>
                            </Button>
                        </div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {supplierLogos.map((supplier) => {
                            const servedCountries = (supplier.countriesServed ?? []).slice(0, 2);
                            const totalCountries = supplier.countriesServed?.length ?? 0;

                            return (
                                <Card key={supplier.id} className="border border-white/20 bg-white/10 text-white backdrop-blur-sm">
                                    <CardContent className="space-y-5 p-6">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-lg font-semibold">{supplier.companyName}</p>
                                                <p className="text-xs uppercase tracking-wide text-white/60">
                                                    {supplier.categories.map((item) => item.name).join(', ') || 'Industrial solutions'}
                                                </p>
                                            </div>
                                            {supplier.isVerified && (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-1 text-xs text-white">
                                                    <ShieldCheck className="size-4" />
                                                    Verified
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-white/80 line-clamp-3">
                                            {supplier.headline ??
                                                'A trusted production partner meeting export compliance standards with reliable timelines.'}
                                        </p>
                                        <Separator className="border-white/20" />
                                        <div className="grid gap-3 text-xs text-white/70 sm:grid-cols-2">
                                            <div className="flex items-center gap-2">
                                                <Star className="size-4 text-yellow-300" />
                                                <span>{supplier.rating?.toFixed(1) ?? '4.8'} / 5.0</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe2 className="size-4" />
                                                <span>{servedCountries.length > 0 ? servedCountries.join(', ') : 'Serving global markets'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <MapPin className="size-4" />
                                                <span>{supplier.location ?? 'Multiple facilities'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="size-4" />
                                                <span>{supplier.categories.length} core capabilities</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                                            <span className="text-xs text-white/70">Serving {totalCountries} markets</span>
                                            <Button
                                                asChild
                                                size="sm"
                                                variant="outline"
                                                className="rounded-full border-white/50 bg-white/10 text-white hover:bg-white/20"
                                            >
                                                <Link href={supplier.url}>
                                                    View profile
                                                    <ArrowRight className="ml-1 size-4" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section id="buyers" className="mx-auto w-full max-w-7xl px-4 py-20">
                <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
                    <Card className="border border-[#d6e0f5] bg-white shadow-sm">
                        <CardHeader>
                            <Badge className="w-fit bg-[#e7eefc] text-primary">For buyers</Badge>
                            <CardTitle className="mt-4 text-3xl font-semibold">Build resilient supply chains faster</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-slate-600">
                            <FeatureItem
                                title="Audited supplier intelligence"
                                description="Filter by certifications, capacity, compliance, and lead time with data validated by our sourcing analysts."
                            />
                            <FeatureItem
                                title="Collaborative RFQ workspace"
                                description="Post briefs, compare proposals, and track milestones with your team inside a single dashboard."
                            />
                            <FeatureItem
                                title="Regional sourcing experts"
                                description="Partner with category specialists who refine specs, shortlist partners, and negotiate commercial terms."
                            />
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                                    <Link href={route('register', { mergeQuery: { type: 'buyer' } })}>Create buyer account</Link>
                                </Button>
                                <Button asChild variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10">
                                    <Link href="#rfq">Submit a new RFQ</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card id="suppliers" className="border border-[#d6e0f5] bg-white shadow-sm">
                        <CardHeader>
                            <Badge className="w-fit bg-[#e0ecff] text-primary">For suppliers</Badge>
                            <CardTitle className="mt-4 text-3xl font-semibold">Stand out to qualified buyers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-slate-600">
                            <FeatureItem
                                title="Matched opportunities"
                                description="Receive RFQs aligned with your capabilities, regions, and minimum order quantities without manual filtering."
                            />
                            <FeatureItem
                                title="Premium company profile"
                                description="Showcase certifications, production lines, and flagship projects to build trust with procurement teams."
                            />
                            <FeatureItem
                                title="Pipeline analytics"
                                description="Monitor engagement, conversion metrics, and nurture leads with built-in marketing tools."
                            />
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                                    <Link href={route('register', { mergeQuery: { type: 'supplier' } })}>Join the network</Link>
                                </Button>
                                <Button asChild variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10">
                                    <Link href="#featured-suppliers">Read success stories</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="bg-white py-20" id="insights">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <Badge className="bg-[#e7eefc] text-primary">Marketplace insights</Badge>
                            <h2 className="mt-4 text-3xl font-semibold text-foreground">Make sourcing decisions with data</h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Track supplier responsiveness, active buyer demand, and top-performing regions to plan your next sourcing move with confidence.
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10" asChild>
                            <Link href={route('dashboard')}>Open analytics dashboard</Link>
                        </Button>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {statsCards.map((item) => (
                            <Card key={item.label} className="border border-[#d6e0f5] bg-gradient-to-br from-white to-[#f3f6ff]">
                                <CardContent className="space-y-2 p-6">
                                    <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">{item.label}</p>
                                    <p className="text-3xl font-bold text-foreground">{item.value}</p>
                                    <p className="text-xs text-slate-600">{item.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section id="rfq" className="bg-[#f0f4ff] py-20">
                <div className="mx-auto w-full max-w-5xl rounded-3xl border border-[#d6e0f5] bg-white px-6 py-12 shadow-sm">
                    <div className="mx-auto max-w-3xl text-center">
                        <Badge className="bg-[#e0ecff] text-primary">Post a request</Badge>
                        <h2 className="mt-4 text-3xl font-semibold text-foreground">Share your purchase requirements</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            Complete this guided brief and we will surface the right suppliers. Detailed specifications help reduce turnaround time.
                        </p>
                    </div>
                    <div className="mt-10 grid gap-8 lg:grid-cols-2">
                        <ChecklistCard
                            title="Buyer information"
                            items={['Representative name', 'Phone number', 'Company email']}
                        />
                        <ChecklistCard
                            title="Goods details"
                            items={['Product name', 'HS code & quantity', 'Unit of measure', 'Quality requirements', 'Packaging specification']}
                        />
                        <ChecklistCard
                            title="Terms of trade"
                            items={['Delivery terms (FOB, CIF, etc.)', 'Port of discharge', 'Desired delivery time', 'Transport method', 'Payment terms']}
                        />
                        <Card className="border border-dashed border-primary/40 bg-primary/5 p-6 text-sm text-slate-600">
                            <p className="font-semibold text-primary">Notes</p>
                            <p className="mt-2 text-sm">
                                Provide any additional context, drawings, or compliance requirements. Buyers receive direct follow-up within 24 hours.
                            </p>
                            <Button asChild className="mt-6 rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                                <Link href={route('buyer.requests.create')}>Open full RFQ form</Link>
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>

        </LandingLayout>
    );
}

function FeatureItem({ title, description }: { title: string; description: string }) {
    return (
        <div className="flex items-start gap-3">
            <CheckCircle2 className="mt-1 size-5 text-primary" />
            <div>
                <h3 className="font-semibold text-foreground">{title}</h3>
                <p className="text-sm text-slate-600">{description}</p>
            </div>
        </div>
    );
}

const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
    machinery: Factory,
    equipment: Factory,
    electronics: Cpu,
    chemical: FlaskConical,
    chemicals: FlaskConical,
    logistics: Ship,
    packaging: Package,
    energy: Plug,
    agriculture: Leaf,
    construction: Wrench,
};

function resolveCategoryIcon(slug?: string | null): LucideIcon {
    if (!slug) return Layers;
    const normalized = slug.toLowerCase();
    if (CATEGORY_ICON_MAP[normalized]) {
        return CATEGORY_ICON_MAP[normalized];
    }
    const matchedEntry = Object.entries(CATEGORY_ICON_MAP).find(([key]) => normalized.includes(key));
    if (matchedEntry) {
        return matchedEntry[1];
    }
    return Layers;
}

const HERO_FALLBACK_IMAGES = [
    'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80',
];

function HeroSection({
    slide,
    allSlides,
    activeIndex,
    onSelect,
    categories,
}: {
    slide?: HeroSlide;
    allSlides: HeroSlide[];
    activeIndex: number;
    onSelect: (index: number) => void;
    categories: MarketplaceCategory[];
}) {
    const totalSlides = allSlides.length;
    const displayedCategories = categories.slice(0, 8);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [imageKey, setImageKey] = useState(0);
    let ctaHref = route('buyer.requests.create');
    if (slide?.ctaUrl) {
        ctaHref = slide.ctaUrl;
    } else if (slide?.ctaRoute) {
        try {
            ctaHref = route(slide.ctaRoute);
        } catch {
            // Ignore route resolution errors and fall back to default link
        }
    }

    const slideImage = slide?.image ?? HERO_FALLBACK_IMAGES[activeIndex % HERO_FALLBACK_IMAGES.length] ?? HERO_FALLBACK_IMAGES[0];

    useEffect(() => {
        setIsTransitioning(true);
        setImageKey((prev) => prev + 1);
        const timeout = window.setTimeout(() => setIsTransitioning(false), 500);
        return () => window.clearTimeout(timeout);
    }, [activeIndex]);

    const handlePrev = () => {
        if (!totalSlides) return;
        const prevIndex = activeIndex === 0 ? totalSlides - 1 : activeIndex - 1;
        onSelect(prevIndex);
    };

    const handleNext = () => {
        if (!totalSlides) return;
        const nextIndex = activeIndex === totalSlides - 1 ? 0 : activeIndex + 1;
        onSelect(nextIndex);
    };

    const buildCategoryHref = (slug: string) => `${route('home')}?category=${slug}#buying-requests`;

    return (
        <section className="bg-[#0b3d91]">
            <div className="relative mx-auto w-full max-w-7xl px-4 pb-20 pt-20 text-white">
                <div className="flex flex-col gap-6 md:flex-row md:items-stretch md:gap-8">
                    <aside className="w-full shrink-0 rounded-3xl border border-white/20 bg-white/10 p-6 shadow-xl backdrop-blur md:w-72 md:max-w-sm lg:w-80">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Top categories</p>
                        <ul className="mt-6 space-y-3">
                            {displayedCategories.map((category) => {
                                const Icon = resolveCategoryIcon(category.slug);
                                return (
                                    <li key={category.id}>
                                        <Link
                                            href={buildCategoryHref(category.slug)}
                                            className="flex items-center justify-between gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm transition hover:border-white/40 hover:bg-white/15"
                                        >
                                            <span className="flex items-center gap-3 text-left">
                                                <span className="flex size-9 items-center justify-center rounded-2xl bg-white/10">
                                                    <Icon className="size-5" />
                                                </span>
                                                <span>
                                                    <span className="block font-semibold text-white">{category.name}</span>
                                                    <span className="text-xs text-white/60">
                                                        {category.requestsCount?.toLocaleString('en-US') ?? 0} live briefs
                                                    </span>
                                                </span>
                                            </span>
                                            <ArrowRight className="size-4 text-white/60" />
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                        <Button asChild variant="outline" className="mt-6 w-full rounded-2xl border-white/40 text-white hover:bg-white/10">
                            <Link
                                href={
                                    displayedCategories.length > 0
                                        ? route('categories.show', { category: displayedCategories[0].slug })
                                        : route('home')
                                }
                            >
                                View all categories
                            </Link>
                        </Button>
                    </aside>

                    <div className="min-w-0 flex-1 space-y-6">
                        <div className="relative h-[520px] overflow-hidden rounded-3xl border border-white/20 bg-white/5 shadow-2xl sm:h-[540px] lg:h-[560px]">
                            <img
                                key={imageKey}
                                src={slideImage}
                                alt={slide?.title ?? 'Buyer request highlight'}
                                className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-70' : 'opacity-100'}`}
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#0b3d91]/90 via-[#0b3d91]/70 to-transparent" />
                            <div
                                className={`absolute inset-0 flex flex-col justify-between p-8 transition-opacity duration-500 ease-in-out ${
                                    isTransitioning ? 'opacity-0' : 'opacity-100'
                                }`}
                            >
                                <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-white/60">
                                    <span>Featured request</span>
                                    {totalSlides > 0 && (
                                        <span>
                                            {String(activeIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
                                        </span>
                                    )}
                                </div>
                                <div className="mt-auto max-w-xl space-y-6 pb-8">
                                    <div className="space-y-4">
                                        <h1 className="text-3xl font-semibold leading-tight sm:text-4xl md:text-5xl">
                                            {slide?.title ?? 'New sourcing opportunities updated daily'}
                                        </h1>
                                        <p className="text-sm text-white/85">
                                            {slide?.description ??
                                                'Browse RFQs verified by our sourcing team and respond faster with complete buyer requirements.'}
                                        </p>
                                    </div>
                                    <div className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur">
                                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Quick search</p>
                                        <div className="mt-4 grid gap-3 md:grid-cols-[1.1fr,2fr,auto]">
                                            <Select defaultValue="suppliers">
                                                <SelectTrigger className="h-12 rounded-xl border-white/30 bg-white/10 text-white">
                                                    <SelectValue placeholder="Suppliers" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="suppliers">Suppliers</SelectItem>
                                                    <SelectItem value="products">Products</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Input
                                                className="h-12 rounded-xl border-white/30 bg-white/10 text-white placeholder:text-white/60"
                                                placeholder="Search by category, company, or keyword"
                                            />
                                            <Button className="h-12 rounded-xl bg-white px-6 text-sm font-semibold text-primary hover:bg-white/90 hover:text-primary">
                                                <Search className="mr-2 size-4" />
                                                Search
                                            </Button>
                                        </div>
                                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
                                            <span className="inline-flex items-center gap-2">
                                                <Users className="size-4" />
                                                6,000+ active buyers
                                            </span>
                                            <Separator orientation="vertical" className="hidden h-4 border-white/30 md:block" />
                                            <span className="inline-flex items-center gap-2">
                                                <Layers className="size-4" />
                                                RFQs matched in under 48 hours
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`flex flex-wrap gap-3 transition-opacity duration-500 ease-in-out ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                                        <Button asChild className="rounded-full bg-white px-6 text-sm font-semibold text-primary hover:bg-white/90 hover:text-primary">
                                            <Link href={ctaHref}>{slide?.cta ?? 'Receive RFQ alerts'}</Link>
                                        </Button>
                                        <Button
                                            asChild
                                            variant="outline"
                                            className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white"
                                        >
                                            <Link href="#buying-requests">View all buyer requests</Link>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            {totalSlides > 1 && (
                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-8 pb-5">
                                    <div className="flex items-center gap-2">
                                        {allSlides.map((_, index) => (
                                            <button
                                                key={`slide-indicator-${index}`}
                                                onClick={() => onSelect(index)}
                                                className={`h-2.5 rounded-full transition ${
                                                    index === activeIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/30'
                                                }`}
                                                aria-label={`Show slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                                            onClick={handlePrev}
                                        >
                                            <ArrowLeft className="size-4" />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                                            onClick={handleNext}
                                        >
                                            <ArrowRight className="size-4" />
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white">
                            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Trusted by teams at</p>
                            <div className="mt-4 grid grid-cols-3 gap-4 text-sm font-semibold text-white/70 md:grid-cols-4">
                                {['Siemens', 'GE', 'Panasonic', 'Toyota', 'ABB', '3M', 'Bosch', 'Samsung'].map((brand) => (
                                    <span key={brand} className="rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-center">
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function ChecklistCard({ title, items }: { title: string; items: string[] }) {
    return (
        <Card className="border border-[#d6e0f5] bg-white">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-primary">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
                {items.map((item) => (
                    <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-1 size-4 text-primary" />
                        <span>{item}</span>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
