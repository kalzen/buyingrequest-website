import LandingLayout from '@/layouts/landing-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Check, X, Clock, Users, Globe, DollarSign, FileText, Shield, Headphones } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Pricing() {
    const plans = [
        {
            name: 'Free',
            price: '0',
            period: '',
            description: 'Perfect for getting started',
            features: [
                { name: 'Time you receive notification when a buyer sends a request', value: '20 days', included: true },
                { name: 'Maximum number of purchase requests you can receive per month', value: '2', included: true },
                { name: 'Number of HS codes you can choose', value: '2', included: true },
                { name: 'Number of companies receiving the same purchase request as you', value: '20', included: true },
                { name: 'Number of countries you are allowed to sell to', value: '2', included: true },
                { name: 'Order value limit', value: '<25,000 USD', included: true },
                { name: 'Receive monthly customer list', value: 'No', included: false },
                { name: 'Support from us', value: 'No', included: false },
                { name: 'Order verification, fraud prevention', value: 'No', included: false },
            ],
            popular: false,
            buttonText: 'Get Started Free',
            buttonVariant: 'outline' as const,
        },
        {
            name: 'Basic',
            price: '25',
            period: '/month',
            description: 'For growing businesses',
            features: [
                { name: 'Time you receive notification when a buyer sends a request', value: '48 hours', included: true },
                { name: 'Maximum number of purchase requests you can receive per month', value: '15', included: true },
                { name: 'Number of HS codes you can choose', value: '5', included: true },
                { name: 'Number of companies receiving the same purchase request as you', value: '10', included: true },
                { name: 'Number of countries you are allowed to sell to', value: '5', included: true },
                { name: 'Order value limit', value: '<50,000 USD', included: true },
                { name: 'Receive monthly customer list', value: 'Yes', included: true },
                { name: 'Support from us', value: 'Yes', included: true },
                { name: 'Order verification, fraud prevention', value: 'Yes', included: true },
            ],
            popular: false,
            buttonText: 'Choose Basic',
            buttonVariant: 'default' as const,
        },
        {
            name: 'Pro',
            price: '40',
            period: '/month',
            description: 'For established businesses',
            features: [
                { name: 'Time you receive notification when a buyer sends a request', value: '24 hours', included: true },
                { name: 'Maximum number of purchase requests you can receive per month', value: '25', included: true },
                { name: 'Number of HS codes you can choose', value: '10', included: true },
                { name: 'Number of companies receiving the same purchase request as you', value: '5', included: true },
                { name: 'Number of countries you are allowed to sell to', value: '10', included: true },
                { name: 'Order value limit', value: '<100,000 USD', included: true },
                { name: 'Receive monthly customer list', value: 'Yes', included: true },
                { name: 'Support from us', value: 'Yes', included: true },
                { name: 'Order verification, fraud prevention', value: 'Yes', included: true },
            ],
            popular: true,
            buttonText: 'Choose Pro',
            buttonVariant: 'default' as const,
        },
        {
            name: 'Premium',
            price: '60',
            period: '/month',
            description: 'For high-volume businesses',
            features: [
                { name: 'Time you receive notification when a buyer sends a request', value: 'Now', included: true },
                { name: 'Maximum number of purchase requests you can receive per month', value: '40', included: true },
                { name: 'Number of HS codes you can choose', value: '15', included: true },
                { name: 'Number of companies receiving the same purchase request as you', value: '3', included: true },
                { name: 'Number of countries you are allowed to sell to', value: '20', included: true },
                { name: 'Order value limit', value: '<300,000 USD', included: true },
                { name: 'Receive monthly customer list', value: 'Yes', included: true },
                { name: 'Support from us', value: 'Yes', included: true },
                { name: 'Order verification, fraud prevention', value: 'Yes', included: true },
            ],
            popular: false,
            buttonText: 'Choose Premium',
            buttonVariant: 'default' as const,
        },
        {
            name: 'Enterprise',
            price: '80',
            period: '/month',
            description: 'For enterprise-level businesses',
            features: [
                { name: 'Time you receive notification when a buyer sends a request', value: 'Now', included: true },
                { name: 'Maximum number of purchase requests you can receive per month', value: '60', included: true },
                { name: 'Number of HS codes you can choose', value: '15', included: true },
                { name: 'Number of companies receiving the same purchase request as you', value: 'Only you', included: true },
                { name: 'Number of countries you are allowed to sell to', value: 'Unlimited', included: true },
                { name: 'Order value limit', value: 'Unlimited', included: true },
                { name: 'Receive monthly customer list', value: 'Yes', included: true },
                { name: 'Support from us', value: 'Yes', included: true },
                { name: 'Order verification, fraud prevention', value: 'Yes', included: true },
            ],
            popular: false,
            buttonText: 'Choose Enterprise',
            buttonVariant: 'default' as const,
        },
    ];

    const featureIcons = {
        'Time you receive notification when a buyer sends a request': Clock,
        'Maximum number of purchase requests you can receive per month': Users,
        'Number of HS codes you can choose': FileText,
        'Number of companies receiving the same purchase request as you': Users,
        'Number of countries you are allowed to sell to': Globe,
        'Order value limit': DollarSign,
        'Receive monthly customer list': FileText,
        'Support from us': Headphones,
        'Order verification, fraud prevention': Shield,
    };

    return (
        <LandingLayout>
            <Head title="Pricing - Export Go" />
            
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-[#0b3d91] to-[#1f6feb] py-20">
                <div className="mx-auto w-full max-w-6xl px-4 text-white text-center">
                    <Badge className="bg-white/20 text-white mb-4">Pricing Plans</Badge>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">
                        Choose Your Perfect Plan
                    </h1>
                    <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                        Start free and scale as you grow. All plans include our core features with different limits and benefits.
                    </p>
                </div>
            </section>

            {/* Pricing Table */}
            <section className="bg-white py-20">
                <div className="mx-auto w-full max-w-7xl px-4">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b-2 border-[#d6e0f5]">
                                    <th className="text-left p-4 font-semibold text-foreground min-w-[300px]">
                                        Features
                                    </th>
                                    {plans.map((plan) => (
                                        <th key={plan.name} className="text-center p-4 min-w-[200px]">
                                            <div className="space-y-2">
                                                {plan.popular && (
                                                    <Badge className="bg-primary text-primary-foreground text-xs">
                                                        Most Popular
                                                    </Badge>
                                                )}
                                                <div className="font-bold text-lg text-foreground">{plan.name}</div>
                                                <div className="text-3xl font-bold text-primary">
                                                    ${plan.price}
                                                    <span className="text-sm font-normal text-slate-600">{plan.period}</span>
                                                </div>
                                                <div className="text-sm text-slate-600">{plan.description}</div>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {plans[0].features.map((feature, index) => {
                                    const IconComponent = featureIcons[feature.name as keyof typeof featureIcons];
                                    return (
                                        <tr key={index} className="border-b border-[#d6e0f5] hover:bg-[#f8fafc]">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    {IconComponent && <IconComponent className="size-5 text-primary flex-shrink-0" />}
                                                    <span className="text-sm text-slate-700 font-medium">
                                                        {feature.name}
                                                    </span>
                                                </div>
                                            </td>
                                            {plans.map((plan) => (
                                                <td key={plan.name} className="p-4 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {plan.features[index].included ? (
                                                            <Check className="size-4 text-green-600" />
                                                        ) : (
                                                            <X className="size-4 text-red-500" />
                                                        )}
                                                        <span className={`text-sm font-medium ${
                                                            plan.features[index].included ? 'text-slate-900' : 'text-slate-500'
                                                        }`}>
                                                            {plan.features[index].value}
                                                        </span>
                                                    </div>
                                                </td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-5 gap-4">
                        {plans.map((plan) => (
                            <div key={plan.name} className="text-center">
                                <Link href={route('register', { mergeQuery: { type: 'supplier', plan: plan.name.toLowerCase() } })}>
                                    <Button
                                        variant={plan.buttonVariant}
                                        className={`w-full ${
                                            plan.popular 
                                                ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                                                : plan.buttonVariant === 'outline'
                                                ? 'border-primary text-primary hover:bg-primary/10'
                                                : 'bg-slate-900 text-white hover:bg-slate-800'
                                        }`}
                                    >
                                        {plan.buttonText}
                                    </Button>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-[#f5f7fb] py-20">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            What's Included in All Plans
                        </h2>
                        <p className="text-lg text-slate-600">
                            Core features that help you succeed in global trade
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Card className="text-center border-[#d6e0f5]">
                            <CardContent className="p-8">
                                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                                    <Globe className="size-8" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Global Network Access
                                </h3>
                                <p className="text-slate-600">
                                    Connect with verified buyers and suppliers from around the world
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-[#d6e0f5]">
                            <CardContent className="p-8">
                                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                                    <Shield className="size-8" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Secure Platform
                                </h3>
                                <p className="text-slate-600">
                                    Your data and transactions are protected with enterprise-grade security
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="text-center border-[#d6e0f5]">
                            <CardContent className="p-8">
                                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mx-auto mb-4">
                                    <Headphones className="size-8" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground mb-2">
                                    Expert Support
                                </h3>
                                <p className="text-slate-600">
                                    Get help from our trade experts when you need it most
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="bg-white py-20">
                <div className="mx-auto w-full max-w-4xl px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-foreground mb-4">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-lg text-slate-600">
                            Everything you need to know about our pricing
                        </p>
                    </div>

                    <div className="space-y-6">
                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Can I change my plan anytime?
                                </h3>
                                <p className="text-slate-600">
                                    Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, 
                                    and we'll prorate any billing differences.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    What happens if I exceed my plan limits?
                                </h3>
                                <p className="text-slate-600">
                                    We'll notify you when you're approaching your limits. You can upgrade your plan or 
                                    purchase additional capacity as needed.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Is there a free trial available?
                                </h3>
                                <p className="text-slate-600">
                                    Yes! Our Free plan allows you to explore the platform with limited features. 
                                    No credit card required to get started.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-[#d6e0f5]">
                            <CardContent className="p-6">
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    Do you offer custom enterprise solutions?
                                </h3>
                                <p className="text-slate-600">
                                    Absolutely! Contact our sales team to discuss custom pricing and features 
                                    tailored to your specific business needs.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-br from-[#0b3d91] to-[#1f6feb] py-20">
                <div className="mx-auto w-full max-w-4xl px-4 text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Your Global Trade Journey?
                    </h2>
                    <p className="text-xl text-white/90 mb-8">
                        Join thousands of businesses already using Export Go to expand their reach
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href={route('register', { mergeQuery: { type: 'supplier', plan: 'free' } })}>
                            <Button 
                                className="bg-white text-primary hover:bg-white/90 px-8 py-3 text-lg"
                            >
                                Start Free Today
                            </Button>
                        </Link>
                        <a href="mailto:sales@exportgo.net?subject=Enterprise Plan Inquiry">
                            <Button 
                                variant="outline" 
                                className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg"
                            >
                                Contact Sales
                            </Button>
                        </a>
                    </div>
                </div>
            </section>
        </LandingLayout>
    );
}



