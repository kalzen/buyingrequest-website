import LandingLayout from '@/layouts/landing-layout';
import type { SharedData, MarketplaceRequest, MarketplaceCategory } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, PackageCheck, MapPin, Calendar } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { route } from '@/lib/route';

interface CategorizedRequest extends MarketplaceRequest {
    buyer: {
        name: string;
    };
}

interface CategoryShowProps {
    category: MarketplaceCategory & {
        requestsCount: number;
        description?: string | null;
    };
    buyerRequests: CategorizedRequest[];
}

type PageProps = SharedData & CategoryShowProps;

export default function CategoryShow() {
    const { props } = usePage<PageProps>();
    const { category, buyerRequests } = props;

    return (
        <LandingLayout>
            <Head title={`${category.name} sourcing requests`} />

            <section className="relative border-b border-orange-100 bg-orange-50/70 py-16">
                <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4">
                    <div className="space-y-4">
                        <Badge className="w-fit bg-orange-500/10 text-orange-600">Live demand</Badge>
                        <h1 className="text-4xl font-semibold text-neutral-900">{category.name}</h1>
                        {category.description && (
                            <p className="max-w-3xl text-lg text-neutral-600">{category.description}</p>
                        )}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                        <span className="flex items-center gap-2">
                            <PackageCheck className="size-4 text-orange-500" />
                            {category.requestsCount} open requests
                        </span>
                        <Separator orientation="vertical" className="hidden h-4 bg-orange-200 sm:inline" />
                        <span>Browse qualified buyer projects and submit your proposal instantly.</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <Button className="bg-orange-600 hover:bg-orange-600/90" asChild>
                            <Link href={route('register')}>
                                Join as supplier
                                <ArrowRight className="ml-2 size-4" />
                            </Link>
                        </Button>
                        <Button variant="outline" className="border-orange-200 text-orange-600 hover:bg-orange-50" asChild>
                            <Link href={route('home')}>
                                Back to marketplace
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>

            <section className="mx-auto w-full max-w-6xl px-4 py-16">
                {buyerRequests.length ? (
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {buyerRequests.map((request) => (
                            <RequestCard key={request.id} request={request} />
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-orange-100 bg-orange-50/60 p-10 text-center text-neutral-600">
                        <h2 className="text-2xl font-semibold text-neutral-900">No open requests right now</h2>
                        <p className="mt-2">
                            This category has no live briefs at the moment. Check back soon or post your own buying request to attract suppliers.
                        </p>
                        <Button className="mt-6 bg-orange-600 hover:bg-orange-600/90" asChild>
                            <Link href={route('register')}>
                                Post a buying request
                            </Link>
                        </Button>
                    </div>
                )}
            </section>
        </LandingLayout>
    );
}

function RequestCard({ request }: { request: CategorizedRequest }) {
    const budgetMin = request.budgetMin ?? undefined;
    const budgetMax = request.budgetMax ?? undefined;
    const quantity = request.quantity ?? undefined;

    return (
        <Card className="group h-full border-neutral-200/70 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-xl">
            <CardHeader className="space-y-3">
                <Badge className="w-fit bg-orange-100 text-xs text-orange-600">
                    {request.category ?? 'General sourcing'}
                </Badge>
                <CardTitle className="text-xl font-semibold text-neutral-900">{request.title}</CardTitle>
                {request.summary && <CardDescription className="text-neutral-600">{request.summary}</CardDescription>}
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
                            {quantity ? `${quantity.toLocaleString()} ${request.unit ?? ''}` : 'Flexible'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-neutral-500">
                    <span className="flex items-center gap-1">
                        <MapPin className="size-3 text-orange-500" />
                        Preferred: {request.preferredLocation ?? 'Global'}
                    </span>
                    <span className="flex items-center gap-1">
                        <Calendar className="size-3 text-orange-500" />
                        Open until: {request.leadValidUntil ?? 'Rolling'}
                    </span>
                </div>
                <p className="text-xs text-neutral-400">Posted by {request.buyer.name}</p>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">Posted {request.createdAt ?? 'today'}</span>
                <Button variant="ghost" className="text-orange-600 hover:bg-orange-50" asChild>
                    <Link href={route('requests.show', { buyerRequest: request.slug })}>
                        View details
                        <ArrowRight className="ml-2 size-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
