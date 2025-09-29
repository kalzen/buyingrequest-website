import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, Search, Users, Building, CheckCircle2 } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface User {
    name: string;
    email: string;
}

interface DashboardStats {
    activeRequests: number;
    supplierContacts: number;
    completedOrders: number;
}

interface RecentRequest {
    id: number;
    title: string;
    status: string;
    created_at: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
    };
    stats: DashboardStats;
    recentRequests: RecentRequest[];
}

export default function BuyerDashboard() {
    const { auth, stats, recentRequests } = usePage<PageProps>().props;
    return (
        <>
            <Head title="Buyer Dashboard" />
            
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
                                href={route('buyer.profile.edit')} 
                                className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                            >
                                My Account
                                <ArrowRight className="size-3 translate-x-0 opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100" />
                            </Link>
                            <Link 
                                href={route('buyer.dashboard')} 
                                className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                            >
                                My Sourcing Dashboard
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
                                My Sourcing Dashboard
                            </h1>
                            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                                Manage your sourcing activities, track requests, and connect with verified suppliers worldwide.
                            </p>
                        </div>

                        {/* Main Action Card */}
                        <div className="max-w-2xl mx-auto mb-12">
                            <Card className="border-2 border-primary/20 shadow-xl">
                                <CardContent className="p-8 text-center">
                                    <div className="mb-6">
                                        <Search className="size-16 text-primary mx-auto mb-4" />
                                        <h2 className="text-2xl font-bold text-foreground mb-2">
                                            Post a Request for Quote (RFQ)
                                        </h2>
                                        <p className="text-slate-600">
                                            Get quotes from verified suppliers for your sourcing needs
                                        </p>
                                    </div>
                                    <Link href={route('buyer.requests.create')}>
                                        <Button 
                                            size="lg"
                                            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
                                        >
                                            Create New RFQ
                                            <ArrowRight className="size-4 ml-2" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                            <Link href={route('buyer.active-requests')}>
                                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardContent className="p-6">
                                        <Users className="size-8 text-primary mx-auto mb-3" />
                                        <div className="text-2xl font-bold text-foreground mb-1">{stats.activeRequests}</div>
                                        <div className="text-sm text-slate-600">Active Requests</div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href={route('buyer.supplier-contacts')}>
                                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardContent className="p-6">
                                        <Building className="size-8 text-primary mx-auto mb-3" />
                                        <div className="text-2xl font-bold text-foreground mb-1">{stats.supplierContacts}</div>
                                        <div className="text-sm text-slate-600">Suppliers Contacted</div>
                                    </CardContent>
                                </Card>
                            </Link>
                            <Link href={route('buyer.completed-orders')}>
                                <Card className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                                    <CardContent className="p-6">
                                        <CheckCircle2 className="size-8 text-primary mx-auto mb-3" />
                                        <div className="text-2xl font-bold text-foreground mb-1">{stats.completedOrders}</div>
                                        <div className="text-sm text-slate-600">Completed Orders</div>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>

                        {/* Recent Requests */}
                        {recentRequests.length > 0 && (
                            <div className="max-w-4xl mx-auto mb-12">
                                <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                                    Recent Requests
                                </h3>
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            {recentRequests.map((request) => (
                                                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                                    <div>
                                                        <h4 className="font-semibold text-foreground">{request.title}</h4>
                                                        <p className="text-sm text-slate-600">Created: {request.created_at}</p>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <span className={`px-2 py-1 text-xs rounded-full ${
                                                            request.status === 'open' 
                                                                ? 'bg-green-100 text-green-800' 
                                                                : 'bg-gray-100 text-gray-800'
                                                        }`}>
                                                            {request.status}
                                                        </span>
                                                        <Link href={route('requests.show', request.id)}>
                                                            <Button size="sm" variant="outline">View</Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Quick Actions */}
                        <div className="max-w-4xl mx-auto">
                            <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Link href={route('buyer.requests.create')}>
                                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <Search className="size-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-foreground">Browse Suppliers</h4>
                                                    <p className="text-sm text-slate-600">Find verified suppliers</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                                <Link href={route('buyer.profile.edit')}>
                                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                                        <CardContent className="p-6">
                                            <div className="flex items-center gap-4">
                                                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                                    <Users className="size-6" />
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold text-foreground">Update Profile</h4>
                                                    <p className="text-sm text-slate-600">Manage your account</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
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