import DashboardLayout from "@/layouts/dashboard-layout"
import { SupplierOrdersDataTable } from "@/components/supplier-orders-data-table"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Package } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Buyer {
    name: string;
    email: string;
}

interface BuyerRequest {
    id: number;
    title: string;
}

interface SupplierOrder {
    id: number;
    order_number: string;
    product_name: string;
    product_description: string;
    quantity: number;
    unit: string;
    unit_price: number;
    total_amount: number;
    currency: string;
    status: string;
    expected_delivery_date: string | null;
    actual_delivery_date: string | null;
    created_at: string;
    buyer: Buyer;
    buyer_request: BuyerRequest | null;
}

interface PageProps extends Record<string, unknown> {
    orders: {
        data: SupplierOrder[];
        links: any[];
        meta: any;
    };
}

export default function SupplierOrders() {
    const { orders } = usePage<PageProps>().props;

    const getTotalValue = () => {
        return orders.data.reduce((sum, order) => sum + order.total_amount, 0);
    };

    const getAverageOrderValue = () => {
        return orders.data.length > 0 ? getTotalValue() / orders.data.length : 0;
    };

    return (
        <DashboardLayout role="supplier" title="Orders" pageTitle="Supplier Orders">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Orders
                </h1>
                <p className="text-muted-foreground">
                    Manage and track your orders from buyers.
                </p>
            </div>

            {/* Stats */}
            <div className="mb-8 px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">{orders.data.length}</div>
                            <div className="text-sm text-muted-foreground">Total Orders</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {orders.data.length > 0 ? orders.data[0].currency : 'USD'} {getTotalValue().toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Revenue</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {orders.data.filter(o => o.status === 'completed').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Completed</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {orders.data.filter(o => o.status === 'processing' || o.status === 'shipped').length}
                            </div>
                            <div className="text-sm text-muted-foreground">In Progress</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* DataTable */}
            <div className="px-4 lg:px-6">
                {orders.data.length > 0 ? (
                    <SupplierOrdersDataTable data={orders.data} />
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold mb-2">No Orders Yet</h3>
                            <p className="text-muted-foreground mb-4">
                                You haven't received any orders yet. Respond to RFQs to start getting orders.
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

