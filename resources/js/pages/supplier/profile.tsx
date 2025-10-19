import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Save, User, Building, Factory, Globe, Award } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface User {
    name: string;
    email: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
    };
}

export default function SupplierProfile() {
    const { auth } = usePage<PageProps>().props;

    return (
        <DashboardLayout role="supplier" title="Company Profile" pageTitle="Supplier Profile">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('supplier.dashboard')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Company Profile
                </h1>
                <p className="text-muted-foreground">
                    Manage your supplier profile and showcase your capabilities to global buyers.
                </p>
            </div>

            {/* Company Information */}
            <div className="px-4 lg:px-6 max-w-5xl">
                <Card className="shadow-lg mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Building className="size-5 text-primary" />
                                    Company Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form action={route('supplier.profile.update')} method="post" className="space-y-6">
                                    {/* Basic Company Info */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="company_name">Company Name *</Label>
                                            <Input
                                                id="company_name"
                                                name="company_name"
                                                placeholder="ABC Manufacturing Co., Ltd."
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="company_size">Company Size</Label>
                                            <Select name="company_size">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select company size" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1-10">1-10 employees</SelectItem>
                                                    <SelectItem value="11-50">11-50 employees</SelectItem>
                                                    <SelectItem value="51-200">51-200 employees</SelectItem>
                                                    <SelectItem value="201-500">201-500 employees</SelectItem>
                                                    <SelectItem value="501-1000">501-1000 employees</SelectItem>
                                                    <SelectItem value="1000+">1000+ employees</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="established_year">Year Established</Label>
                                            <Input
                                                id="established_year"
                                                name="established_year"
                                                type="number"
                                                placeholder="2010"
                                                min="1800"
                                                max={new Date().getFullYear()}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="business_type">Business Type</Label>
                                            <Select name="business_type">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select business type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="manufacturer">Manufacturer</SelectItem>
                                                    <SelectItem value="trading">Trading Company</SelectItem>
                                                    <SelectItem value="agent">Agent/Distributor</SelectItem>
                                                    <SelectItem value="service">Service Provider</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="headline">Company Headline</Label>
                                        <Input
                                            id="headline"
                                            name="headline"
                                            placeholder="Leading manufacturer of precision industrial components"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="description">Company Description</Label>
                                        <Textarea
                                            id="description"
                                            name="description"
                                            placeholder="Describe your company's capabilities, experience, and unique selling points..."
                                            rows={4}
                                        />
                                    </div>

                                    {/* Contact Information */}
                                    <div className="pt-6 border-t">
                                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <User className="size-5 text-primary" />
                                            Contact Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="contact_name">Contact Person *</Label>
                                                <Input
                                                    id="contact_name"
                                                    name="contact_name"
                                                    placeholder="Sarah Johnson"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="contact_title">Job Title</Label>
                                                <Input
                                                    id="contact_title"
                                                    name="contact_title"
                                                    placeholder="Sales Director"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="email">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    defaultValue={auth.user.email}
                                                    placeholder="contact@company.com"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="phone">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    placeholder="+1 555 987 6543"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="website">Website</Label>
                                                <Input
                                                    id="website"
                                                    name="website"
                                                    type="url"
                                                    placeholder="https://www.company.com"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    name="location"
                                                    placeholder="City, Country"
                                                />
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <Label htmlFor="address">Full Address</Label>
                                            <Textarea
                                                id="address"
                                                name="address"
                                                placeholder="123 Industrial Boulevard, Downtown, City, State, ZIP Code, Country"
                                                rows={3}
                                            />
                                        </div>
                                    </div>

                                    {/* Manufacturing Capabilities */}
                                    <div className="pt-6 border-t">
                                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Factory className="size-5 text-primary" />
                                            Manufacturing Capabilities
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="main_categories">Main Product Categories</Label>
                                                <Select name="main_categories">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select main categories" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="machinery">Machinery & Equipment</SelectItem>
                                                        <SelectItem value="components">Components & Parts</SelectItem>
                                                        <SelectItem value="materials">Raw Materials</SelectItem>
                                                        <SelectItem value="electronics">Electronics</SelectItem>
                                                        <SelectItem value="textiles">Textiles</SelectItem>
                                                        <SelectItem value="packaging">Packaging</SelectItem>
                                                        <SelectItem value="tools">Tools & Hardware</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="production_capacity">Production Capacity</Label>
                                                <Input
                                                    id="production_capacity"
                                                    name="production_capacity"
                                                    placeholder="e.g., 10,000 units/month"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="min_order_quantity">Minimum Order Quantity</Label>
                                                <Input
                                                    id="min_order_quantity"
                                                    name="min_order_quantity"
                                                    placeholder="100 pieces"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="lead_time">Lead Time</Label>
                                                <Input
                                                    id="lead_time"
                                                    name="lead_time"
                                                    placeholder="15-30 days"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Certifications & Quality */}
                                    <div className="pt-6 border-t">
                                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Award className="size-5 text-primary" />
                                            Certifications & Quality
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="certifications">Certifications</Label>
                                                <Textarea
                                                    id="certifications"
                                                    name="certifications"
                                                    placeholder="ISO 9001:2015, ISO 14001, CE, RoHS, etc."
                                                    rows={3}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="quality_control">Quality Control</Label>
                                                <Textarea
                                                    id="quality_control"
                                                    name="quality_control"
                                                    placeholder="Describe your quality control processes..."
                                                    rows={3}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Export Markets */}
                                    <div className="pt-6 border-t">
                                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Globe className="size-5 text-primary" />
                                            Export Markets
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="export_countries">Countries Served</Label>
                                                <Input
                                                    id="export_countries"
                                                    name="export_countries"
                                                    placeholder="USA, Canada, Germany, UK, Australia"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="payment_terms">Payment Terms</Label>
                                                <Select name="payment_terms">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select payment terms" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="T/T">T/T (Telegraphic Transfer)</SelectItem>
                                                        <SelectItem value="L/C">L/C (Letter of Credit)</SelectItem>
                                                        <SelectItem value="D/P">D/P (Documents against Payment)</SelectItem>
                                                        <SelectItem value="D/A">D/A (Documents against Acceptance)</SelectItem>
                                                        <SelectItem value="PayPal">PayPal</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end gap-4 pt-6 border-t">
                                        <Link href={route('supplier.dashboard')}>
                                            <Button variant="outline">Cancel</Button>
                                        </Link>
                                        <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                            <Save className="size-4 mr-2" />
                                            Save Profile
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
            </div>
        </DashboardLayout>
    );
}
