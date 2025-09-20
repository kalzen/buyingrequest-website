import AdminLayout from '@/layouts/admin-layout';
import { usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { update as adminSuppliersUpdate } from '@/routes/admin/suppliers';

interface Supplier {
    id: number;
    company_name: string;
    headline: string | null;
    location: string | null;
    is_verified: boolean;
    is_featured: boolean;
    rating: number;
    response_time_hours: number | null;
    lead_time_days: number | null;
    categories: string[];
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface Pagination<T> {
    data: T[];
}

interface SuppliersProps {
    suppliers: Pagination<Supplier>;
}

type PageProps = SuppliersProps;

export default function AdminSuppliersIndex() {
    const { props } = usePage<PageProps>();

    const updateSupplier = (supplier: Supplier, data: Partial<Supplier>) => {
        router.put(
            adminSuppliersUpdate(supplier.id),
            {
                is_verified: data.is_verified ?? supplier.is_verified,
                is_featured: data.is_featured ?? supplier.is_featured,
                rating: data.rating ?? supplier.rating,
                response_time_hours: data.response_time_hours ?? supplier.response_time_hours,
                lead_time_days: data.lead_time_days ?? supplier.lead_time_days,
            },
            { preserveScroll: true },
        );
    };

    return (
        <AdminLayout title="Suppliers">
            <Card className="border-white/10 bg-neutral-900/70">
                <CardHeader>
                    <CardTitle className="text-sm text-neutral-300">Supplier profiles</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Rating</TableHead>
                                <TableHead>Lead/Response</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {props.suppliers.data.map((supplier) => (
                                <TableRow key={supplier.id}>
                                    <TableCell>
                                        <div className="font-medium text-neutral-200">{supplier.company_name}</div>
                                        <div className="text-xs text-neutral-500">{supplier.location ?? 'Unknown'}</div>
                                        <div className="text-xs text-neutral-500">
                                            Account: {supplier.user.email}
                                        </div>
                                        <div className="mt-1 flex flex-wrap gap-1">
                                            {supplier.categories.map((category) => (
                                                <Badge key={category} variant="secondary" className="bg-neutral-800 text-neutral-200">
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-2 text-sm text-neutral-300">
                                                <Switch
                                                    checked={supplier.is_verified}
                                                    onCheckedChange={(checked) =>
                                                        updateSupplier(supplier, { is_verified: checked })
                                                    }
                                                />
                                                <span>Verified</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-neutral-300">
                                                <Switch
                                                    checked={supplier.is_featured}
                                                    onCheckedChange={(checked) =>
                                                        updateSupplier(supplier, { is_featured: checked })
                                                    }
                                                />
                                                <span>Featured</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-sm text-neutral-300">
                                        <Input
                                            type="number"
                                            defaultValue={supplier.rating}
                                            step={0.1}
                                            min={0}
                                            max={5}
                                            className="w-24 border-white/10 bg-neutral-800 text-neutral-100"
                                            onBlur={(event) =>
                                                updateSupplier(supplier, {
                                                    rating: Number(event.target.value),
                                                })
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="text-xs text-neutral-400">
                                        <div className="flex items-center gap-2">
                                            <Input
                                                type="number"
                                                defaultValue={supplier.lead_time_days ?? ''}
                                                placeholder="Lead days"
                                                className="w-24 border-white/10 bg-neutral-800 text-neutral-100"
                                                onBlur={(event) =>
                                                    updateSupplier(supplier, {
                                                        lead_time_days: event.target.value
                                                            ? Number(event.target.value)
                                                            : null,
                                                    })
                                                }
                                            />
                                            <Input
                                                type="number"
                                                defaultValue={supplier.response_time_hours ?? ''}
                                                placeholder="Response hrs"
                                                className="w-28 border-white/10 bg-neutral-800 text-neutral-100"
                                                onBlur={(event) =>
                                                    updateSupplier(supplier, {
                                                        response_time_hours: event.target.value
                                                            ? Number(event.target.value)
                                                            : null,
                                                    })
                                                }
                                            />
                                        </div>
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
