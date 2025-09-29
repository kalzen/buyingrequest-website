import LandingLayout from '@/layouts/landing-layout';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, router } from "@inertiajs/react";
import { route } from "ziggy-js";
import { FormEventHandler } from "react";

interface PageProps extends Record<string, unknown> {}

export default function CreateRequest({}: PageProps) {
    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        router.post(route('buyer.requests.store'), formData);
    };

    return (
        <LandingLayout>
            <section className="mx-auto w-full max-w-5xl px-4 py-16">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Create New RFQ Request</h1>
                    <p className="text-slate-600">
                        Fill in all the required information to create your Request for Quote (RFQ)
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Buyer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-slate-900">Buyer Information</CardTitle>
                            <p className="text-sm text-slate-600">Your contact details (automatically filled from your profile)</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="representative_name">Representative Name</Label>
                                    <Input
                                        id="representative_name"
                                        name="representative_name"
                                        placeholder="Your full name"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone_number">Phone Number</Label>
                                    <Input
                                        id="phone_number"
                                        name="phone_number"
                                        type="tel"
                                        placeholder="+1 555 123 4567"
                                        required
                                    />
                                </div>
                            </div>
                            </CardContent>
                        </Card>

                    {/* Goods Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-slate-900">Goods Details</CardTitle>
                            <p className="text-sm text-slate-600">Detailed information about the products you need</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Product Name *</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="Enter product name"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="hs_code">HS Code</Label>
                                    <Input
                                        id="hs_code"
                                        name="hs_code"
                                        placeholder="e.g., 1234567890"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="quantity">Quantity</Label>
                                    <Input
                                        id="quantity"
                                        name="quantity"
                                        type="number"
                                        min="1"
                                        placeholder="1000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="unit">Unit of Measure</Label>
                                    <Select name="unit">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="pieces">Pieces</SelectItem>
                                            <SelectItem value="kg">Kilograms</SelectItem>
                                            <SelectItem value="tons">Tons</SelectItem>
                                            <SelectItem value="meters">Meters</SelectItem>
                                            <SelectItem value="liters">Liters</SelectItem>
                                            <SelectItem value="sets">Sets</SelectItem>
                                            <SelectItem value="pairs">Pairs</SelectItem>
                                            <SelectItem value="boxes">Boxes</SelectItem>
                                            <SelectItem value="pallets">Pallets</SelectItem>
                                            <SelectItem value="containers">Containers</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="quality_requirements">Quality Requirements</Label>
                                <Textarea
                                    id="quality_requirements"
                                    name="quality_requirements"
                                    placeholder="Describe quality standards, certifications, or specifications required..."
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="packaging_specification">Packaging Specification</Label>
                                <Textarea
                                    id="packaging_specification"
                                    name="packaging_specification"
                                    placeholder="Describe packaging requirements, materials, labeling, etc..."
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Terms of Trade */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-slate-900">Terms of Trade</CardTitle>
                            <p className="text-sm text-slate-600">Commercial terms and delivery conditions</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="terms_of_delivery">Terms of Delivery</Label>
                                    <Select name="terms_of_delivery">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select delivery terms" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="FOB">FOB (Free On Board)</SelectItem>
                                            <SelectItem value="CIF">CIF (Cost, Insurance, Freight)</SelectItem>
                                            <SelectItem value="EXW">EXW (Ex Works)</SelectItem>
                                            <SelectItem value="DAP">DAP (Delivered At Place)</SelectItem>
                                            <SelectItem value="DDP">DDP (Delivered Duty Paid)</SelectItem>
                                            <SelectItem value="CFR">CFR (Cost and Freight)</SelectItem>
                                            <SelectItem value="FAS">FAS (Free Alongside Ship)</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="port_of_discharge">Port of Discharge (POD)</Label>
                                    <Input
                                        id="port_of_discharge"
                                        name="port_of_discharge"
                                        placeholder="e.g., Port of Los Angeles"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="delivery_time">Delivery Time</Label>
                                    <Input
                                        id="delivery_time"
                                        name="delivery_time"
                                        placeholder="e.g., 30-45 days after order confirmation"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="method_of_transport">Method of Transport</Label>
                                    <Select name="method_of_transport">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select transport method" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sea_freight">Sea Freight</SelectItem>
                                            <SelectItem value="air_freight">Air Freight</SelectItem>
                                            <SelectItem value="road_transport">Road Transport</SelectItem>
                                            <SelectItem value="rail_transport">Rail Transport</SelectItem>
                                            <SelectItem value="multimodal">Multimodal</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="payment_terms">Payment Terms</Label>
                                <Select name="payment_terms">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select payment terms" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="T/T_advance">T/T Advance</SelectItem>
                                        <SelectItem value="T/T_30_days">T/T 30 days</SelectItem>
                                        <SelectItem value="L/C_at_sight">L/C at sight</SelectItem>
                                        <SelectItem value="L/C_30_days">L/C 30 days</SelectItem>
                                        <SelectItem value="L/C_60_days">L/C 60 days</SelectItem>
                                        <SelectItem value="D/P">D/P (Documents against Payment)</SelectItem>
                                        <SelectItem value="D/A">D/A (Documents against Acceptance)</SelectItem>
                                        <SelectItem value="O/A">O/A (Open Account)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Budget & Location */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-slate-900">Budget & Location</CardTitle>
                            <p className="text-sm text-slate-600">Budget range and preferred delivery location</p>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="budget_min">Minimum Budget</Label>
                                    <Input
                                        id="budget_min"
                                        name="budget_min"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="10000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="budget_max">Maximum Budget</Label>
                                    <Input
                                        id="budget_max"
                                        name="budget_max"
                                        type="number"
                                        min="0"
                                        step="0.01"
                                        placeholder="50000"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency *</Label>
                                    <Select name="currency" defaultValue="USD">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD">USD</SelectItem>
                                            <SelectItem value="EUR">EUR</SelectItem>
                                            <SelectItem value="GBP">GBP</SelectItem>
                                            <SelectItem value="JPY">JPY</SelectItem>
                                            <SelectItem value="CNY">CNY</SelectItem>
                                            <SelectItem value="VND">VND</SelectItem>
                                            <SelectItem value="THB">THB</SelectItem>
                                            <SelectItem value="SGD">SGD</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="preferred_location">Preferred Location</Label>
                                    <Input
                                        id="preferred_location"
                                        name="preferred_location"
                                        placeholder="e.g., United States, Europe, Asia"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lead_valid_until">Lead Valid Until</Label>
                                    <Input
                                        id="lead_valid_until"
                                        name="lead_valid_until"
                                        type="date"
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="shipping_terms">Shipping Terms</Label>
                                <Textarea
                                    id="shipping_terms"
                                    name="shipping_terms"
                                    placeholder="Additional shipping requirements, insurance, handling instructions..."
                                    rows={3}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Notes */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-slate-900">Notes</CardTitle>
                            <p className="text-sm text-slate-600">Additional information or special requirements</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="notes">Additional Notes</Label>
                                <Textarea
                                id="notes"
                                    name="notes"
                                    placeholder="Any additional information, special requirements, or clarifications..."
                                    rows={4}
                                />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-xl font-semibold text-slate-900">Request Summary</CardTitle>
                            <p className="text-sm text-slate-600">Brief summary of your RFQ request</p>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="summary">Summary *</Label>
                                <Textarea
                                    id="summary"
                                    name="summary"
                                    placeholder="Provide a brief summary of your request..."
                                    rows={3}
                                    required
                                />
        </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-6">
                        <Link href={route('buyer.dashboard')}>
                            <Button variant="outline" type="button">
                                <ArrowLeft className="size-4 mr-2" />
                                Cancel
                            </Button>
                        </Link>
                        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                            Create RFQ Request
                            <ArrowRight className="size-4 ml-2" />
                        </Button>
                    </div>
                </form>
            </section>
        </LandingLayout>
    );
}