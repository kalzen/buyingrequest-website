import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { route } from 'ziggy-js';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Package, Calendar, User, DollarSign, CheckCircle, FileText } from 'lucide-react';
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-800';
            case 'delivered': return 'bg-blue-100 text-blue-800';
            case 'shipped': return 'bg-purple-100 text-purple-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getTotalValue = () => {
        return orders.data.reduce((sum, order) => sum + order.total_amount, 0);
    };

    const getAverageOrderValue = () => {
        return orders.data.length > 0 ? getTotalValue() / orders.data.length : 0;
    };

    return (
        <>
            <Head title="Completed Orders" />
            
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
                            Completed Orders
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
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Completed Orders
                                </h1>
                                <p className="text-slate-600">
                                    Review your completed orders and track your sourcing success.
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">{orders.data.length}</div>
                                        <div className="text-sm text-slate-600">Total Orders</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {orders.data.length > 0 ? orders.data[0].currency : 'USD'} {getTotalValue().toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-600">Total Value</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {orders.data.length > 0 ? orders.data[0].currency : 'USD'} {Math.round(getAverageOrderValue()).toLocaleString()}
                                        </div>
                                        <div className="text-sm text-slate-600">Average Order Value</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {orders.data.reduce((sum, order) => sum + order.quantity, 0)}
                                        </div>
                                        <div className="text-sm text-slate-600">Total Quantity</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Orders List */}
                        {orders.data.length > 0 ? (
                            <div className="space-y-6">
                                {orders.data.map((order) => (
                                    <Card key={order.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-semibold text-foreground">{order.product_name}</h3>
                                                        <Badge className={getStatusColor(order.status)}>
                                                            {order.status}
                                                        </Badge>
                                                    </div>
                                                    
                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <Package className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">Order #{order.order_number}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <User className="size-4 text-slate-500" />
                                                            <span className="font-medium text-foreground">{order.supplier.name}</span>
                                                            <span className="text-slate-500">({order.supplier.email})</span>
                                                        </div>
                                                        
                                                        {order.buyer_request && (
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <FileText className="size-4 text-slate-500" />
                                                                <Link 
                                                                    href={route('requests.show', order.buyer_request.id)}
                                                                    className="text-primary hover:underline"
                                                                >
                                                                    {order.buyer_request.title}
                                                                </Link>
                                                            </div>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="bg-slate-50 rounded-lg p-4 mb-4">
                                                        <p className="text-slate-700">{order.product_description}</p>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                                        <div className="flex items-center gap-2">
                                                            <DollarSign className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">
                                                                {order.quantity} {order.unit} × {order.currency} {order.unit_price.toLocaleString()} = {order.currency} {order.total_amount.toLocaleString()}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">Ordered: {order.created_at}</span>
                                                        </div>
                                                        {order.expected_delivery_date && (
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="size-4 text-slate-500" />
                                                                <span className="text-slate-600">Expected: {order.expected_delivery_date}</span>
                                                            </div>
                                                        )}
                                                        {order.actual_delivery_date && (
                                                            <div className="flex items-center gap-2">
                                                                <CheckCircle className="size-4 text-slate-500" />
                                                                <span className="text-slate-600">Delivered: {order.actual_delivery_date}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2 ml-4">
                                                    <Button variant="outline" size="sm">
                                                        View Details
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <div className="text-slate-500 mb-4">
                                        <Package className="size-16 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No Completed Orders</h3>
                                        <p>You don't have any completed orders yet. Create requests and work with suppliers to complete your first order.</p>
                                    </div>
                                    <Link href={route('buyer.requests.create')}>
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
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
