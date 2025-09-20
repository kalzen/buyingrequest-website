import LandingLayout from '@/layouts/landing-layout';
import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { register } from '@/routes';
import { Globe2, BadgeCheck } from 'lucide-react';

interface SupplierPageProps {
    supplier: {
        id: number;
        companyName: string;
        slug: string;
        headline?: string | null;
        about?: string | null;
        logoUrl?: string | null;
        coverImageUrl?: string | null;
        location?: string | null;
        countriesServed: string[];
        foundedYear?: number | null;
        minOrderQuantity?: number | null;
        minOrderValue?: number | null;
        currency: string;
        leadTimeDays?: number | null;
        responseTimeHours?: number | null;
        isVerified: boolean;
        rating: number;
        certifications: string[];
        websiteUrl?: string | null;
        categories: string[];
        keywords: string[];
    };
}

type PageProps = SupplierPageProps & Record<string, any>;

export default function SupplierShow() {
    const { props } = usePage<PageProps>();
    const { supplier } = props;

    return (
        <LandingLayout>
            <Head title={`${supplier.companyName} | Supplier profile`} />

            <section className="relative w-full border-b border-orange-100 bg-orange-50/80 py-16">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 lg:flex-row lg:items-center">
                    <div className="flex flex-1 items-start gap-4">
                        {supplier.logoUrl ? (
                            <img
                                src={supplier.logoUrl}
                                alt={supplier.companyName}
                                className="size-16 rounded-xl border border-orange-200 object-cover"
                            />
                        ) : (
                            <div className="flex size-16 items-center justify-center rounded-xl border border-orange-200 bg-white text-lg font-semibold text-orange-600">
                                {supplier.companyName.slice(0, 2)}
                            </div>
                        )}
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <h1 className="text-3xl font-semibold text-neutral-900">
                                    {supplier.companyName}
                                </h1>
                                {supplier.isVerified && (
                                    <Badge className="bg-emerald-500/20 text-emerald-600" variant="secondary">
                                        Verified
                                    </Badge>
                                )}
                            </div>
                            {supplier.headline && (
                                <p className="text-neutral-600">{supplier.headline}</p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
                                {supplier.location && (
                                    <span className="flex items-center gap-1">
                                        <Globe2 className="size-4 text-orange-500" />
                                        {supplier.location}
                                    </span>
                                )}
                                <span>
                                    Rating {supplier.rating.toFixed(1)} / 5.0
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button className="bg-orange-600 hover:bg-orange-600/90" asChild>
                            <a href={supplier.websiteUrl ?? register().url} target="_blank" rel="noreferrer">
                                Visit supplier
                            </a>
                        </Button>
                        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" asChild>
                            <Link href={register().url}>Contact supplier</Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-16 lg:grid-cols-[2fr,1fr]">
                <div className="space-y-6">
                    <Card className="border-neutral-200/80">
                        <CardHeader>
                            <CardTitle className="text-lg text-neutral-900">About the supplier</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-neutral-700">
                            {supplier.about ? (
                                <p>{supplier.about}</p>
                            ) : (
                                <p>Profile description will be added soon.</p>
                            )}
                            <Separator />
                            <div className="grid gap-3 text-sm md:grid-cols-2">
                                <Detail label="Founded" value={supplier.foundedYear ? supplier.foundedYear.toString() : '�'} />
                                <Detail
                                    label="Minimum order"
                                    value={supplier.minOrderQuantity ? `${supplier.minOrderQuantity} units` : 'Negotiable'}
                                />
                                <Detail
                                    label="Minimum order value"
                                    value={supplier.minOrderValue ? `${supplier.currency} ${supplier.minOrderValue.toLocaleString()}` : 'Negotiable'}
                                />
                                <Detail
                                    label="Lead time"
                                    value={supplier.leadTimeDays ? `${supplier.leadTimeDays} days` : 'Discuss during negotiation'}
                                />
                                <Detail
                                    label="Average response"
                                    value={supplier.responseTimeHours ? `${supplier.responseTimeHours} hours` : 'Within 24h'}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-neutral-200/80">
                        <CardHeader>
                            <CardTitle className="text-lg text-neutral-900">Capabilities & categories</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-neutral-700">
                            <div className="flex flex-wrap gap-2">
                                {supplier.categories.map((category) => (
                                    <Badge key={category} variant="secondary" className="bg-neutral-200 text-neutral-800">
                                        {category}
                                    </Badge>
                                ))}
                            </div>
                            {supplier.keywords.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-semibold text-neutral-800">Keywords</h3>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {supplier.keywords.map((keyword) => (
                                            <Badge key={keyword} variant="outline" className="border-neutral-200 text-neutral-600">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <aside className="space-y-4">
                    <Card className="border-orange-100 bg-orange-50/80">
                        <CardHeader>
                            <CardTitle className="text-sm text-orange-700">Reach new buyers</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-orange-700">
                            <p>
                                Upgrade to featured supplier status to appear on the homepage, respond instantly, and unlock insights.
                            </p>
                            <Button className="w-full bg-orange-600 hover:bg-orange-600/90" asChild>
                                <Link href={register().url}>Boost visibility</Link>
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="border-neutral-200/80">
                        <CardHeader>
                            <CardTitle className="text-sm text-neutral-900">Certifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-neutral-600">
                            {supplier.certifications.length ? (
                                supplier.certifications.map((cert) => (
                                    <div key={cert} className="flex items-center gap-2">
                                        <BadgeCheck className="size-4 text-emerald-500" />
                                        <span>{cert}</span>
                                    </div>
                                ))
                            ) : (
                                <p>No certifications added yet.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card className="border-neutral-200/80">
                        <CardHeader>
                            <CardTitle className="text-sm text-neutral-900">Markets served</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm text-neutral-600">
                            {supplier.countriesServed.length ? (
                                <ul className="list-disc pl-4">
                                    {supplier.countriesServed.map((country) => (
                                        <li key={country}>{country}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p>Global availability.</p>
                            )}
                        </CardContent>
                    </Card>
                </aside>
            </section>
        </LandingLayout>
    );
}

function Detail({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-neutral-100 px-3 py-2 text-sm">
            <span className="text-neutral-500">{label}</span>
            <span className="font-medium text-neutral-800">{value}</span>
        </div>
    );
}
