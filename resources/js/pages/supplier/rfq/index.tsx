import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Search, MapPin, DollarSign, Calendar, ArrowRight, Filter } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState } from 'react';

interface BuyerRequest {
    id: number;
    title: string;
    slug: string;
    summary: string;
    budget_min: number | null;
    budget_max: number | null;
    currency: string;
    preferred_location: string | null;
    status: string;
    created_at: string;
    category?: {
        name: string;
    };
}

interface PageProps extends Record<string, unknown> {
    rfqs: {
        data: BuyerRequest[];
        links: any[];
        meta: any;
    };
}

export default function RfqOpportunities() {
    const { rfqs } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');

    const filteredRfqs = searchTerm
        ? rfqs.data.filter(rfq => 
            rfq.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            rfq.summary.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : rfqs.data;

    const getBudgetRange = (rfq: BuyerRequest) => {
        if (!rfq.budget_min && !rfq.budget_max) return 'Budget not specified';
        if (rfq.budget_min && rfq.budget_max) {
            return `${rfq.currency} ${rfq.budget_min.toLocaleString()} - ${rfq.budget_max.toLocaleString()}`;
        }
        if (rfq.budget_min) {
            return `${rfq.currency} ${rfq.budget_min.toLocaleString()}+`;
        }
        return `Up to ${rfq.currency} ${rfq.budget_max?.toLocaleString()}`;
    };

    return (
        <DashboardLayout role="supplier" title="RFQ Opportunities" pageTitle="RFQ Opportunities">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    RFQ Opportunities
                </h1>
                <p className="text-muted-foreground">
                    Browse and respond to requests for quotation from verified buyers.
                </p>
            </div>

            {/* Search & Filter */}
            <div className="mb-6 px-4 lg:px-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search RFQs by title or description..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Button variant="outline">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-8 px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">{rfqs.data.length}</div>
                            <div className="text-sm text-muted-foreground">Available RFQs</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {filteredRfqs.length}
                            </div>
                            <div className="text-sm text-muted-foreground">Matching Results</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {rfqs.data.filter(r => r.category).length}
                            </div>
                            <div className="text-sm text-muted-foreground">Categorized</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* RFQ List */}
            <div className="px-4 lg:px-6">
                {filteredRfqs.length > 0 ? (
                    <div className="space-y-4">
                        {filteredRfqs.map((rfq) => (
                            <Card key={rfq.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <CardTitle className="text-xl">{rfq.title}</CardTitle>
                                                <Badge variant="outline">New</Badge>
                                                {rfq.category && (
                                                    <Badge variant="secondary">{rfq.category.name}</Badge>
                                                )}
                                            </div>
                                            <CardDescription className="text-base">
                                                {rfq.summary}
                                            </CardDescription>
                                        </div>
                                        <Link href={route('supplier.rfqs.show', rfq.id)}>
                                            <Button>
                                                View & Respond
                                                <ArrowRight className="ml-2 h-4 w-4" />
                                            </Button>
                                        </Link>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                                            <span>{getBudgetRange(rfq)}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <span>{rfq.preferred_location || 'Global'}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>Posted {new Date(rfq.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">No RFQs Found</h3>
                            <p className="text-muted-foreground">
                                {searchTerm ? 'Try adjusting your search criteria.' : 'No RFQ opportunities available at the moment.'}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}

