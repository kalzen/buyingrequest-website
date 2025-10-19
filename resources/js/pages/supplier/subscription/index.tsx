import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { Check, X, Crown, Zap, Rocket, Star, CreditCard, Building } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface CurrentPlan {
    plan: string;
    amount: number;
    currency: string;
    status: string;
    current_period_end: string;
    billing_cycle: string;
}

interface PageProps extends Record<string, unknown> {
    currentPlan: CurrentPlan | null;
}

export default function SubscriptionIndex() {
    const { currentPlan } = usePage<PageProps>().props;

    const plans = [
        {
            name: 'Free',
            price: 0,
            icon: Star,
            description: 'Perfect for getting started',
            features: [
                { name: 'Receive up to 2 RFQs per month', included: true },
                { name: 'Response time: 20 days', included: true },
                { name: '2 HS codes allowed', included: true },
                { name: 'Basic support', included: false },
                { name: 'Order verification', included: false },
            ],
            color: 'text-slate-600',
            popular: false,
        },
        {
            name: 'Basic',
            price: 25,
            icon: Zap,
            description: 'For growing businesses',
            features: [
                { name: 'Receive up to 15 RFQs per month', included: true },
                { name: 'Response time: 48 hours', included: true },
                { name: '5 HS codes allowed', included: true },
                { name: 'Priority support', included: true },
                { name: 'Order verification', included: true },
            ],
            color: 'text-blue-600',
            popular: false,
        },
        {
            name: 'Pro',
            price: 40,
            icon: Crown,
            description: 'Most popular choice',
            features: [
                { name: 'Receive up to 25 RFQs per month', included: true },
                { name: 'Response time: 24 hours', included: true },
                { name: '10 HS codes allowed', included: true },
                { name: '24/7 Priority support', included: true },
                { name: 'Advanced order verification', included: true },
            ],
            color: 'text-primary',
            popular: true,
        },
        {
            name: 'Premium',
            price: 60,
            icon: Rocket,
            description: 'For high-volume suppliers',
            features: [
                { name: 'Receive up to 40 RFQs per month', included: true },
                { name: 'Instant notifications', included: true },
                { name: '15 HS codes allowed', included: true },
                { name: 'Dedicated account manager', included: true },
                { name: 'Premium verification & fraud protection', included: true },
            ],
            color: 'text-purple-600',
            popular: false,
        },
        {
            name: 'Enterprise',
            price: 80,
            icon: Building,
            description: 'Unlimited potential',
            features: [
                { name: 'Receive up to 60 RFQs per month', included: true },
                { name: 'Exclusive access - Only you receive RFQs', included: true },
                { name: 'Unlimited HS codes', included: true },
                { name: 'White-glove service', included: true },
                { name: 'Custom enterprise features', included: true },
            ],
            color: 'text-orange-600',
            popular: false,
        },
    ];

    const currentPlanName = currentPlan?.plan || 'free';

    return (
        <DashboardLayout role="supplier" title="Pricing & Plans" pageTitle="Subscription Plans">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Pricing & Plans
                        </h1>
                        <p className="text-muted-foreground">
                            Choose the plan that best fits your business needs
                        </p>
                    </div>
                    {currentPlan && (
                        <Badge variant="outline" className="text-lg px-4 py-2">
                            Current: {currentPlan.plan.charAt(0).toUpperCase() + currentPlan.plan.slice(1)}
                        </Badge>
                    )}
                </div>
            </div>

            {/* Current Plan Card */}
            {currentPlan && currentPlan.plan !== 'free' && (
                <div className="mb-8 px-4 lg:px-6">
                    <Card className="bg-primary/5 border-primary">
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                                        <CreditCard className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">
                                            {currentPlan.plan.charAt(0).toUpperCase() + currentPlan.plan.slice(1)} Plan
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {currentPlan.currency} ${currentPlan.amount}/{currentPlan.billing_cycle}
                                            {currentPlan.current_period_end && ` • Renews on ${currentPlan.current_period_end}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={route('supplier.subscription.checkout', { mergeQuery: { plan: currentPlan.plan } })}>
                                        <Button variant="outline">Change Plan</Button>
                                    </Link>
                                    <form action={route('supplier.subscription.cancel')} method="post">
                                        <Button variant="destructive" type="submit">
                                            Cancel Subscription
                                        </Button>
                                    </form>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Plans Grid */}
            <div className="px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                    {plans.map((plan) => {
                        const Icon = plan.icon;
                        const isCurrentPlan = currentPlanName === plan.name.toLowerCase();
                        
                        return (
                            <Card 
                                key={plan.name} 
                                className={`relative ${
                                    plan.popular 
                                        ? 'border-primary shadow-lg' 
                                        : isCurrentPlan
                                        ? 'border-primary/50 bg-primary/5'
                                        : ''
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge className="bg-primary text-primary-foreground">
                                            Most Popular
                                        </Badge>
                                    </div>
                                )}
                                {isCurrentPlan && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                        <Badge variant="outline" className="bg-background">
                                            Current Plan
                                        </Badge>
                                    </div>
                                )}
                                
                                <CardHeader className="text-center pb-4">
                                    <div className={`flex size-12 items-center justify-center rounded-full mx-auto mb-4 ${
                                        plan.popular ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    }`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                                    <CardDescription>{plan.description}</CardDescription>
                                    <div className="mt-4">
                                        <span className="text-4xl font-bold text-foreground">
                                            ${plan.price}
                                        </span>
                                        {plan.price > 0 && (
                                            <span className="text-muted-foreground">/month</span>
                                        )}
                                    </div>
                                </CardHeader>
                                
                                <CardContent className="space-y-4">
                                    <ul className="space-y-3">
                                        {plan.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm">
                                                {feature.included ? (
                                                    <Check className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                                                ) : (
                                                    <X className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                                                )}
                                                <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                                                    {feature.name}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    {isCurrentPlan ? (
                                        <Button variant="outline" className="w-full" disabled>
                                            Current Plan
                                        </Button>
                                    ) : (
                                        <Link href={route('supplier.subscription.checkout', { mergeQuery: { plan: plan.name.toLowerCase() } })}>
                                            <Button 
                                                className={`w-full ${
                                                    plan.popular 
                                                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                                                        : ''
                                                }`}
                                                variant={plan.popular ? 'default' : 'outline'}
                                            >
                                                {plan.price === 0 ? 'Start Free' : 'Upgrade to ' + plan.name}
                                            </Button>
                                        </Link>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* FAQ */}
            <div className="mt-12 px-4 lg:px-6 max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-foreground mb-6 text-center">
                    Frequently Asked Questions
                </h2>
                <div className="space-y-4">
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">How does billing work?</h3>
                            <p className="text-muted-foreground text-sm">
                                You'll be billed monthly or yearly depending on your choice. All payments are processed securely through PayPal.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
                            <p className="text-muted-foreground text-sm">
                                Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your current billing period.
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                            <p className="text-muted-foreground text-sm">
                                We accept all major credit cards and PayPal payments for your convenience and security.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

