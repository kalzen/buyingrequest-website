import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { route } from 'ziggy-js';
import { Link, useForm } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Send, 
    User, 
    Mail, 
    MapPin, 
    DollarSign, 
    Package, 
    Calendar,
    FileText,
    Truck,
    CreditCard
} from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface BuyerRequest {
    id: number;
    title: string;
    slug: string;
    summary: string;
    description: string;
    quantity: number | null;
    unit: string | null;
    hs_code: string | null;
    quality_requirements: string | null;
    packaging_specification: string | null;
    terms_of_delivery: string | null;
    port_of_discharge: string | null;
    delivery_time: string | null;
    method_of_transport: string | null;
    payment_terms: string | null;
    budget_min: number | null;
    budget_max: number | null;
    currency: string;
    preferred_location: string | null;
    status: string;
    notes: string | null;
    created_at: string;
    user: {
        name: string;
        email: string;
    };
    category?: {
        name: string;
    };
}

interface PageProps extends Record<string, unknown> {
    rfq: BuyerRequest;
}

export default function RfqShow() {
    const { rfq } = usePage<PageProps>().props;
    
    const { data, setData, post, processing, errors, reset } = useForm({
        message: '',
        quoted_price: '',
        currency: rfq.currency || 'USD',
        delivery_time_days: '',
        payment_terms: '',
        additional_notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('supplier.responses.store', rfq.id), {
            onSuccess: () => {
                reset();
            }
        });
    };

    const getBudgetRange = () => {
        if (!rfq.budget_min && !rfq.budget_max) return 'Budget not specified';
        if (rfq.budget_min && rfq.budget_max) {
            return `${rfq.currency} ${rfq.budget_min.toLocaleString()} - ${rfq.budget_max.toLocaleString()}`;
        }
        if (rfq.budget_min) {
            return `${rfq.currency} ${rfq.budget_min.toLocaleString()}+`;
        }
        return `Up to ${rfq.currency} ${rfq.budget_max?.toLocaleString()}`;
    };

    return (
        <DashboardLayout role="supplier" title="RFQ Details" pageTitle="RFQ Details">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('supplier.rfqs')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to RFQ Opportunities
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            {rfq.title}
                        </h1>
                        <p className="text-muted-foreground">
                            Posted on {new Date(rfq.created_at).toLocaleDateString()}
                        </p>
                    </div>
                    <Badge>{rfq.status}</Badge>
                </div>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-3 px-4 lg:px-6">
                {/* RFQ Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Buyer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Buyer Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{rfq.user.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{rfq.user.email}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary" />
                                Product Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold mb-2">Summary</h3>
                                <p className="text-muted-foreground">{rfq.summary}</p>
                            </div>
                            
                            {rfq.description && (
                                <>
                                    <Separator />
                                    <div>
                                        <h3 className="font-semibold mb-2">Full Description</h3>
                                        <p className="text-muted-foreground whitespace-pre-wrap">{rfq.description}</p>
                                    </div>
                                </>
                            )}

                            {(rfq.quantity || rfq.hs_code) && (
                                <>
                                    <Separator />
                                    <div className="grid grid-cols-2 gap-4">
                                        {rfq.quantity && (
                                            <div>
                                                <h4 className="text-sm font-medium mb-1">Quantity</h4>
                                                <p className="text-muted-foreground">{rfq.quantity} {rfq.unit}</p>
                                            </div>
                                        )}
                                        {rfq.hs_code && (
                                            <div>
                                                <h4 className="text-sm font-medium mb-1">HS Code</h4>
                                                <p className="text-muted-foreground">{rfq.hs_code}</p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}

                            {rfq.quality_requirements && (
                                <>
                                    <Separator />
                                    <div>
                                        <h3 className="font-semibold mb-2">Quality Requirements</h3>
                                        <p className="text-muted-foreground">{rfq.quality_requirements}</p>
                                    </div>
                                </>
                            )}

                            {rfq.packaging_specification && (
                                <>
                                    <Separator />
                                    <div>
                                        <h3 className="font-semibold mb-2">Packaging Specification</h3>
                                        <p className="text-muted-foreground">{rfq.packaging_specification}</p>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Trade Terms */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-5 w-5 text-primary" />
                                Terms of Trade
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="grid grid-cols-2 gap-4">
                            {rfq.terms_of_delivery && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Delivery Terms</h4>
                                    <p className="text-muted-foreground">{rfq.terms_of_delivery}</p>
                                </div>
                            )}
                            {rfq.port_of_discharge && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Port of Discharge</h4>
                                    <p className="text-muted-foreground">{rfq.port_of_discharge}</p>
                                </div>
                            )}
                            {rfq.method_of_transport && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Transport Method</h4>
                                    <p className="text-muted-foreground">{rfq.method_of_transport}</p>
                                </div>
                            )}
                            {rfq.payment_terms && (
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Payment Terms</h4>
                                    <p className="text-muted-foreground">{rfq.payment_terms}</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {rfq.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Additional Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">{rfq.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar - Response Form */}
                <div className="space-y-6">
                    {/* RFQ Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">RFQ Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span className="text-sm">Budget Range</span>
                                </div>
                                <div className="font-medium">{getBudgetRange()}</div>
                            </div>
                            
                            {rfq.preferred_location && (
                                <>
                                    <Separator />
                                    <div>
                                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                            <MapPin className="h-4 w-4" />
                                            <span className="text-sm">Location</span>
                                        </div>
                                        <div className="font-medium">{rfq.preferred_location}</div>
                                    </div>
                                </>
                            )}

                            {rfq.delivery_time && (
                                <>
                                    <Separator />
                                    <div>
                                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">Delivery Time</span>
                                        </div>
                                        <div className="font-medium">{rfq.delivery_time}</div>
                                    </div>
                                </>
                            )}

                            {rfq.category && (
                                <>
                                    <Separator />
                                    <div>
                                        <Badge variant="secondary">{rfq.category.name}</Badge>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {/* Response Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Submit Your Quote</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="message">Message *</Label>
                                    <Textarea
                                        id="message"
                                        value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        placeholder="Introduce your company and capabilities..."
                                        rows={4}
                                        required
                                    />
                                    {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="quoted_price">Quoted Price</Label>
                                    <div className="flex gap-2">
                                        <Input
                                            id="quoted_price"
                                            type="number"
                                            step="0.01"
                                            value={data.quoted_price}
                                            onChange={(e) => setData('quoted_price', e.target.value)}
                                            placeholder="0.00"
                                            className="flex-1"
                                        />
                                        <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                                            <SelectTrigger className="w-24">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="USD">USD</SelectItem>
                                                <SelectItem value="EUR">EUR</SelectItem>
                                                <SelectItem value="GBP">GBP</SelectItem>
                                                <SelectItem value="JPY">JPY</SelectItem>
                                                <SelectItem value="CNY">CNY</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {errors.quoted_price && <p className="text-sm text-destructive">{errors.quoted_price}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="delivery_time_days">Delivery Time (days)</Label>
                                    <Input
                                        id="delivery_time_days"
                                        type="number"
                                        value={data.delivery_time_days}
                                        onChange={(e) => setData('delivery_time_days', e.target.value)}
                                        placeholder="e.g., 30"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="payment_terms">Payment Terms</Label>
                                    <Select value={data.payment_terms} onValueChange={(value) => setData('payment_terms', value)}>
                                        <SelectTrigger id="payment_terms">
                                            <SelectValue placeholder="Select terms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="T/T">T/T</SelectItem>
                                            <SelectItem value="L/C">L/C</SelectItem>
                                            <SelectItem value="D/P">D/P</SelectItem>
                                            <SelectItem value="D/A">D/A</SelectItem>
                                            <SelectItem value="30% deposit, 70% before shipping">30/70 Split</SelectItem>
                                            <SelectItem value="50% deposit, 50% on delivery">50/50 Split</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="additional_notes">Additional Notes</Label>
                                    <Textarea
                                        id="additional_notes"
                                        value={data.additional_notes}
                                        onChange={(e) => setData('additional_notes', e.target.value)}
                                        placeholder="Warranty, certifications, customization options..."
                                        rows={3}
                                    />
                                </div>

                                <Button type="submit" className="w-full" disabled={processing}>
                                    <Send className="size-4 mr-2" />
                                    {processing ? 'Submitting...' : 'Submit Response'}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

