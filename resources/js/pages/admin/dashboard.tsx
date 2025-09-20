import AdminLayout from '@/layouts/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePage } from '@inertiajs/react';
import { TrendingUp, Users, Star, ListChecks } from 'lucide-react';

interface DashboardProps {
    metrics: {
        totalSuppliers: number;
        verifiedSuppliers: number;
        openBuyerRequests: number;
        slides: number;
        users: number;
    };
}

type PageProps = DashboardProps;

export default function AdminDashboard() {
    const { props } = usePage<PageProps>();
    const { metrics } = props;

    const cards = [
        {
            title: 'Suppliers',
            value: metrics.totalSuppliers.toLocaleString(),
            description: `${metrics.verifiedSuppliers.toLocaleString()} verified`,
            icon: Users,
        },
        {
            title: 'Active slides',
            value: metrics.slides.toLocaleString(),
            description: 'Homepage hero items',
            icon: Star,
        },
        {
            title: 'Buyer requests',
            value: metrics.openBuyerRequests.toLocaleString(),
            description: 'Open RFQs needing responses',
            icon: ListChecks,
        },
        {
            title: 'Registered users',
            value: metrics.users.toLocaleString(),
            description: 'Total accounts',
            icon: TrendingUp,
        },
    ];

    return (
        <AdminLayout title="Overview">
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map((card) => (
                    <Card key={card.title} className="border-white/10 bg-neutral-900/70">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-neutral-300">
                                {card.title}
                            </CardTitle>
                            <card.icon className="size-4 text-orange-400" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-semibold text-white">{card.value}</div>
                            <p className="text-xs text-neutral-500">{card.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </AdminLayout>
    );
}
