import { ArrowUpRight, Building, CheckCircle2, FileText, TrendingUp, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link, usePage } from "@inertiajs/react"
import { route } from "ziggy-js"

interface BuyerStats {
    activeRequests: number;
    supplierContacts: number;
    completedOrders: number;
}

interface SupplierStats {
    profileViews: number;
    activeRfqs: number;
    responseRate: number;
    completedOrders: number;
}

interface BuyerPageProps {
    stats: BuyerStats;
}

interface SupplierPageProps {
    stats: SupplierStats;
}

export function SectionCards({ role = "buyer" }: { role?: "buyer" | "supplier" }) {
    if (role === "buyer") {
        const { stats } = usePage<BuyerPageProps>().props;
        
        return (
            <div className="grid auto-rows-min gap-4 md:grid-cols-3 px-4 lg:px-6">
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Active Requests</CardDescription>
                        <CardTitle className="text-4xl">{stats?.activeRequests || 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                                RFQs in progress
                            </div>
                            <Link href={route('buyer.active-requests')}>
                                <Button variant="ghost" size="sm">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Supplier Contacts</CardDescription>
                        <CardTitle className="text-4xl">{stats?.supplierContacts || 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                                Connected suppliers
                            </div>
                            <Link href={route('buyer.supplier-contacts')}>
                                <Button variant="ghost" size="sm">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardDescription>Completed Orders</CardDescription>
                        <CardTitle className="text-4xl">{stats?.completedOrders || 0}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="text-xs text-muted-foreground">
                                Successful deals
                            </div>
                            <Link href={route('buyer.completed-orders')}>
                                <Button variant="ghost" size="sm">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    // Supplier stats
    const { stats } = usePage<SupplierPageProps>().props;
    
    return (
        <div className="grid auto-rows-min gap-4 md:grid-cols-4 px-4 lg:px-6">
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Profile Views</CardDescription>
                    <CardTitle className="text-4xl">{stats?.profileViews?.toLocaleString() || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        This month
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Active RFQs</CardDescription>
                    <CardTitle className="text-4xl">{stats?.activeRfqs || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Available opportunities
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Response Rate</CardDescription>
                    <CardTitle className="text-4xl">{stats?.responseRate || 0}%</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Last 30 days
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="pb-2">
                    <CardDescription>Completed Orders</CardDescription>
                    <CardTitle className="text-4xl">{stats?.completedOrders || 0}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-xs text-muted-foreground">
                        Total fulfilled
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
