import DashboardLayout from "@/layouts/dashboard-layout"
import { SectionCards } from "@/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { ArrowRight, FileText, TrendingUp, Calendar } from 'lucide-react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

interface User {
    name: string;
    email: string;
}

interface DashboardStats {
    activeRequests: number;
    supplierContacts: number;
    completedOrders: number;
}

interface RecentRequest {
    id: number;
    title: string;
    status: string;
    created_at: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
    };
    stats: DashboardStats;
    recentRequests: RecentRequest[];
}

const chartData = [
    { month: "Jan", requests: 12, orders: 8 },
    { month: "Feb", requests: 18, orders: 11 },
    { month: "Mar", requests: 22, orders: 15 },
    { month: "Apr", requests: 25, orders: 18 },
    { month: "May", requests: 28, orders: 21 },
    { month: "Jun", requests: 32, orders: 24 },
]

const chartConfig = {
    requests: {
        label: "Requests",
        color: "hsl(var(--primary))",
    },
    orders: {
        label: "Orders",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function BuyerDashboard() {
    const { auth, stats, recentRequests } = usePage<PageProps>().props;

    return (
        <DashboardLayout role="buyer" title="Dashboard" pageTitle="Buyer Dashboard">
                        {/* Welcome Section */}
                        <div className="px-2">
                            <h1 className="text-3xl font-bold tracking-tight">Welcome back, {auth.user.name}!</h1>
                            <p className="text-muted-foreground">
                                Here's what's happening with your sourcing activities today.
                            </p>
                        </div>

                        {/* Stats Cards */}
                        <SectionCards role="buyer" />

                        {/* Main Content */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 px-4 lg:px-6">
                            {/* Chart */}
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Activity Overview</CardTitle>
                                    <CardDescription>
                                        Your requests and completed orders over the last 6 months
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                        <AreaChart
                                            data={chartData}
                                            margin={{
                                                left: 12,
                                                right: 12,
                                            }}
                                        >
                                            <CartesianGrid vertical={false} />
                                            <XAxis
                                                dataKey="month"
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                            />
                                            <YAxis
                                                tickLine={false}
                                                axisLine={false}
                                                tickMargin={8}
                                            />
                                            <ChartTooltip
                                                cursor={false}
                                                content={<ChartTooltipContent />}
                                            />
                                            <Area
                                                dataKey="requests"
                                                type="monotone"
                                                fill="var(--color-requests)"
                                                fillOpacity={0.4}
                                                stroke="var(--color-requests)"
                                            />
                                            <Area
                                                dataKey="orders"
                                                type="monotone"
                                                fill="var(--color-orders)"
                                                fillOpacity={0.4}
                                                stroke="var(--color-orders)"
                                            />
                                        </AreaChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>

                            {/* Quick Actions */}
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                    <CardDescription>
                                        Frequently used features
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link href={route('buyer.requests.create')}>
                                        <Button className="w-full justify-start" size="lg">
                                            <FileText className="mr-2 h-5 w-5" />
                                            Post New RFQ
                                            <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={route('suppliers.index')}>
                                        <Button variant="outline" className="w-full justify-start" size="lg">
                                            <TrendingUp className="mr-2 h-5 w-5" />
                                            Browse Suppliers
                                            <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Link href={route('buyer.active-requests')}>
                                        <Button variant="outline" className="w-full justify-start" size="lg">
                                            <Calendar className="mr-2 h-5 w-5" />
                                            View Active Requests
                                            <ArrowRight className="ml-auto h-4 w-4" />
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent Requests Table */}
                        {recentRequests && recentRequests.length > 0 && (
                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Requests</CardTitle>
                                        <CardDescription>
                                            Your latest RFQ submissions
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentRequests.map((request) => (
                                                <div
                                                    key={request.id}
                                                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                                                >
                                                    <div className="space-y-1">
                                                        <p className="font-medium leading-none">
                                                            {request.title}
                                                        </p>
                                                        <p className="text-sm text-muted-foreground">
                                                            Created: {new Date(request.created_at).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge
                                                            variant={request.status === 'open' ? 'default' : 'secondary'}
                                                        >
                                                            {request.status}
                                                        </Badge>
                                                        <Link href={route('requests.show', request.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                View
                                                                <ArrowRight className="ml-2 h-4 w-4" />
                                                            </Button>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        )}

                        {/* Bottom CTA */}
                        <div className="px-4 lg:px-6">
                            <Card className="bg-primary text-primary-foreground">
                                <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-1">Need help with sourcing?</h3>
                                        <p className="text-sm text-primary-foreground/80">
                                            Our team is here to assist you with finding the right suppliers.
                                        </p>
                                    </div>
                                    <a href="mailto:support@exportgo.net?subject=Sourcing Assistance Request">
                                        <Button variant="secondary" size="lg">
                                            Contact Support
                                        </Button>
                                    </a>
                                </CardContent>
                            </Card>
                        </div>
        </DashboardLayout>
    )
}
