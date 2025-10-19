import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { route } from 'ziggy-js';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface BuyerRequest {
    id: number;
    title: string;
    summary: string;
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
    buyer_request: BuyerRequest;
}

interface PageProps extends Record<string, unknown> {
    response: SupplierResponse;
}

export default function EditResponse() {
    const { response } = usePage<PageProps>().props;
    
    const { data, setData, put, processing, errors } = useForm({
        message: response.message,
        quoted_price: response.quoted_price || '',
        currency: response.currency,
        delivery_time_days: response.delivery_time_days || '',
        payment_terms: response.payment_terms || '',
        additional_notes: response.additional_notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('supplier.responses.update', response.id));
    };

    return (
        <DashboardLayout role="supplier" title="Edit Response" pageTitle="Edit Response">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('supplier.responses.show', response.id)} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to Response
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Edit Response
                    </h1>
                    <p className="text-muted-foreground">
                        Update your quotation for: {response.buyer_request.title}
                    </p>
                </div>
            </div>

            {/* Form */}
            <div className="px-4 lg:px-6 max-w-4xl">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Quotation Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="message">Response Message *</Label>
                                <Textarea
                                    id="message"
                                    value={data.message}
                                    onChange={(e) => setData('message', e.target.value)}
                                    placeholder="Describe your offering, capabilities, and why you're the best fit..."
                                    rows={6}
                                    required
                                />
                                {errors.message && <p className="text-sm text-destructive">{errors.message}</p>}
                            </div>

                            {/* Pricing */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="quoted_price">Quoted Price</Label>
                                    <Input
                                        id="quoted_price"
                                        type="number"
                                        step="0.01"
                                        value={data.quoted_price}
                                        onChange={(e) => setData('quoted_price', e.target.value)}
                                        placeholder="Enter your price"
                                    />
                                    {errors.quoted_price && <p className="text-sm text-destructive">{errors.quoted_price}</p>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency</Label>
                                    <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                                        <SelectTrigger id="currency">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                                            <SelectItem value="CNY">CNY - Chinese Yuan</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Terms */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <Select value={data.payment_terms || ''} onValueChange={(value) => setData('payment_terms', value)}>
                                        <SelectTrigger id="payment_terms">
                                            <SelectValue placeholder="Select payment terms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="T/T">T/T (Telegraphic Transfer)</SelectItem>
                                            <SelectItem value="L/C">L/C (Letter of Credit)</SelectItem>
                                            <SelectItem value="D/P">D/P (Documents against Payment)</SelectItem>
                                            <SelectItem value="D/A">D/A (Documents against Acceptance)</SelectItem>
                                            <SelectItem value="30% deposit, 70% before shipping">30% deposit, 70% before shipping</SelectItem>
                                            <SelectItem value="50% deposit, 50% on delivery">50% deposit, 50% on delivery</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Additional Notes */}
                            <div className="space-y-2">
                                <Label htmlFor="additional_notes">Additional Notes</Label>
                                <Textarea
                                    id="additional_notes"
                                    value={data.additional_notes}
                                    onChange={(e) => setData('additional_notes', e.target.value)}
                                    placeholder="Include warranty, customization options, certifications, etc."
                                    rows={4}
                                />
                            </div>

                            {/* Submit Buttons */}
                            <div className="flex justify-end gap-4 pt-6 border-t">
                                <Link href={route('supplier.responses.show', response.id)}>
                                    <Button variant="outline" type="button">Cancel</Button>
                                </Link>
                                <Button type="submit" disabled={processing}>
                                    <Save className="size-4 mr-2" />
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </DashboardLayout>
    );
}

