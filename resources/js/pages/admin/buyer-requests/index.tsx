import AdminLayout from '@/layouts/admin-layout';
import { usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { update as adminBuyerRequestsUpdate, destroy as adminBuyerRequestsDestroy } from '@/routes/admin/buyer-requests';
import { Button } from '@/components/ui/button';

interface BuyerRequest {
    id: number;
    title: string;
    status: string;
    budget_min: number | null;
    budget_max: number | null;
    quantity: number | null;
    unit: string | null;
    preferred_location: string | null;
    lead_valid_until: string | null;
    created_at: string | null;
    buyer: {
        id: number;
        name: string;
        email: string;
    };
    category: string | null;
}

interface Pagination<T> {
    data: T[];
}

interface BuyerRequestsProps {
    requests: Pagination<BuyerRequest>;
}

type PageProps = BuyerRequestsProps;

const STATUS_OPTIONS = ['open', 'reviewing', 'closed'];

export default function AdminBuyerRequestsIndex() {
    const { props } = usePage<PageProps>();

    const updateStatus = (request: BuyerRequest, status: string) => {
        router.put(adminBuyerRequestsUpdate(request.id), { status }, { preserveScroll: true });
    };

    const removeRequest = (request: BuyerRequest) => {
        router.delete(adminBuyerRequestsDestroy(request.id), {
            preserveScroll: true,
        });
    };

    return (
        <AdminLayout title="Buyer requests">
            <Card className="border-white/10 bg-neutral-900/70">
                <CardHeader>
                    <CardTitle className="text-sm text-neutral-300">Open negotiations</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Buyer</TableHead>
                                <TableHead>Budget</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props.requests.data.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell>
                                        <div className="font-medium text-neutral-200">{request.title}</div>
                                        <div className="text-xs text-neutral-500">
                                            {request.category ?? 'Uncategorized'} • {request.lead_valid_until ?? 'No deadline'}
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-neutral-400">
                                        <div>{request.buyer.name}</div>
                                        <div className="text-xs text-neutral-500">{request.buyer.email}</div>
                                    </TableCell>
                                    <TableCell className="text-sm text-neutral-400">
                                        {request.budget_min && request.budget_max
                                            ? `$${request.budget_min.toLocaleString()} - $${request.budget_max.toLocaleString()}`
                                            : 'Negotiable'}
                                    </TableCell>
                                    <TableCell>
                                        <Select
                                            defaultValue={request.status}
                                            onValueChange={(value) => updateStatus(request, value)}
                                        >
                                            <SelectTrigger className="w-[140px] border-white/10 bg-neutral-800 text-neutral-100">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent className="border-white/10 bg-neutral-900 text-neutral-100">
                                                {STATUS_OPTIONS.map((option) => (
                                                    <SelectItem key={option} value={option}>
                                                        {option}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell className="flex gap-2">
                                        <Badge variant="secondary" className="bg-neutral-800 text-neutral-200">
                                            {request.quantity ? `${request.quantity} ${request.unit ?? ''}` : 'Flexible'}
                                        </Badge>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            className="text-red-300 hover:bg-red-500/10"
                                            onClick={() => removeRequest(request)}
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </AdminLayout>
    );
}
