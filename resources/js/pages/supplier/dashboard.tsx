import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Building, Users, TrendingUp, CheckCircle2, Eye } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface User {
    name: string;
    email: string;
}

interface SupplierStats {
    profileViews: number;
    activeRfqs: number;
    responseRate: number;
    completedOrders: number;
}

interface RecentRfq {
    id: number;
    title: string;
    summary: string;
    budget_min: number | null;
    budget_max: number | null;
    currency: string;
    preferred_location: string | null;
    lead_valid_until: string | null;
    created_at: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
    };
    stats: SupplierStats;
    recentRfqs: RecentRfq[];
}

export default function SupplierDashboard() {
    const { auth, stats, recentRfqs } = usePage<PageProps>().props;
    return (
        <>
            <Head title="Supplier Dashboard" />
            
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
                                href={route('supplier.profile.edit')} 
                                className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                            >
                                My Profile
                                <ArrowRight className="size-3 translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                            </Link>
                            <Link 
                                href={route('supplier.dashboard')} 
                                className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                            >
                                My Supplier Dashboard
                                <ArrowRight className="size-3 translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                            </Link>
                        </nav>

                        <div className="text-sm text-slate-600 font-medium">
                            Hi, {auth.user.name}
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="bg-gradient-to-b from-white via-[#f0f4ff] to-[#f5f7fb]">
                    <div className="mx-auto w-full max-w-7xl px-4 py-12">
                        {/* Hero Section */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-bold text-foreground mb-4">
                                Supplier Dashboard
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Manage your company profile, respond to RFQs, and grow your business with global buyers.
                            </p>
                        </div>

                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <Eye className="size-8 text-primary mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-foreground mb-1">{stats.profileViews.toLocaleString()}</div>
                                    <div className="text-sm text-slate-600">Profile Views</div>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <Users className="size-8 text-primary mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-foreground mb-1">{stats.activeRfqs}</div>
                                    <div className="text-sm text-slate-600">Active RFQs</div>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <TrendingUp className="size-8 text-primary mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-foreground mb-1">{stats.responseRate}%</div>
                                    <div className="text-sm text-slate-600">Response Rate</div>
                                </CardContent>
                            </Card>
                            <Card className="text-center">
                                <CardContent className="p-6">
                                    <CheckCircle2 className="size-8 text-primary mx-auto mb-3" />
                                    <div className="text-2xl font-bold text-foreground mb-1">{stats.completedOrders}</div>
                                    <div className="text-sm text-slate-600">Completed Orders</div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Recent RFQ Opportunities */}
                            <div className="lg:col-span-2">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2">
                                            <Building className="size-5 text-primary" />
                                            Recent RFQ Opportunities
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentRfqs.map((rfq) => (
                                                <div key={rfq.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold text-foreground mb-1">
                                                                {rfq.title}
                                                            </h4>
                                                            <p className="text-sm text-slate-600 mb-2">
                                                                {rfq.summary}
                                                            </p>
                                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                                <span>Budget: {rfq.budget_min ? `${rfq.currency} ${rfq.budget_min.toLocaleString()}` : 'Not specified'} 
                                                                       {rfq.budget_max ? ` - ${rfq.currency} ${rfq.budget_max.toLocaleString()}` : ''}</span>
                                                                <span>Location: {rfq.preferred_location || 'Global'}</span>
                                                                {rfq.lead_valid_until && (
                                                                    <span>Deadline: {rfq.lead_valid_until}</span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <Button size="sm" variant="outline">
                                                            Respond
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4">
                                            <Link href={route('requests.create')}>
                                                <Button variant="outline" className="w-full">
                                                    View All RFQ Opportunities
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Quick Actions */}
                            <div>
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Quick Actions</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <Link href={route('supplier.profile.edit')} className="block">
                                                <Button className="w-full justify-start" variant="outline">
                                                    <Users className="size-4 mr-2" />
                                                    Update Company Profile
                                                </Button>
                                            </Link>
                                            <Link href={route('requests.create')} className="block">
                                                <Button className="w-full justify-start" variant="outline">
                                                    <Eye className="size-4 mr-2" />
                                                    Browse RFQ Opportunities
                                                </Button>
                                            </Link>
                                            <Link href={route('suppliers.index')} className="block">
                                                <Button className="w-full justify-start" variant="outline">
                                                    <Building className="size-4 mr-2" />
                                                    View Suppliers Directory
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Performance Summary */}
                                <Card className="mt-6">
                                    <CardHeader>
                                        <CardTitle>Performance Summary</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Profile Completeness</span>
                                                    <span>85%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-primary h-2 rounded-full" style={{width: '85%'}}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Response Rate</span>
                                                    <span>89%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-green-500 h-2 rounded-full" style={{width: '89%'}}></div>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="flex justify-between text-sm mb-1">
                                                    <span>Customer Satisfaction</span>
                                                    <span>4.8/5</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div className="bg-yellow-500 h-2 rounded-full" style={{width: '96%'}}></div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
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