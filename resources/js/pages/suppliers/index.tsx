import LandingLayout from '@/layouts/landing-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import suppliers from '@/routes/suppliers';
import { register } from '@/routes';
import { Building2, Globe2, Mail, ShieldCheck, ArrowRight } from 'lucide-react';

interface SupplierListItem {
    id: number;
    slug: string;
    companyName: string;
    headline?: string | null;
    location?: string | null;
    rating: number;
    isVerified: boolean;
    logoUrl?: string | null;
    coverImageUrl?: string | null;
    categories: string[];
    contactEmail: string;
    websiteUrl?: string | null;
    url: string;
}

interface SupplierMetrics {
    totalSuppliers: number;
    verifiedSuppliers: number;
    featuredSuppliers: number;
}

type PageProps = {
    suppliers: SupplierListItem[];
    metrics: SupplierMetrics;
};

export default function SuppliersIndex() {
    const { props } = usePage<PageProps>();
    const { suppliers: supplierList, metrics } = props;

    const stats = [
        {
            label: 'Active suppliers',
            value: metrics.totalSuppliers.toLocaleString(),
            description: 'Profiles currently publishing capabilities in SupplySphere.',
        },
        {
            label: 'Verified partners',
            value: metrics.verifiedSuppliers.toLocaleString(),
            description: 'Manufacturers that have completed our vetting process.',
        },
        {
            label: 'Featured this month',
            value: metrics.featuredSuppliers.toLocaleString(),
            description: 'High-performing suppliers highlighted to buyers.',
        },
    ];

    return (
        <LandingLayout>
            <Head title="Suppliers directory" />

            <section className="relative w-full border-b border-orange-100 bg-orange-50/70 py-16">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 lg:flex-row lg:items-center">
                    <div className="flex-1 space-y-4">
                        <Badge className="bg-orange-500/10 text-orange-600" variant="secondary">
                            Connect with trusted partners
                        </Badge>
                        <h1 className="text-4xl font-semibold text-neutral-900">
                            Discover verified suppliers for your next production run
                        </h1>
                        <p className="max-w-2xl text-lg text-neutral-600">
                            Browse vetted manufacturers, component makers, and logistics partners ready to respond to
                            qualified buyer requests. Filter by capability, review credentials, and start a conversation
                            in minutes.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Button className="bg-orange-600 hover:bg-orange-600/90" size="lg" asChild>
                                <Link href={register().url}>Join as supplier</Link>
                            </Button>
                            <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" size="lg" asChild>
                                <Link href="#directory">Browse directory</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-orange-200 bg-white/80 p-6 shadow-sm">
                        <div className="flex items-center gap-3 text-orange-600">
                            <Building2 className="size-6" />
                            <span className="text-sm font-medium uppercase tracking-wide">Marketplace snapshot</span>
                        </div>
                        <Separator className="bg-orange-100" />
                        <ul className="space-y-4">
                            {stats.map((stat) => (
                                <li key={stat.label} className="space-y-1">
                                    <p className="text-sm font-semibold text-neutral-900">{stat.label}</p>
                                    <p className="text-2xl font-semibold text-orange-600">{stat.value}</p>
                                    <p className="text-sm text-neutral-500">{stat.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section id="directory" className="mx-auto w-full max-w-6xl px-4 py-16">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div className="space-y-2">
                        <h2 className="text-2xl font-semibold text-neutral-900">Featured suppliers</h2>
                        <p className="max-w-2xl text-neutral-600">
                            Every profile below has been vetted for quality, production capacity, and responsiveness.
                            Reach out with confidence knowing our team monitors performance across the network.
                        </p>
                    </div>
                    <Button variant="ghost" className="text-orange-600 hover:bg-orange-50" asChild>
                        <Link href={register().url} className="inline-flex items-center gap-2">
                            Become a supplier
                            <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>

                {supplierList.length ? (
                    <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {supplierList.map((supplier) => (
                            <SupplierCard key={supplier.id} supplier={supplier} />
                        ))}
                    </div>
                ) : (
                    <div className="mt-12 rounded-2xl border border-orange-100 bg-orange-50/60 p-10 text-center text-neutral-600">
                        <h3 className="text-xl font-semibold text-neutral-900">No suppliers are featured yet</h3>
                        <p className="mt-2">
                            Check back soon or create a supplier profile to be among the first showcased in the marketplace.
                        </p>
                        <Button className="mt-6 bg-orange-600 hover:bg-orange-600/90" asChild>
                            <Link href={register().url}>Create your supplier profile</Link>
                        </Button>
                    </div>
                )}
            </section>
        </LandingLayout>
    );
}

function SupplierCard({ supplier }: { supplier: SupplierListItem }) {
    return (
        <Card className="group h-full overflow-hidden border-neutral-200/70 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg">
            <div className="relative h-44 w-full overflow-hidden">
                <img
                    src={
                        supplier.coverImageUrl ??
                        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80'
                    }
                    alt={supplier.companyName}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    {supplier.logoUrl ? (
                        <img
                            src={supplier.logoUrl}
                            alt={`${supplier.companyName} logo`}
                            className="size-12 rounded-xl border-2 border-white object-cover"
                        />
                    ) : (
                        <div className="flex size-12 items-center justify-center rounded-xl bg-white/90 text-lg font-semibold text-orange-600">
                            {supplier.companyName.slice(0, 1)}
                        </div>
                    )}
                    <div className="text-white">
                        <p className="text-lg font-semibold">{supplier.companyName}</p>
                        <p className="text-xs text-white/70">{supplier.location ?? 'Global presence'}</p>
                    </div>
                </div>
                {supplier.isVerified && (
                    <Badge className="absolute right-4 top-4 bg-emerald-500 text-white" variant="secondary">
                        <ShieldCheck className="mr-1 size-3" /> Verified
                    </Badge>
                )}
            </div>
            <CardContent className="space-y-4 p-6">
                {supplier.headline ? (
                    <p className="text-sm text-neutral-600">{supplier.headline}</p>
                ) : (
                    <p className="text-sm text-neutral-500">Supplier has not provided a headline yet.</p>
                )}
                <div className="flex flex-wrap gap-2">
                    {supplier.categories.slice(0, 4).map((category) => (
                        <Badge key={category} variant="outline" className="border-orange-200 text-orange-600">
                            {category}
                        </Badge>
                    ))}
                </div>
                <Separator className="bg-neutral-200" />
                <div className="flex items-center justify-between text-xs text-neutral-500">
                    <span className="flex items-center gap-2">
                        <Globe2 className="size-4 text-orange-500" />
                        {supplier.rating.toFixed(1)} rating
                    </span>
                    <span className="flex items-center gap-2">
                        <Mail className="size-4 text-orange-500" />
                        {supplier.contactEmail}
                    </span>
                </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between gap-3 p-6 pt-0">
                <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" asChild>
                    <Link href={supplier.url ?? suppliers.show({ supplierProfile: supplier.slug }).url}>View profile</Link>
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-600/90" asChild>
                    <Link href={supplier.websiteUrl ?? suppliers.show({ supplierProfile: supplier.slug }).url} target="_blank" rel="noreferrer">
                        Visit site
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
