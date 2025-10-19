import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { route } from 'ziggy-js';
import { Link, useForm } from '@inertiajs/react';
import { 
    ArrowLeft, 
    Package, 
    User, 
    Mail, 
    DollarSign, 
    Calendar,
    FileText,
    Truck,
    CheckCircle,
    Clock
} from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Buyer {
    name: string;
    email: string;
}

interface BuyerRequest {
    id: number;
    title: string;
}

interface Order {
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
    notes: string | null;
    buyer: Buyer;
    buyer_request: BuyerRequest | null;
}

interface PageProps extends Record<string, unknown> {
    order: Order;
}

const getStatusVariant = (status: string) => {
    switch (status) {
        case 'completed': return 'default';
        case 'delivered': return 'default';
        case 'shipped': return 'secondary';
        case 'processing': return 'outline';
        default: return 'outline';
    }
};

const getStatusProgress = (status: string) => {
    switch (status) {
        case 'processing': return 25;
        case 'shipped': return 75;
        case 'delivered': return 90;
        case 'completed': return 100;
        default: return 0;
    }
};

export default function OrderShow() {
    const { order } = usePage<PageProps>().props;

    return (
        <DashboardLayout role="supplier" title="Order Details" pageTitle="Order Details">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('supplier.orders')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to Orders
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Order #{order.order_number}
                        </h1>
                        <p className="text-muted-foreground">
                            Placed on {order.created_at}
                        </p>
                    </div>
                    <Badge variant={getStatusVariant(order.status)} className="text-lg px-4 py-2">
                        {order.status}
                    </Badge>
                </div>
            </div>

            {/* Progress Tracker */}
            <div className="mb-8 px-4 lg:px-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Order Progress</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Progress value={getStatusProgress(order.status)} className="h-3" />
                        <div className="grid grid-cols-4 gap-2 text-xs text-center">
                            <div className={order.status !== 'pending' ? 'text-primary font-medium' : 'text-muted-foreground'}>
                                Processing
                            </div>
                            <div className={['shipped', 'delivered', 'completed'].includes(order.status) ? 'text-primary font-medium' : 'text-muted-foreground'}>
                                Shipped
                            </div>
                            <div className={['delivered', 'completed'].includes(order.status) ? 'text-primary font-medium' : 'text-muted-foreground'}>
                                Delivered
                            </div>
                            <div className={order.status === 'completed' ? 'text-primary font-medium' : 'text-muted-foreground'}>
                                Completed
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content */}
            <div className="grid gap-6 md:grid-cols-3 px-4 lg:px-6">
                {/* Order Details */}
                <div className="md:col-span-2 space-y-6">
                    {/* Product Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Package className="h-5 w-5 text-primary" />
                                Product Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">{order.product_name}</h3>
                                <p className="text-muted-foreground">{order.product_description}</p>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Quantity</h4>
                                    <p className="text-muted-foreground">{order.quantity} {order.unit}</p>
                                </div>
                                <div>
                                    <h4 className="text-sm font-medium mb-1">Unit Price</h4>
                                    <p className="text-muted-foreground">{order.currency} {order.unit_price.toLocaleString()}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Buyer Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" />
                                Buyer Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">{order.buyer.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-muted-foreground">{order.buyer.email}</span>
                            </div>
                            {order.buyer_request && (
                                <>
                                    <Separator />
                                    <div>
                                        <h4 className="text-sm font-medium mb-2">Related RFQ</h4>
                                        <Link 
                                            href={route('requests.show', order.buyer_request.id)}
                                            className="text-primary hover:underline flex items-center gap-2"
                                        >
                                            <FileText className="h-4 w-4" />
                                            {order.buyer_request.title}
                                        </Link>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>

                    {order.notes && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Order Notes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground whitespace-pre-wrap">{order.notes}</p>
                            </CardContent>
                        </Card>
                    )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Pricing Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Pricing Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <DollarSign className="h-4 w-4" />
                                    <span className="text-sm">Total Amount</span>
                                </div>
                                <div className="text-3xl font-bold text-primary">
                                    {order.currency} {order.total_amount.toLocaleString()}
                                </div>
                            </div>
                            <Separator />
                            <div className="text-sm space-y-1">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Unit Price:</span>
                                    <span className="font-medium">{order.currency} {order.unit_price.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">Quantity:</span>
                                    <span className="font-medium">{order.quantity} {order.unit}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Delivery Information */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Delivery Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {order.expected_delivery_date && (
                                <div>
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Calendar className="h-4 w-4" />
                                        <span className="text-sm">Expected Delivery</span>
                                    </div>
                                    <div className="font-medium">{order.expected_delivery_date}</div>
                                </div>
                            )}
                            
                            {order.actual_delivery_date && (
                                <>
                                    <Separator />
                                    <div>
                                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                            <span className="text-sm">Actual Delivery</span>
                                        </div>
                                        <div className="font-medium text-green-600">{order.actual_delivery_date}</div>
                                    </div>
                                </>
                            )}

                            <Separator />
                            <div>
                                <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                    <Clock className="h-4 w-4" />
                                    <span className="text-sm">Order Date</span>
                                </div>
                                <div className="font-medium">{order.created_at}</div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="outline" className="w-full">
                                <Truck className="mr-2 h-4 w-4" />
                                Update Shipping Status
                            </Button>
                            <Button variant="outline" className="w-full">
                                <FileText className="mr-2 h-4 w-4" />
                                Download Invoice
                            </Button>
                            <a href={`mailto:${order.buyer.email}?subject=Order ${order.order_number}`}>
                                <Button variant="outline" className="w-full">
                                    <Mail className="mr-2 h-4 w-4" />
                                    Contact Buyer
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

