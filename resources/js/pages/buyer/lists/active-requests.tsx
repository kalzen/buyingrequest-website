import DashboardLayout from "@/layouts/dashboard-layout"
import { RequestsDataTable } from "@/components/requests-data-table"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';
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

    return (
        <DashboardLayout role="buyer" title="Active Requests" pageTitle="Active Requests">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('buyer.dashboard')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to Dashboard
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Active Requests
                        </h1>
                        <p className="text-muted-foreground">
                            Manage your open sourcing requests and track their progress.
                        </p>
                    </div>
                    <Link href={route('buyer.requests.create')}>
                        <Button>
                            <Plus className="size-4 mr-2" />
                            Create New Request
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-8 px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">{requests.data.length}</div>
                            <div className="text-sm text-muted-foreground">Total Active Requests</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {requests.data.reduce((sum, req) => sum + req.views, 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Views</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {requests.data.filter(req => req.category).length}
                            </div>
                            <div className="text-sm text-muted-foreground">Categorized</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* DataTable */}
            <div className="px-4 lg:px-6">
                <RequestsDataTable data={requests.data} />
            </div>
        </DashboardLayout>
    );
}
