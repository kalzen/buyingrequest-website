<?php

namespace App\Http\Controllers\Supplier;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SubscriptionController extends Controller
{
    /**
     * Show pricing plans
     */
    public function index(): Response
    {
        $user = auth()->user();
        $currentSubscription = $user->activeSubscription();

        return Inertia::render('supplier/subscription/index', [
            'currentPlan' => $currentSubscription ? [
                'plan' => $currentSubscription->plan,
                'amount' => $currentSubscription->amount,
                'currency' => $currentSubscription->currency,
                'status' => $currentSubscription->status,
                'current_period_end' => $currentSubscription->current_period_end?->format('M d, Y'),
                'billing_cycle' => $currentSubscription->billing_cycle,
            ] : null,
        ]);
    }

    /**
     * Show checkout page for a specific plan
     */
    public function checkout(Request $request): Response
    {
        $plan = $request->input('plan', 'basic');
        $billingCycle = $request->input('billing_cycle', 'monthly');

        $planPrices = [
            'free' => 0,
            'basic' => 25,
            'pro' => 40,
            'premium' => 60,
            'enterprise' => 80,
        ];

        $amount = $planPrices[$plan] ?? 0;
        if ($billingCycle === 'yearly') {
            $amount = $amount * 12 * 0.85; // 15% discount for yearly
        }

        return Inertia::render('supplier/subscription/checkout', [
            'plan' => $plan,
            'amount' => $amount,
            'currency' => 'USD',
            'billing_cycle' => $billingCycle,
            'paypal_client_id' => config('services.paypal.client_id', 'sandbox_client_id'),
        ]);
    }

    /**
     * Create subscription after PayPal approval
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'plan' => 'required|in:free,basic,pro,premium,enterprise',
            'billing_cycle' => 'required|in:monthly,yearly',
            'paypal_subscription_id' => 'nullable|string',
            'paypal_payer_id' => 'nullable|string',
        ]);

        $planPrices = [
            'free' => 0,
            'basic' => 25,
            'pro' => 40,
            'premium' => 60,
            'enterprise' => 80,
        ];

        $amount = $planPrices[$validated['plan']];
        if ($validated['billing_cycle'] === 'yearly') {
            $amount = $amount * 12 * 0.85;
        }

        // Cancel any existing active subscriptions
        Subscription::where('user_id', auth()->id())
            ->where('status', 'active')
            ->update(['status' => 'cancelled', 'cancelled_at' => now()]);

        // Create new subscription
        $subscription = Subscription::create([
            'user_id' => auth()->id(),
            'plan' => $validated['plan'],
            'amount' => $amount,
            'currency' => 'USD',
            'billing_cycle' => $validated['billing_cycle'],
            'status' => $validated['plan'] === 'free' ? 'active' : 'pending',
            'paypal_subscription_id' => $validated['paypal_subscription_id'] ?? null,
            'paypal_payer_id' => $validated['paypal_payer_id'] ?? null,
            'current_period_start' => now(),
            'current_period_end' => $validated['billing_cycle'] === 'monthly' 
                ? now()->addMonth() 
                : now()->addYear(),
        ]);

        return redirect()->route('supplier.subscription')
            ->with('success', 'Subscription activated successfully!');
    }

    /**
     * Activate subscription after PayPal payment
     */
    public function activate(Request $request)
    {
        $validated = $request->validate([
            'subscription_id' => 'required|exists:subscriptions,id',
            'paypal_order_id' => 'required|string',
        ]);

        $subscription = Subscription::findOrFail($validated['subscription_id']);

        if ($subscription->user_id !== auth()->id()) {
            abort(403);
        }

        $subscription->update([
            'status' => 'active',
            'paypal_subscription_id' => $validated['paypal_order_id'],
        ]);

        return redirect()->route('supplier.dashboard')
            ->with('success', 'Payment successful! Your subscription is now active.');
    }

    /**
     * Cancel subscription
     */
    public function cancel()
    {
        $subscription = auth()->user()->activeSubscription();

        if (!$subscription) {
            return redirect()->route('supplier.subscription')
                ->with('error', 'No active subscription found.');
        }

        $subscription->update([
            'status' => 'cancelled',
            'cancelled_at' => now(),
        ]);

        return redirect()->route('supplier.subscription')
            ->with('success', 'Subscription cancelled. You can continue using it until the end of the current period.');
    }
}
