import DashboardLayout from "@/layouts/dashboard-layout"
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { route } from 'ziggy-js';
import { Link, router } from '@inertiajs/react';
import { ArrowLeft, CreditCard, Check, Shield } from 'lucide-react';
import { usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';

interface PageProps extends Record<string, unknown> {
    plan: string;
    amount: number;
    currency: string;
    billing_cycle: string;
    paypal_client_id: string;
}

declare global {
    interface Window {
        paypal?: any;
    }
}

export default function SubscriptionCheckout() {
    const { plan, amount, currency, billing_cycle, paypal_client_id } = usePage<PageProps>().props;
    const [selectedCycle, setSelectedCycle] = useState(billing_cycle);
    const [isPayPalLoaded, setIsPayPalLoaded] = useState(false);
    const [processing, setProcessing] = useState(false);

    const planPrices: Record<string, number> = {
        'free': 0,
        'basic': 25,
        'pro': 40,
        'premium': 60,
        'enterprise': 80,
    };

    const basePrice = planPrices[plan] || 0;
    const monthlyPrice = basePrice;
    const yearlyPrice = Math.round(basePrice * 12 * 0.85); // 15% discount
    const currentAmount = selectedCycle === 'yearly' ? yearlyPrice : monthlyPrice;

    useEffect(() => {
        // Load PayPal SDK
        if (plan !== 'free' && !window.paypal) {
            const script = document.createElement('script');
            script.src = `https://www.paypal.com/sdk/js?client-id=${paypal_client_id}&currency=${currency}`;
            script.async = true;
            script.onload = () => {
                setIsPayPalLoaded(true);
            };
            document.body.appendChild(script);
        } else if (window.paypal) {
            setIsPayPalLoaded(true);
        }
    }, [paypal_client_id, currency, plan]);

    useEffect(() => {
        if (isPayPalLoaded && window.paypal && plan !== 'free') {
            // Render PayPal button
            const container = document.getElementById('paypal-button-container');
            if (container && container.innerHTML === '') {
                window.paypal.Buttons({
                    createOrder: (data: any, actions: any) => {
                        return actions.order.create({
                            purchase_units: [{
                                description: `${plan.charAt(0).toUpperCase() + plan.slice(1)} Plan - ${selectedCycle}`,
                                amount: {
                                    currency_code: currency,
                                    value: currentAmount.toFixed(2)
                                }
                            }]
                        });
                    },
                    onApprove: (data: any, actions: any) => {
                        setProcessing(true);
                        return actions.order.capture().then((details: any) => {
                            // Create subscription in backend
                            router.post(route('supplier.subscription.store'), {
                                plan: plan,
                                billing_cycle: selectedCycle,
                                paypal_subscription_id: data.orderID,
                                paypal_payer_id: details.payer.payer_id,
                            });
                        });
                    },
                    onError: (err: any) => {
                        console.error('PayPal error:', err);
                        alert('Payment failed. Please try again.');
                        setProcessing(false);
                    }
                }).render('#paypal-button-container');
            }
        }
    }, [isPayPalLoaded, plan, selectedCycle, currentAmount]);

    const handleFreePlan = () => {
        setProcessing(true);
        router.post(route('supplier.subscription.store'), {
            plan: 'free',
            billing_cycle: 'monthly',
        });
    };

    const handleCycleChange = (cycle: string) => {
        setSelectedCycle(cycle);
        // Reload page with new cycle
        router.get(route('supplier.subscription.checkout', { 
            mergeQuery: { plan, billing_cycle: cycle } 
        }), {}, { preserveState: false });
    };

    return (
        <DashboardLayout role="supplier" title="Checkout" pageTitle="Subscription Checkout">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('supplier.subscription')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to Plans
                </Link>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                    Checkout
                </h1>
                <p className="text-muted-foreground">
                    Complete your subscription to {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3 px-4 lg:px-6">
                {/* Order Summary */}
                <div className="md:col-span-2 space-y-6">
                    {/* Billing Cycle Selection */}
                    {plan !== 'free' && (
                        <Card>
                            <CardHeader>
                                <CardTitle>Billing Cycle</CardTitle>
                                <CardDescription>Choose how often you want to be billed</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <RadioGroup value={selectedCycle} onValueChange={handleCycleChange}>
                                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                                        <RadioGroupItem value="monthly" id="monthly" />
                                        <Label htmlFor="monthly" className="flex-1 cursor-pointer">
                                            <div className="font-semibold">Monthly</div>
                                            <div className="text-sm text-muted-foreground">
                                                ${monthlyPrice}/month - Billed monthly
                                            </div>
                                        </Label>
                                        <div className="text-right">
                                            <div className="text-lg font-bold">${monthlyPrice}</div>
                                            <div className="text-xs text-muted-foreground">per month</div>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-accent cursor-pointer">
                                        <RadioGroupItem value="yearly" id="yearly" />
                                        <Label htmlFor="yearly" className="flex-1 cursor-pointer">
                                            <div className="font-semibold flex items-center gap-2">
                                                Yearly
                                                <Badge variant="secondary">Save 15%</Badge>
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                ${yearlyPrice}/year - Billed annually
                                            </div>
                                        </Label>
                                        <div className="text-right">
                                            <div className="text-lg font-bold">${yearlyPrice}</div>
                                            <div className="text-xs text-muted-foreground">per year</div>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </CardContent>
                        </Card>
                    )}

                    {/* Payment Method */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Method</CardTitle>
                            <CardDescription>
                                {plan === 'free' 
                                    ? 'No payment required for the free plan' 
                                    : 'Secure payment powered by PayPal'
                                }
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {plan === 'free' ? (
                                <Button 
                                    onClick={handleFreePlan} 
                                    className="w-full" 
                                    size="lg"
                                    disabled={processing}
                                >
                                    {processing ? 'Activating...' : 'Activate Free Plan'}
                                </Button>
                            ) : (
                                <div>
                                    <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                                        <Shield className="h-4 w-4" />
                                        <span>Secure checkout with PayPal</span>
                                    </div>
                                    <div id="paypal-button-container" className="min-h-[150px]">
                                        {!isPayPalLoaded && (
                                            <div className="flex items-center justify-center h-[150px]">
                                                <div className="text-muted-foreground">Loading PayPal...</div>
                                            </div>
                                        )}
                                    </div>
                                    {processing && (
                                        <div className="text-center text-muted-foreground mt-4">
                                            Processing payment...
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Features Included */}
                    <Card>
                        <CardHeader>
                            <CardTitle>What's Included</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>Access to all platform features</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>Secure payment processing</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>24/7 customer support</span>
                                </li>
                                <li className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span>Cancel anytime</span>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>

                {/* Order Summary Sidebar */}
                <div>
                    <Card className="sticky top-4">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-muted-foreground">Plan</span>
                                    <span className="font-semibold">
                                        {plan.charAt(0).toUpperCase() + plan.slice(1)}
                                    </span>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <span className="text-muted-foreground">Billing</span>
                                    <span className="font-semibold capitalize">{selectedCycle}</span>
                                </div>
                                {selectedCycle === 'yearly' && plan !== 'free' && (
                                    <div className="flex justify-between mb-2">
                                        <span className="text-muted-foreground">Discount</span>
                                        <Badge variant="secondary">15% off</Badge>
                                    </div>
                                )}
                            </div>
                            
                            <Separator />
                            
                            <div className="flex justify-between items-baseline">
                                <span className="text-lg font-semibold">Total</span>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-primary">
                                        ${currentAmount}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {currency} / {selectedCycle === 'monthly' ? 'month' : 'year'}
                                    </div>
                                </div>
                            </div>

                            {selectedCycle === 'yearly' && plan !== 'free' && (
                                <div className="text-xs text-muted-foreground text-center">
                                    You save ${(monthlyPrice * 12) - yearlyPrice} per year
                                </div>
                            )}

                            <Separator />

                            <div className="text-xs text-muted-foreground space-y-1">
                                <p>✓ Secure payment via PayPal</p>
                                <p>✓ Cancel anytime</p>
                                <p>✓ Instant activation</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

