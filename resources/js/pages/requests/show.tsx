import LandingLayout from '@/layouts/landing-layout';
import type { ComponentType, ReactNode } from 'react';
import type { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShieldCheck, MapPin, Wallet, PackageCheck, Clock, Truck, CreditCard, FileText, Tag, Globe, Calendar, AlertCircle } from 'lucide-react';
import { route } from 'ziggy-js';

interface RequestPageProps {
    request: {
        id: number;
        title: string;
        summary?: string | null;
        category?: string | null;
        description?: string | null;
        quantity?: number | null;
        unit?: string | null;
        hs_code?: string | null;
        quality_requirements?: string | null;
        packaging_specification?: string | null;
        terms_of_delivery?: string | null;
        port_of_discharge?: string | null;
        delivery_time?: string | null;
        method_of_transport?: string | null;
        payment_terms?: string | null;
        budgetMin?: number | null;
        budgetMax?: number | null;
        currency: string;
        preferredLocation?: string | null;
        shippingTerms?: string | null;
        leadValidUntil?: string | null;
        notes?: string | null;
        status?: string | null;
        attachments?: string[] | null;
        buyer: {
            name: string;
        };
        createdAt?: string | null;
    };
}

type PageProps = RequestPageProps & Record<string, any>;

export default function RequestShow() {
    const { props } = usePage<PageProps>();
    const { request } = props;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'open': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-red-100 text-red-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <LandingLayout>
            <section className="mx-auto w-full max-w-6xl px-4 py-16">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                        <Badge className="bg-primary/10 text-primary">
                            {request.category ?? 'General sourcing'}
                        </Badge>
                        {request.status && (
                            <Badge className={getStatusColor(request.status)}>
                                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                            </Badge>
                        )}
                    </div>
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">
                        {request.title}
                    </h1>
                    {request.summary && (
                        <p className="text-xl text-slate-600 mb-6">{request.summary}</p>
                    )}
                    <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                            <FileText className="size-4" />
                            Posted by {request.buyer.name}
                        </span>
                        {request.createdAt && (
                            <span className="flex items-center gap-2">
                                <Calendar className="size-4" />
                                {request.createdAt}
                            </span>
                        )}
                        {request.leadValidUntil && (
                            <span className="flex items-center gap-2">
                                <Clock className="size-4" />
                                Valid until {request.leadValidUntil}
                            </span>
                        )}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
                    <div className="space-y-8">
                        {/* Goods Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                                    <PackageCheck className="size-6 text-primary" />
                                    Goods Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <DetailItem icon={PackageCheck} label="Quantity">
                                        {request.quantity
                                            ? `${request.quantity.toLocaleString()} ${request.unit ?? ''}`
                                            : 'Flexible'}
                                    </DetailItem>
                                    {request.hs_code && (
                                        <DetailItem icon={Tag} label="HS Code">
                                            {request.hs_code}
                                        </DetailItem>
                                    )}
                                </div>
                                
                                {request.quality_requirements && (
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-2">Quality Requirements</h4>
                                        <p className="text-slate-700">{request.quality_requirements}</p>
                                    </div>
                                )}
                                
                                {request.packaging_specification && (
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-2">Packaging Specification</h4>
                                        <p className="text-slate-700">{request.packaging_specification}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Terms of Trade */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                                    <ShieldCheck className="size-6 text-primary" />
                                    Terms of Trade
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    {request.terms_of_delivery && (
                                        <DetailItem icon={Truck} label="Terms of Delivery">
                                            {request.terms_of_delivery}
                                        </DetailItem>
                                    )}
                                    {request.port_of_discharge && (
                                        <DetailItem icon={MapPin} label="Port of Discharge">
                                            {request.port_of_discharge}
                                        </DetailItem>
                                    )}
                                    {request.delivery_time && (
                                        <DetailItem icon={Clock} label="Delivery Time">
                                            {request.delivery_time}
                                        </DetailItem>
                                    )}
                                    {request.method_of_transport && (
                                        <DetailItem icon={Truck} label="Transport Method">
                                            {request.method_of_transport.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </DetailItem>
                                    )}
                                    {request.payment_terms && (
                                        <DetailItem icon={CreditCard} label="Payment Terms">
                                            {request.payment_terms.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                        </DetailItem>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Budget & Location */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                                    <Wallet className="size-6 text-primary" />
                                    Budget & Location
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <DetailItem icon={Wallet} label="Budget Range">
                                        {request.budgetMin && request.budgetMax
                                            ? `${request.currency} ${request.budgetMin.toLocaleString()} - ${request.currency} ${request.budgetMax.toLocaleString()}`
                                            : 'Negotiable'}
                                    </DetailItem>
                                    <DetailItem icon={Globe} label="Preferred Location">
                                        {request.preferredLocation ?? 'Global'}
                                    </DetailItem>
                                </div>
                                
                                {request.shippingTerms && (
                                    <div>
                                        <h4 className="font-semibold text-slate-900 mb-2">Shipping Terms</h4>
                                        <p className="text-slate-700">{request.shippingTerms}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Description */}
                        {request.description && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-semibold text-slate-900">
                                        Description
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-700 leading-relaxed">{request.description}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Notes */}
                        {request.notes && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-semibold text-slate-900 flex items-center gap-2">
                                        <AlertCircle className="size-6 text-primary" />
                                        Additional Notes
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-700 leading-relaxed">{request.notes}</p>
                                </CardContent>
                            </Card>
                        )}

                        {/* Attachments */}
                        {request.attachments?.length && (
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl font-semibold text-slate-900">
                                        Attachments
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        {request.attachments.map((attachment, index) => (
                                            <a 
                                                key={index}
                                                href={attachment} 
                                                target="_blank" 
                                                rel="noreferrer" 
                                                className="flex items-center gap-2 text-primary hover:text-primary/80 underline"
                                            >
                                                <FileText className="size-4" />
                                                Attachment {index + 1}
                                            </a>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="space-y-6">
                        <Card className="border-primary/20 bg-primary/5">
                            <CardHeader>
                                <CardTitle className="text-xl text-primary">
                                    Ready to Respond?
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-slate-700">
                                    Create a supplier account to submit your proposal, share certifications, and chat directly with buyers.
                                </p>
                                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                                    <Link href={route('register')}>Join as Supplier</Link>
                                </Button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg text-slate-900">
                                    Request Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Request ID:</span>
                                    <span className="font-medium">#{request.id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Category:</span>
                                    <span className="font-medium">{request.category ?? 'General'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Status:</span>
                                    <Badge className={getStatusColor(request.status || 'open')}>
                                        {request.status || 'Open'}
                                    </Badge>
                                </div>
                                {request.createdAt && (
                                    <div className="flex justify-between">
                                        <span className="text-slate-600">Posted:</span>
                                        <span className="font-medium">{request.createdAt}</span>
                                    </div>
                                )}
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
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
                <Icon className="size-4" />
            </div>
            <div>
                <p className="text-xs uppercase tracking-wide text-primary font-medium">{label}</p>
                <p className="font-medium text-slate-900">{children}</p>
            </div>
        </div>
    );
}
