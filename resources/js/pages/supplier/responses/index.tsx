import DashboardLayout from "@/layouts/dashboard-layout"
import { ResponsesDataTable } from "@/components/responses-data-table"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface BuyerRequest {
    id: number;
    title: string;
    user: {
        name: string;
    };
}

interface SupplierResponse {
    id: number;
    message: string;
    quoted_price: number | null;
    currency: string;
    delivery_time_days: number | null;
    payment_terms: string | null;
    status: string;
    responded_at: string;
    created_at: string;
    buyer_request: BuyerRequest;
}

interface PageProps extends Record<string, unknown> {
    responses: {
        data: SupplierResponse[];
        links: any[];
        meta: any;
    };
}

export default function MyResponses() {
    const { responses } = usePage<PageProps>().props;

    return (
        <DashboardLayout role="supplier" title="My Responses" pageTitle="My Responses">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    My Responses
                </h1>
                <p className="text-muted-foreground">
                    Track your RFQ responses and their status.
                </p>
            </div>

            {/* Stats */}
            <div className="mb-8 px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">{responses.data.length}</div>
                            <div className="text-sm text-muted-foreground">Total Responses</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {responses.data.filter(r => r.status === 'pending').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Pending</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {responses.data.filter(r => r.status === 'accepted').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Accepted</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {responses.data.filter(r => r.status === 'negotiating').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Negotiating</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* DataTable */}
            <div className="px-4 lg:px-6">
                {responses.data.length > 0 ? (
                    <ResponsesDataTable data={responses.data} />
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">No Responses Yet</h3>
                            <p className="text-muted-foreground mb-4">
                                You haven't responded to any RFQs yet. Browse available opportunities and submit your first quote.
                            </p>
                            <Link href={route('supplier.rfqs')}>
                                <Button>
                                    Browse RFQ Opportunities
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}

