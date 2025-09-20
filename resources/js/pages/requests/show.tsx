import LandingLayout from '@/layouts/landing-layout';
import type { ReactNode } from 'react';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, MapPin, Wallet, PackageCheck } from 'lucide-react';
import { register } from '@/routes';

interface RequestPageProps {
    request: {
        id: number;
        title: string;
        summary?: string | null;
        category?: string | null;
        description?: string | null;
        quantity?: number | null;
        unit?: string | null;
        budgetMin?: number | null;
        budgetMax?: number | null;
        currency: string;
        preferredLocation?: string | null;
        shippingTerms?: string | null;
        leadValidUntil?: string | null;
        attachments?: string[] | null;
        buyer: {
            name: string;
        };
        createdAt?: string | null;
    };
}

type PageProps = SharedData & RequestPageProps;

export default function RequestShow() {
    const { props } = usePage<PageProps>();
    const { request } = props;

    return (
        <LandingLayout>
            <section className="mx-auto w-full max-w-5xl px-4 py-16">
                <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <Badge className="bg-orange-500/10 text-orange-600">
                                {request.category ?? 'General sourcing'}
                            </Badge>
                            <h1 className="text-3xl font-semibold text-neutral-900">
                                {request.title}
                            </h1>
                            {request.summary && (
                                <p className="text-lg text-neutral-600">{request.summary}</p>
                            )}
                            <div className="flex flex-wrap gap-3 text-sm text-neutral-500">
                                <span>Posted by {request.buyer.name}</span>
                                {request.createdAt && <span>On {request.createdAt}</span>}
                                {request.leadValidUntil && (
                                    <span>Open until {request.leadValidUntil}</span>
                                )}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-orange-100 bg-orange-50/90 p-6">
                            <h2 className="text-lg font-semibold text-orange-700">Project details</h2>
                            <div className="mt-4 grid gap-4 text-sm text-neutral-700 md:grid-cols-2">
                                <DetailItem icon={PackageCheck} label="Quantity">
                                    {request.quantity
                                        ? `${request.quantity.toLocaleString()} ${request.unit ?? ''}`
                                        : 'Flexible'}
                                </DetailItem>
                                <DetailItem icon={Wallet} label="Budget range">
                                    {request.budgetMin && request.budgetMax
                                        ? `${request.currency} ${request.budgetMin.toLocaleString()} - ${request.currency} ${request.budgetMax.toLocaleString()}`
                                        : 'Negotiable'}
                                </DetailItem>
                                <DetailItem icon={MapPin} label="Preferred location">
                                    {request.preferredLocation ?? 'Global'}
                                </DetailItem>
                                <DetailItem icon={ShieldCheck} label="Shipping terms">
                                    {request.shippingTerms ?? 'To be discussed'}
                                </DetailItem>
                            </div>
                        </div>

                        <Card className="border-neutral-200/80">
                            <CardHeader>
                                <CardTitle className="text-lg text-neutral-900">
                                    Specifications
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="prose max-w-none text-neutral-700">
                                {request.description ? (
                                    <p>{request.description}</p>
                                ) : (
                                    <p>Buyer will provide detailed specifications during negotiation.</p>
                                )}
                                {request.attachments?.length ? (
                                    <div className="mt-4 space-y-2 text-sm">
                                        <h3 className="font-medium text-neutral-800">Reference assets</h3>
                                        <ul className="list-disc pl-5 text-orange-600">
                                            {request.attachments.map((attachment, index) => (
                                                <li key={index}>
                                                    <a href={attachment} target="_blank" rel="noreferrer" className="underline">
                                                        Attachment {index + 1}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ) : null}
                            </CardContent>
                        </Card>
                    </div>

                    <aside className="space-y-4">
                        <Card className="border-orange-100 bg-orange-50/70">
                            <CardHeader>
                                <CardTitle className="text-base text-orange-700">
                                    Ready to respond?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm text-orange-700">
                                <p>
                                    Create a supplier account to submit your proposal, share certifications, and chat directly with buyers.
                                </p>
                                <Button className="w-full bg-orange-600 hover:bg-orange-600/90" asChild>
                                    <Link href={register().url}>Join SupplySphere</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </aside>
                </div>
            </section>
        </LandingLayout>
    );
}

function DetailItem({
    icon: Icon,
    label,
    children,
}: {
    icon: ComponentType<{ className?: string }>;

    label: string;
    children: ReactNode;
}) {
    return (
        <div className="flex items-start gap-3">
            <div className="rounded-lg bg-orange-500/10 p-2 text-orange-600">
                <Icon className="size-4" />
            </div>
            <div>
                <p className="text-xs uppercase tracking-wide text-orange-500">{label}</p>
                <p className="font-medium text-neutral-900">{children}</p>
            </div>
        </div>
    );
}
