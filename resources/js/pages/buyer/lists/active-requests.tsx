import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { route } from 'ziggy-js';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Eye, Calendar, MapPin, DollarSign, Plus } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface ActiveRequest {
    id: number;
    title: string;
    slug: string;
    summary: string;
    budget_min: number | null;
    budget_max: number | null;
    currency: string;
    preferred_location: string | null;
    lead_valid_until: string | null;
    status: string;
    views: number;
    created_at: string;
    category: string | null;
}

interface PageProps extends Record<string, unknown> {
    requests: {
        data: ActiveRequest[];
        links: any[];
        meta: any;
    };
}

export default function ActiveRequests() {
    const { requests } = usePage<PageProps>().props;

    const getBudgetRange = (request: ActiveRequest) => {
        if (!request.budget_min && !request.budget_max) return 'Budget not specified';
        if (request.budget_min && request.budget_max) {
            return `${request.currency} ${request.budget_min.toLocaleString()} - ${request.budget_max.toLocaleString()}`;
        }
        if (request.budget_min) {
            return `${request.currency} ${request.budget_min.toLocaleString()}+`;
        }
        return `Up to ${request.currency} ${request.budget_max?.toLocaleString()}`;
    };

    return (
        <>
            <Head title="Active Requests" />
            
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
                            Active Requests
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="bg-gradient-to-b from-white via-[#f0f4ff] to-[#f5f7fb]">
                    <div className="mx-auto w-full max-w-7xl px-4 py-12">
                        {/* Header */}
                        <div className="mb-8">
                            <Link href={route('buyer.dashboard')} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary mb-4">
                                <ArrowLeft className="size-4" />
                                Back to Dashboard
                            </Link>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold text-foreground mb-2">
                                        Active Requests
                                    </h1>
                                    <p className="text-slate-600">
                                        Manage your open sourcing requests and track their progress.
                                    </p>
                                </div>
                                <Link href={route('buyer.requests.create')}>
                                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                        <Plus className="size-4 mr-2" />
                                        Create New Request
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">{requests.data.length}</div>
                                        <div className="text-sm text-slate-600">Total Active Requests</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {requests.data.reduce((sum, req) => sum + req.views, 0)}
                                        </div>
                                        <div className="text-sm text-slate-600">Total Views</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {requests.data.filter(req => req.category).length}
                                        </div>
                                        <div className="text-sm text-slate-600">Categorized</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Requests List */}
                        {requests.data.length > 0 ? (
                            <div className="space-y-6">
                                {requests.data.map((request) => (
                                    <Card key={request.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-semibold text-foreground">{request.title}</h3>
                                                        <Badge variant={request.status === 'open' ? 'default' : 'secondary'}>
                                                            {request.status}
                                                        </Badge>
                                                    </div>
                                                    <p className="text-slate-600 mb-3">{request.summary}</p>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">{getBudgetRange(request)}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">{request.preferred_location || 'Global'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">Created: {request.created_at}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Eye className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">{request.views} views</span>
                                                        </div>
                                                    </div>

                                                    {request.category && (
                                                        <div className="mt-3">
                                                            <Badge variant="outline">{request.category}</Badge>
                                                        </div>
                                                    )}
                                                </div>
                                                
                                                <div className="flex gap-2 ml-4">
                                                    <Link href={route('requests.show', request.slug)}>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="size-4 mr-2" />
                                                            View
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>

                                            {request.lead_valid_until && (
                                                <div className="pt-4 border-t">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm text-slate-600">Valid until:</span>
                                                        <span className="text-sm font-medium text-foreground">{request.lead_valid_until}</span>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <div className="text-slate-500 mb-4">
                                        <Eye className="size-16 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No Active Requests</h3>
                                        <p>You don't have any active requests yet. Create your first sourcing request to get started.</p>
                                    </div>
                                    <Link href={route('buyer.requests.create')}>
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                            <Plus className="size-4 mr-2" />
                                            Create Your First Request
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
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
