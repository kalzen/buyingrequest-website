import DashboardLayout from "@/layouts/dashboard-layout"
import { SectionCards } from "@/components/section-cards"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Link, usePage } from '@inertiajs/react'
import { route } from 'ziggy-js'
import { ArrowRight, Building, Eye, TrendingUp, Star, MapPin, DollarSign } from 'lucide-react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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

interface SupplierStats {
    profileViews: number;
    activeRfqs: number;
    responseRate: number;
    completedOrders: number;
}

interface RecentRfq {
    id: number;
    title: string;
    summary: string;
    budget_min: number | null;
    budget_max: number | null;
    currency: string;
    preferred_location: string | null;
    lead_valid_until: string | null;
    created_at: string;
}

interface CurrentPlan {
    plan: string;
    status: string;
}

interface PageProps extends Record<string, unknown> {
    auth: {
        user: User;
    };
    stats: SupplierStats;
    recentRfqs: RecentRfq[];
    currentPlan: CurrentPlan;
}

const performanceData = [
    { month: "Jan", views: 1200, responses: 45 },
    { month: "Feb", views: 1500, responses: 52 },
    { month: "Mar", views: 1800, responses: 61 },
    { month: "Apr", views: 2100, responses: 68 },
    { month: "May", views: 2400, responses: 75 },
    { month: "Jun", views: 2850, responses: 89 },
]

const chartConfig = {
    views: {
        label: "Profile Views",
        color: "hsl(var(--primary))",
    },
    responses: {
        label: "RFQ Responses",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig

export default function SupplierDashboard() {
    const { auth, stats, recentRfqs, currentPlan } = usePage<PageProps>().props;

    return (
        <DashboardLayout role="supplier" title="Supplier Dashboard" pageTitle="Supplier Dashboard">
                        {/* Welcome Section */}
                        <div className="px-2">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {auth.user.name}!</h1>
                                    <p className="text-muted-foreground">
                                        Track your performance and respond to new RFQ opportunities.
                                    </p>
                                </div>
                                <Badge variant="outline" className="text-base px-4 py-2">
                                    {currentPlan.plan.charAt(0).toUpperCase() + currentPlan.plan.slice(1)} Plan
                                </Badge>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <SectionCards role="supplier" />

                        {/* Main Content */}
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 px-4 lg:px-6">
                            {/* Performance Chart */}
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Performance Overview</CardTitle>
                                    <CardDescription>
                                        Your profile views and RFQ responses over the last 6 months
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <ChartContainer config={chartConfig} className="h-[300px] w-full">
                                        <BarChart
                                            data={performanceData}
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
                                            <Bar
                                                dataKey="views"
                                                fill="var(--color-views)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                            <Bar
                                                dataKey="responses"
                                                fill="var(--color-responses)"
                                                radius={[4, 4, 0, 0]}
                                            />
                                        </BarChart>
                                    </ChartContainer>
                                </CardContent>
                            </Card>

                            {/* Performance Metrics */}
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Performance Metrics</CardTitle>
                                    <CardDescription>
                                        Your profile and response quality
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Profile Completeness</span>
                                            <span className="font-medium">85%</span>
                                        </div>
                                        <Progress value={85} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Response Rate</span>
                                            <span className="font-medium">89%</span>
                                        </div>
                                        <Progress value={89} className="h-2" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Customer Satisfaction</span>
                                            <span className="font-medium flex items-center gap-1">
                                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                                4.8/5
                                            </span>
                                        </div>
                                        <Progress value={96} className="h-2" />
                                    </div>
                                    <Link href={route('supplier.profile.edit')}>
                                        <Button variant="outline" className="w-full mt-4">
                                            <Building className="mr-2 h-4 w-4" />
                                            Improve Profile
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Recent RFQs */}
                        {recentRfqs && recentRfqs.length > 0 && (
                            <div className="px-4 lg:px-6">
                                <Card>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <CardTitle>Recent RFQ Opportunities</CardTitle>
                                                <CardDescription>
                                                    Latest requests matching your profile
                                                </CardDescription>
                                            </div>
                                            <Link href={route('supplier.rfqs')}>
                                                <Button variant="outline" size="sm">
                                                    View All
                                                </Button>
                                            </Link>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {recentRfqs.slice(0, 3).map((rfq) => (
                                                <div
                                                    key={rfq.id}
                                                    className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                                                >
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="flex-1 space-y-2">
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="font-semibold">
                                                                    {rfq.title}
                                                                </h4>
                                                                <Badge variant="outline" className="text-xs">
                                                                    New
                                                                </Badge>
                                                            </div>
                                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                                {rfq.summary}
                                                            </p>
                                                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                                                {rfq.budget_min && (
                                                                    <span className="flex items-center gap-1">
                                                                        <DollarSign className="h-3 w-3" />
                                                                        {rfq.currency} {rfq.budget_min.toLocaleString()}
                                                                        {rfq.budget_max ? ` - ${rfq.budget_max.toLocaleString()}` : '+'}
                                                                    </span>
                                                                )}
                                                                {rfq.preferred_location && (
                                                                    <span className="flex items-center gap-1">
                                                                        <MapPin className="h-3 w-3" />
                                                                        {rfq.preferred_location}
                                                                    </span>
                                                                )}
                                                                <span>
                                                                    Posted {new Date(rfq.created_at).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <Link href={route('supplier.rfqs.show', rfq.id)}>
                                                            <Button size="sm">
                                                                Respond
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

                        {/* Quick Actions */}
                        <div className="grid gap-4 md:grid-cols-3 px-4 lg:px-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Update Profile</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Keep your company information up to date
                                    </p>
                                    <Link href={route('supplier.profile.edit')}>
                                        <Button variant="outline" className="w-full">
                                            <Building className="mr-2 h-4 w-4" />
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Browse RFQs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Find new business opportunities
                                    </p>
                                    <Link href={route('supplier.rfqs')}>
                                        <Button variant="outline" className="w-full">
                                            <Eye className="mr-2 h-4 w-4" />
                                            View RFQs
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">My Orders</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Manage your active orders
                                    </p>
                                    <Link href={route('supplier.orders')}>
                                        <Button variant="outline" className="w-full">
                                            <TrendingUp className="mr-2 h-4 w-4" />
                                            View Orders
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Bottom CTA */}
                        {currentPlan.plan === 'free' && (
                            <div className="px-4 lg:px-6">
                                <Card className="bg-primary text-primary-foreground">
                                    <CardContent className="flex flex-col md:flex-row items-center justify-between gap-4 p-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-1">Unlock More Opportunities</h3>
                                            <p className="text-sm text-primary-foreground/80">
                                                Upgrade your plan to receive more RFQs, faster notifications, and priority support.
                                            </p>
                                        </div>
                                        <Link href={route('supplier.subscription')}>
                                            <Button variant="secondary" size="lg">
                                                View Plans
                                            </Button>
                                        </Link>
                                    </CardContent>
                                </Card>
                            </div>
                        )}
        </DashboardLayout>
    )
}
