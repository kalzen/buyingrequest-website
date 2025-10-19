import DashboardLayout from '@/layouts/dashboard-layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { route } from "ziggy-js";
import { usePage } from "@inertiajs/react";

interface BuyerRequest {
    id: number;
    title: string;
    summary: string;
    description: string | null;
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
    notes: string | null;
}

interface PageProps extends Record<string, unknown> {
    request: BuyerRequest;
}

export default function EditRequest() {
    const { request } = usePage<PageProps>().props;
    
    const { data, setData, put, processing, errors } = useForm({
        title: request.title,
        summary: request.summary,
        description: request.description || '',
        quantity: request.quantity || '',
        unit: request.unit || '',
        hs_code: request.hs_code || '',
        quality_requirements: request.quality_requirements || '',
        packaging_specification: request.packaging_specification || '',
        terms_of_delivery: request.terms_of_delivery || '',
        port_of_discharge: request.port_of_discharge || '',
        delivery_time: request.delivery_time || '',
        method_of_transport: request.method_of_transport || '',
        payment_terms: request.payment_terms || '',
        budget_min: request.budget_min || '',
        budget_max: request.budget_max || '',
        currency: request.currency,
        preferred_location: request.preferred_location || '',
        notes: request.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('buyer.requests.update', request.id));
    };

    return (
        <DashboardLayout role="buyer" title="Edit Request" pageTitle="Edit Request">
            <div className="px-4 lg:px-6 max-w-5xl">
                <div className="mb-8">
                    <Link href={route('buyer.active-requests')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                        <ArrowLeft className="size-4" />
                        Back to Active Requests
                    </Link>
                    <h1 className="text-3xl font-bold text-foreground mb-2">Edit RFQ Request</h1>
                    <p className="text-muted-foreground">
                        Update your Request for Quote (RFQ) information
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Product Name *</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Enter product name"
                                    required
                                />
                                {errors.title && <p className="text-sm text-destructive">{errors.title}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="summary">Summary *</Label>
                                <Textarea
                                    id="summary"
                                    value={data.summary}
                                    onChange={(e) => setData('summary', e.target.value)}
                                    placeholder="Brief description of what you need"
                                    rows={3}
                                    required
                                />
                                {errors.summary && <p className="text-sm text-destructive">{errors.summary}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Detailed Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    placeholder="Provide comprehensive details about your requirements"
                                    rows={5}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Product Specifications */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Product Specifications</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hs_code">HS Code</Label>
                                    <Input
                                        id="hs_code"
                                        value={data.hs_code}
                                        onChange={(e) => setData('hs_code', e.target.value)}
                                        placeholder="e.g., 1234567890"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        type="number"
                                        value={data.quantity}
                                        onChange={(e) => setData('quantity', e.target.value)}
                                        placeholder="1000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit">Unit of Measure</Label>
                                    <Input
                                        id="unit"
                                        value={data.unit}
                                        onChange={(e) => setData('unit', e.target.value)}
                                        placeholder="pieces, kg, tons"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quality_requirements">Quality Requirements</Label>
                                <Textarea
                                    id="quality_requirements"
                                    value={data.quality_requirements}
                                    onChange={(e) => setData('quality_requirements', e.target.value)}
                                    placeholder="ISO certifications, quality standards..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="packaging_specification">Packaging Specification</Label>
                                <Textarea
                                    id="packaging_specification"
                                    value={data.packaging_specification}
                                    onChange={(e) => setData('packaging_specification', e.target.value)}
                                    placeholder="Packaging requirements..."
                                    rows={2}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Trade Terms */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Terms of Trade</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="terms_of_delivery">Delivery Terms</Label>
                                    <Input
                                        id="terms_of_delivery"
                                        value={data.terms_of_delivery}
                                        onChange={(e) => setData('terms_of_delivery', e.target.value)}
                                        placeholder="FOB, CIF, EXW, etc."
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="port_of_discharge">Port of Discharge</Label>
                                    <Input
                                        id="port_of_discharge"
                                        value={data.port_of_discharge}
                                        onChange={(e) => setData('port_of_discharge', e.target.value)}
                                        placeholder="e.g., Los Angeles Port"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="delivery_time">Delivery Time</Label>
                                    <Input
                                        id="delivery_time"
                                        value={data.delivery_time}
                                        onChange={(e) => setData('delivery_time', e.target.value)}
                                        placeholder="e.g., 30-45 days"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="method_of_transport">Transport Method</Label>
                                    <Select value={data.method_of_transport} onValueChange={(value) => setData('method_of_transport', value)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select transport method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Sea">Sea Freight</SelectItem>
                                            <SelectItem value="Air">Air Freight</SelectItem>
                                            <SelectItem value="Land">Land Transport</SelectItem>
                                            <SelectItem value="Rail">Rail</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="payment_terms">Payment Terms</Label>
                                <Select value={data.payment_terms} onValueChange={(value) => setData('payment_terms', value)}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select payment terms" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="T/T">T/T</SelectItem>
                                        <SelectItem value="L/C">L/C</SelectItem>
                                        <SelectItem value="D/P">D/P</SelectItem>
                                        <SelectItem value="D/A">D/A</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Budget & Location */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Budget & Location</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="budget_min">Budget Min</Label>
                                    <Input
                                        id="budget_min"
                                        type="number"
                                        step="0.01"
                                        value={data.budget_min}
                                        onChange={(e) => setData('budget_min', e.target.value)}
                                        placeholder="Min budget"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="budget_max">Budget Max</Label>
                                    <Input
                                        id="budget_max"
                                        type="number"
                                        step="0.01"
                                        value={data.budget_max}
                                        onChange={(e) => setData('budget_max', e.target.value)}
                                        placeholder="Max budget"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                                        <SelectTrigger>
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
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="preferred_location">Preferred Location</Label>
                                <Input
                                    id="preferred_location"
                                    value={data.preferred_location}
                                    onChange={(e) => setData('preferred_location', e.target.value)}
                                    placeholder="Country or region"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Additional Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Additional Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="notes">Notes</Label>
                                <Textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    placeholder="Any additional requirements or information..."
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Submit Buttons */}
                    <div className="flex justify-end gap-4">
                        <Link href={route('buyer.active-requests')}>
                            <Button variant="outline" type="button">Cancel</Button>
                        </Link>
                        <Button type="submit" disabled={processing}>
                            <Save className="size-4 mr-2" />
                            {processing ? 'Saving...' : 'Save Changes'}
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardLayout>
    );
}
