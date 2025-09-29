import { useEffect, useMemo, useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Link } from '@inertiajs/react';
import LandingLayout from '@/layouts/landing-layout';
import { route } from '@/lib/route';
import {
    ArrowRight,
    Building,
    CheckCircle2,
    Compass,
    Globe2,
    Handshake,
    Layers,
    MapPin,
    Search,
    Sparkles,
    Users,
} from 'lucide-react';
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

const AUDIENCE_KEY = 'industrial-hub-audience';

export default function Home({
    featuredSuppliers,
    latestRequests,
    topCategories,
    heroSlides,
    stats,
}: PageProps) {
    const [activeSlide, setActiveSlide] = useState(0);
    const [audienceModalOpen, setAudienceModalOpen] = useState(true);

    useEffect(() => {
        if (heroSlides.length <= 1) return;
        const timer = window.setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % heroSlides.length);
        }, 6000);
        return () => window.clearInterval(timer);
    }, [heroSlides.length]);

    const activeHero = heroSlides[activeSlide] ?? heroSlides[0];
    const supplierLogos = featuredSuppliers.slice(0, 6);

    const handleAudienceSelect = (audience: 'buyer' | 'supplier') => {
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem(AUDIENCE_KEY, audience);
            setAudienceModalOpen(false);
            
            if (audience === 'buyer') {
                // Chuyển đến trang đăng ký với type=buyer
                window.location.href = route('register', { mergeQuery: { type: 'buyer' } });
            } else {
                // Chuyển đến trang đăng ký với type=supplier
                window.location.href = route('register', { mergeQuery: { type: 'supplier' } });
            }
        }
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
            />

            <section id="buyers" className="mx-auto w-full max-w-6xl px-4 py-20">
                <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
                    <Card className="border border-[#d6e0f5] bg-white shadow-sm">
                        <CardHeader>
                            <Badge className="w-fit bg-[#e7eefc] text-primary">Why buyers choose us</Badge>
                            <CardTitle className="mt-4 text-3xl font-semibold">Build resilient supply chains faster</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-slate-600">
                            <FeatureItem
                                title="Verified supplier intelligence"
                                description="Filter by certification, capacity, compliance, and response time-all validated by our audit team."
                            />
                            <FeatureItem
                                title="Strategic sourcing workspace"
                                description="Collaborate with your team, compare quotes, and monitor milestones within a single dashboard."
                            />
                            <FeatureItem
                                title="Dedicated buyer success"
                                description="Partner with regional sourcing experts who help define specs, shortlist partners, and negotiate terms."
                            />
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                                    <Link href={route('register', { mergeQuery: { type: 'buyer' } })}>Create buyer account</Link>
                                </Button>
                                <Button asChild variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10">
                                    <Link href="#rfq">Post a request</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card id="suppliers" className="border border-[#d6e0f5] bg-white shadow-sm">
                        <CardHeader>
                            <Badge className="w-fit bg-[#e0ecff] text-primary">Why suppliers love us</Badge>
                            <CardTitle className="mt-4 text-3xl font-semibold">Be discovered by qualified buyers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-slate-600">
                            <FeatureItem
                                title="Targeted lead delivery"
                                description="Receive RFQs aligned with your capabilities, regions, and minimum order requirements."
                            />
                            <FeatureItem
                                title="Premium profile builder"
                                description="Showcase certifications, manufacturing cells, and success stories to stand out during vendor selection."
                            />
                            <FeatureItem
                                title="Marketing & analytics"
                                description="Track engagement, lead quality, and convert prospects with integrated nurturing tools."
                            />
                            <div className="flex flex-wrap gap-3 pt-4">
                                <Button asChild className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90">
                                    <Link href={route('register', { mergeQuery: { type: 'supplier' } })}>Join as supplier</Link>
                                </Button>
                                <Button asChild variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10">
                                    <Link href="#featured-suppliers">Explore supplier success</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="bg-white py-20" id="insights">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <Badge className="bg-[#e7eefc] text-primary">Marketplace metrics</Badge>
                            <h2 className="mt-4 text-3xl font-semibold text-foreground">Data-driven sourcing decisions</h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Understand how Industrial Hub keeps buyers and suppliers aligned across industries and regions.
                            </p>
                        </div>
                        <Button variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/10" asChild>
                            <Link href={route('dashboard')}>View analytics</Link>
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

            <section className="bg-gradient-to-br from-[#0b3d91] to-[#1f6feb] py-20" id="featured-suppliers">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 text-white">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div>
                            <Badge className="bg-white/20 text-white">Trusted by industry leaders</Badge>
                            <h2 className="mt-4 text-3xl font-semibold">Featured suppliers</h2>
                            <p className="mt-2 max-w-2xl text-sm text-white/80">
                                Discover vetted manufacturers delivering precision components, complex assemblies, and specialized services for global brands.
                            </p>
                        </div>
                        <Button variant="secondary" className="rounded-full bg-white text-primary hover:bg-white/90" asChild>
                            <Link href={route('suppliers.index')}>Browse supplier directory</Link>
                        </Button>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {supplierLogos.map((supplier) => (
                            <Card key={supplier.id} className="border border-white/20 bg-white/10 text-white">
                                <CardContent className="space-y-4 p-6">
                                    <div className="text-lg font-semibold">{supplier.companyName}</div>
                                    <p className="text-xs text-white/80">{supplier.categories[0]?.name ?? 'Industrial solutions'}</p>
                                    <p className="text-sm text-white/80 line-clamp-3">{supplier.headline ?? 'Trusted manufacturing partner powering complex supply chains.'}</p>
                                    <Separator className="border-white/20" />
                                    <div className="flex items-center justify-between text-xs text-white/70">
                                        <span className="flex items-center gap-2">
                                            <MapPin className="size-4" />
                                            {supplier.location ?? 'Global'}
                                        </span>
                                        <Button asChild size="sm" variant="outline" className="h-8 rounded-full border-white/40 text-white hover:bg-white/15">
                                            <Link href={supplier.url}>
                                                View profile
                                                <ArrowRight className="ml-1 size-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white py-20" id="buying-requests">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <Badge className="bg-[#e0ecff] text-primary">Live buyer requests</Badge>
                            <h2 className="mt-4 text-3xl font-semibold text-foreground">Latest sourcing opportunities</h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Verified procurement teams are actively searching for suppliers. Showcase your capabilities and respond to RFQs in minutes.
                            </p>
                        </div>
                        <Button className="rounded-full bg-primary px-6 text-primary-foreground hover:bg-primary/90" asChild>
                            <Link href="#rfq">Post a request</Link>
                        </Button>
                    </div>

                    <div className="mt-10 grid gap-6 md:grid-cols-2">
                        {latestRequests.slice(0, 4).map((request) => (
                            <Card key={request.id} className="border border-[#d6e0f5] bg-[#f7f9ff]">
                                <CardContent className="space-y-4 p-6">
                                    <div className="flex items-center justify-between text-xs text-primary/70">
                                        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
                                            <Compass className="size-4" />
                                            {request.preferredLocation ?? 'Global'}
                                        </span>
                                        <span>{new Date(request.createdAt ?? Date.now()).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground">{request.title ?? 'Custom manufacturing request'}</h3>
                                    <p className="text-sm text-slate-600 line-clamp-3">{request.summary ?? 'A buyer is sourcing precision components and is seeking ISO-certified partners able to support mid-volume production runs.'}</p>
                                    <div className="flex items-center justify-between text-xs text-slate-500">
                                        <span>{request.budgetMin ? `$${request.budgetMin}` : 'Budget confidential'}</span>
                                        <Button variant="link" className="h-auto p-0 text-primary" asChild>
                                            <Link href={route('requests.show', request.slug ?? request.id)}>View details</Link>
                                        </Button>
                                    </div>
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
                                <Link href={route('requests.create')}>Open full RFQ form</Link>
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>

            <AudienceChooser open={audienceModalOpen} onSelect={handleAudienceSelect} />
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

function HeroSection({
    slide,
    allSlides,
    activeIndex,
    onSelect,
}: {
    slide?: HeroSlide;
    allSlides: HeroSlide[];
    activeIndex: number;
    onSelect: (index: number) => void;
}) {
    return (
        <section className="bg-[#0b3d91]">
            <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pb-24 pt-20 text-white lg:flex-row">
                <div className="flex-1 space-y-8">
                    <Badge className="bg-white/20 text-white">Search the trusted supplier network</Badge>
                    <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                        {slide?.title ?? 'Source with confidence in minutes'}
                    </h1>
                    <p className="max-w-xl text-base text-white/85">
                        {slide?.description ?? 'Industrial Hub connects buyers with audited suppliers across manufacturing, logistics, and advanced technology sectors.'}
                    </p>

                    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur">
                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">Start a search</p>
                        <div className="mt-4 grid gap-3 md:grid-cols-[1.2fr,2fr,auto]">
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
                                placeholder="By category, company or brand"
                            />
                            <Button className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                                <Search className="mr-2 size-4" />
                                Search
                            </Button>
                        </div>
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-white/70">
                            <span className="inline-flex items-center gap-1">
                                <Users className="size-4" />
                                {slide?.cta ?? 'Join 6M+ verified buyers'}
                            </span>
                            <Separator orientation="vertical" className="h-4 border-white/30" />
                            <span className="inline-flex items-center gap-1">
                                <Layers className="size-4" />
                                Request quotes in under 48 hours
                            </span>
                        </div>
                    </div>

                    {allSlides.length > 1 && (
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
                    )}
                </div>

                <div className="flex-1 space-y-6">
                    <Card className="border border-white/20 bg-white/10 text-white">
                        <CardContent className="space-y-4 p-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm uppercase tracking-wide text-white/60">Featured RFQ</p>
                                <Badge className="bg-white/20 text-white">High priority</Badge>
                            </div>
                            <h3 className="text-xl font-semibold">{slide?.cta ?? 'Electronics assembly partner needed'}</h3>
                            <p className="text-sm text-white/80">
                                Work with ISO 13485 certified partners to deliver high-reliability PCB assemblies for medical devices.
                            </p>
                            <div className="space-y-2 text-xs text-white/70">
                                <p className="flex items-center gap-2">
                                    <Globe2 className="size-4" />
                                    North America - Europe
                                </p>
                                <p className="flex items-center gap-2">
                                    <Handshake className="size-4" />
                                    12 shortlisted suppliers reviewing specs now
                                </p>
                            </div>
                            <Button asChild variant="outline" className="rounded-full border-white/40 text-white hover:bg-white/10">
                                <Link href="#buying-requests">See all open projects</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-white">
                        <p className="text-xs uppercase tracking-[0.35em] text-white/60">Trusted by buyers at</p>
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

function AudienceChooser({
    open,
    onSelect,
}: {
    open: boolean;
    onSelect: (audience: 'buyer' | 'supplier') => void;
}) {
    return (
        <Dialog open={open}>
            <DialogContent className="max-w-md border border-[#d6e0f5] bg-white/95 p-8 text-center shadow-2xl">
                <h2 className="text-2xl font-semibold text-foreground">Who are you sourcing for?</h2>
                <p className="mt-2 text-sm text-slate-600">
                    Choose the experience tailored to your goals. You can switch anytime from the navigation.
                </p>
                <div className="mt-8 flex flex-col gap-4">
                    <Button
                        variant="outline"
                        className="h-14 rounded-xl border-primary/40 text-foreground shadow-sm transition hover:bg-primary/10"
                        onClick={() => onSelect('buyer')}
                    >
                        <span className="text-lg font-semibold">For Buyer</span>
                    </Button>
                    <Button
                        className="h-14 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition hover:bg-primary/90"
                        onClick={() => onSelect('supplier')}
                    >
                        <span className="text-lg font-semibold">For Supplier</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
