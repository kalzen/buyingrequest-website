import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { route } from 'ziggy-js';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Save, User, Mail, Phone, MapPin, Building } from 'lucide-react';
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

export default function BuyerProfile() {
    const { auth } = usePage<PageProps>().props;

    return (
        <>
            <Head title="Buyer Profile" />
            
            <div className="min-h-screen bg-[#f5f7fb]">
                {/* Header */}
                <header className="border-b border-[#d6e0f5] bg-white/90 backdrop-blur">
                    <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-4 py-4">
                        <Link href={route('home')} className="flex items-center gap-3 text-primary">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
                                II
                            </span>
                            <div className="leading-tight">
                                <p className="text-lg font-semibold text-foreground">INDUSTRIAL HUB</p>
                                <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">
                                    Connect. Source. Grow.
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                            <Link 
                                href={route('buyer.dashboard')} 
                                className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                            >
                                Back to Dashboard
                            </Link>
                        </nav>

                        <div className="text-sm text-slate-600 font-medium">
                            Hi, {auth.user.name}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="bg-gradient-to-b from-white via-[#f0f4ff] to-[#f5f7fb]">
                    <div className="mx-auto w-full max-w-4xl px-4 py-12">
                        {/* Header */}
                        <div className="mb-8">
                            <Link href={route('buyer.dashboard')} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary mb-4">
                                <ArrowLeft className="size-4" />
                                Back to Dashboard
                            </Link>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                Profile Settings
                            </h1>
                            <p className="text-slate-600">
                                Manage your buyer profile and account information.
                            </p>
                        </div>

                        {/* Profile Form */}
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="size-5 text-primary" />
                                    Personal Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <form action={route('buyer.profile.update')} method="post" className="space-y-6">
                                    {/* Basic Information */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                defaultValue={auth.user.name}
                                                placeholder="John Smith"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                defaultValue={auth.user.email}
                                                placeholder="john.smith@company.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder="+1 555 123 4567"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="job_title">Job Title</Label>
                                            <Input
                                                id="job_title"
                                                name="job_title"
                                                placeholder="Procurement Manager"
                                            />
                                        </div>
                                    </div>

                                    {/* Company Information */}
                                    <div className="pt-6 border-t">
                                        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                                            <Building className="size-5 text-primary" />
                                            Company Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="company_name">Company Name</Label>
                                                <Input
                                                    id="company_name"
                                                    name="company_name"
                                                    placeholder="ABC Manufacturing Ltd."
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

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="industry">Industry</Label>
                                                <Select name="industry">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select industry" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                                        <SelectItem value="automotive">Automotive</SelectItem>
                                                        <SelectItem value="electronics">Electronics</SelectItem>
                                                        <SelectItem value="textiles">Textiles</SelectItem>
                                                        <SelectItem value="construction">Construction</SelectItem>
                                                        <SelectItem value="food">Food & Beverage</SelectItem>
                                                        <SelectItem value="pharmaceuticals">Pharmaceuticals</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="country">Country</Label>
                                                <Select name="country">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select country" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="US">United States</SelectItem>
                                                        <SelectItem value="CA">Canada</SelectItem>
                                                        <SelectItem value="GB">United Kingdom</SelectItem>
                                                        <SelectItem value="DE">Germany</SelectItem>
                                                        <SelectItem value="FR">France</SelectItem>
                                                        <SelectItem value="JP">Japan</SelectItem>
                                                        <SelectItem value="AU">Australia</SelectItem>
                                                        <SelectItem value="SG">Singapore</SelectItem>
                                                        <SelectItem value="other">Other</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <Label htmlFor="company_address">Company Address</Label>
                                            <Textarea
                                                id="company_address"
                                                name="company_address"
                                                placeholder="123 Business Street, City, State, ZIP Code"
                                                rows={3}
                                            />
                                        </div>
                                    </div>

                                    {/* Sourcing Preferences */}
                                    <div className="pt-6 border-t">
                                        <h3 className="text-lg font-semibold text-foreground mb-4">
                                            Sourcing Preferences
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="preferred_currency">Preferred Currency</Label>
                                                <Select name="preferred_currency" defaultValue="USD">
                                                    <SelectTrigger>
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
                                            <div className="space-y-2">
                                                <Label htmlFor="annual_volume">Annual Sourcing Volume</Label>
                                                <Select name="annual_volume">
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select volume range" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="under-100k">Under $100,000</SelectItem>
                                                        <SelectItem value="100k-500k">$100,000 - $500,000</SelectItem>
                                                        <SelectItem value="500k-1m">$500,000 - $1,000,000</SelectItem>
                                                        <SelectItem value="1m-5m">$1,000,000 - $5,000,000</SelectItem>
                                                        <SelectItem value="5m-10m">$5,000,000 - $10,000,000</SelectItem>
                                                        <SelectItem value="over-10m">Over $10,000,000</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>

                                        <div className="mt-6">
                                            <Label htmlFor="sourcing_notes">Additional Notes</Label>
                                            <Textarea
                                                id="sourcing_notes"
                                                name="sourcing_notes"
                                                placeholder="Any specific requirements, certifications needed, or other sourcing preferences..."
                                                rows={4}
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <div className="flex justify-end gap-4 pt-6 border-t">
                                        <Link href={route('buyer.dashboard')}>
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
                </main>

                {/* Footer */}
                <footer className="border-t border-[#d6e0f5] bg-white">
                    <div className="mx-auto w-full max-w-7xl px-4 py-8">
                        <div className="flex items-center justify-center space-x-8">
                            <Link 
                                href={route('home')} 
                                className="text-sm font-medium text-slate-600 transition hover:text-primary"
                            >
                                About Us
                            </Link>
                            <Link 
                                href={route('home')} 
                                className="text-sm font-medium text-slate-600 transition hover:text-primary"
                            >
                                Pricing
                            </Link>
                            <Link 
                                href={route('home')} 
                                className="text-sm font-medium text-slate-600 transition hover:text-primary"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
