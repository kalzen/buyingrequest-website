import DashboardLayout from "@/layouts/dashboard-layout"
import { OrdersDataTable } from "@/components/orders-data-table"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Package, Plus } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Supplier {
    name: string;
    email: string;
}

interface BuyerRequest {
    id: number;
    title: string;
}

interface CompletedOrder {
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
    supplier: Supplier;
    buyer_request: BuyerRequest | null;
}

interface PageProps extends Record<string, unknown> {
    orders: {
        data: CompletedOrder[];
        links: any[];
        meta: any;
    };
}

export default function CompletedOrders() {
    const { orders } = usePage<PageProps>().props;

    const getTotalValue = () => {
        return orders.data.reduce((sum, order) => sum + order.total_amount, 0);
    };

    const getAverageOrderValue = () => {
        return orders.data.length > 0 ? getTotalValue() / orders.data.length : 0;
    };

    return (
        <DashboardLayout role="buyer" title="Completed Orders" pageTitle="Completed Orders">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('buyer.dashboard')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to Dashboard
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">
                        Completed Orders
                    </h1>
                    <p className="text-muted-foreground">
                        Review your completed orders and track your sourcing success.
                    </p>
                </div>
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
                            <div className="text-sm text-muted-foreground">Total Value</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {orders.data.length > 0 ? orders.data[0].currency : 'USD'} {Math.round(getAverageOrderValue()).toLocaleString()}
                            </div>
                            <div className="text-sm text-muted-foreground">Average Order Value</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {orders.data.reduce((sum, order) => sum + order.quantity, 0)}
                            </div>
                            <div className="text-sm text-muted-foreground">Total Quantity</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* DataTable */}
            <div className="px-4 lg:px-6">
                {orders.data.length > 0 ? (
                    <OrdersDataTable data={orders.data} />
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-muted-foreground mb-4">
                                <Package className="size-16 mx-auto mb-4 text-muted-foreground" />
                                <h3 className="text-lg font-semibold mb-2">No Completed Orders</h3>
                                <p>You don't have any completed orders yet. Create requests and work with suppliers to complete your first order.</p>
                            </div>
                            <Link href={route('buyer.requests.create')}>
                                <Button>
                                    <Plus className="size-4 mr-2" />
                                    Create Your First Request
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
