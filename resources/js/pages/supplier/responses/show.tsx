import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { route } from 'ziggy-js';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, DollarSign, Calendar, Truck, CreditCard, FileText, User, Mail } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface BuyerRequest {
    id: number;
    title: string;
    summary: string;
    user: {
        name: string;
        email: string;
    };
}

interface SupplierResponse {
    id: number;
    message: string;
    quoted_price: number | null;
    currency: string;
    delivery_time_days: number | null;
    payment_terms: string | null;
    additional_notes: string | null;
    status: string;
    responded_at: string;
    buyer_request: BuyerRequest;
}

interface PageProps extends Record<string, unknown> {
    response: SupplierResponse;
}

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'accepted': return 'default';
        case 'pending': return 'secondary';
        case 'rejected': return 'destructive';
        case 'negotiating': return 'outline';
        default: return 'outline';
    }
};

export default function ResponseShow() {
    const { response } = usePage<PageProps>().props;
    const [isWithdrawing, setIsWithdrawing] = useState(false);

    const handleWithdraw = () => {
        if (confirm('Are you sure you want to withdraw this response? This action cannot be undone.')) {
            setIsWithdrawing(true);
            router.delete(route('supplier.responses.destroy', response.id), {
                onFinish: () => setIsWithdrawing(false),
            });
        }
    };

    return (
        <DashboardLayout role="supplier" title="Response Details" pageTitle="Response Details">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('supplier.responses')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to My Responses
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Response Details
                        </h1>
                        <p className="text-muted-foreground">
                            Your quotation for: {response.buyer_request.title}
                        </p>
                    </div>
                    <Badge variant={getStatusVariant(response.status)} className="text-lg px-4 py-2">
                        {response.status}
                    </Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-3 px-4 lg:px-6">
                {/* Response Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* RFQ Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Original RFQ
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">{response.buyer_request.title}</h3>
                                <p className="text-muted-foreground">{response.buyer_request.summary}</p>
                            </div>
                            <Separator />
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{response.buyer_request.user.name}</span>
                                <Mail className="h-4 w-4 text-muted-foreground ml-4" />
                                <span className="text-muted-foreground">{response.buyer_request.user.email}</span>
                            </div>
                            <Link href={route('requests.show', response.buyer_request.id)}>
                                <Button variant="outline" className="w-full">
                                    View Full RFQ Details
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>

                    {/* Your Quotation */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Quotation</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-muted-foreground">Message</label>
                                <div className="mt-2 p-4 bg-muted rounded-lg">
                                    <p className="text-foreground">{response.message}</p>
                                </div>
                            </div>

                            {response.additional_notes && (
                                <>
                                    <Separator />
                                    <div>
                                        <label className="text-sm font-medium text-muted-foreground">Additional Notes</label>
                                        <div className="mt-2 p-4 bg-muted rounded-lg">
                                            <p className="text-foreground">{response.additional_notes}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Pricing */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Pricing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {response.quoted_price ? (
                                <div>
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <DollarSign className="h-4 w-4" />
                                        <span className="text-sm">Quoted Price</span>
                                    </div>
                                    <div className="text-2xl font-bold text-primary">
                                        {response.currency} {response.quoted_price.toLocaleString()}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-muted-foreground">Price not specified</div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Terms */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Terms & Conditions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {response.delivery_time_days && (
                                <div>
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Truck className="h-4 w-4" />
                                        <span className="text-sm">Delivery Time</span>
                                    </div>
                                    <div className="font-medium">
                                        {response.delivery_time_days} days
                                    </div>
                                </div>
                            )}
                            
                            {response.payment_terms && (
                                <>
                                    <Separator />
                                    <div>
                                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                            <CreditCard className="h-4 w-4" />
                                            <span className="text-sm">Payment Terms</span>
                                        </div>
                                        <div className="font-medium">
                                            {response.payment_terms}
                                        </div>
                                    </div>
                                </>
                            )}

                            <Separator />
                            <div>
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <Calendar className="h-4 w-4" />
                                    <span className="text-sm">Response Date</span>
                                </div>
                                <div className="font-medium">
                                    {response.responded_at}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Link href={route('supplier.responses.edit', response.id)}>
                                <Button variant="outline" className="w-full">
                                    Edit Response
                                </Button>
                            </Link>
                            <a href={`mailto:${response.buyer_request.user.email}?subject=Re: ${response.buyer_request.title}`}>
                                <Button variant="outline" className="w-full">
                                    Contact Buyer
                                </Button>
                            </a>
                            <Button 
                                variant="destructive" 
                                className="w-full"
                                onClick={handleWithdraw}
                                disabled={isWithdrawing || response.status === 'withdrawn'}
                            >
                                {isWithdrawing ? 'Withdrawing...' : response.status === 'withdrawn' ? 'Already Withdrawn' : 'Withdraw Response'}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

