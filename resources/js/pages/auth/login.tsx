import AuthenticatedSessionController from '@/actions/App/Http/Controllers/Auth/AuthenticatedSessionController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from '@/layouts/auth-layout';
import { route } from 'ziggy-js';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

const ACCOUNT_TABS = [
    {
        value: 'buyer',
        title: 'Buyer login',
        subtitle: 'Access sourcing workspace, collaborate with your team, and engage suppliers.',
    },
    {
        value: 'supplier',
        title: 'Supplier login',
        subtitle: 'Manage your profile, respond to RFQs, and track pipeline performance.',
    },
];

export default function Login({ status, canResetPassword }: LoginProps) {
    const [accountType, setAccountType] = useState<'buyer' | 'supplier'>('buyer');

    return (
        <AuthLayout
            title="Welcome back"
            description="Log in to continue managing your sourcing pipeline."
        >
            <Head title="Log in" />

            <Tabs value={accountType} onValueChange={(value) => setAccountType(value as 'buyer' | 'supplier')} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    {ACCOUNT_TABS.map((tab) => (
                        <TabsTrigger key={tab.value} value={tab.value} className="text-sm font-semibold">
                            {tab.value === 'buyer' ? 'Buyer' : 'Supplier'}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {ACCOUNT_TABS.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value} className="mt-6">
                        <p className="text-sm text-slate-600">{tab.subtitle}</p>
                    </TabsContent>
                ))}
            </Tabs>

            <Form
                action={route('login')}
                method="post"
                resetOnSuccess={['password']}
                className="mt-6 flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="account_type" value={accountType} />
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink href={route('password.request')} className="ml-auto text-sm">
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    name="password"
                                    required
                                    autoComplete="current-password"
                                    placeholder="Password"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox id="remember" name="remember" />
                                <Label htmlFor="remember" className="text-sm text-slate-600">
                                    Keep me signed in
                                </Label>
                            </div>

                            <Button type="submit" className="mt-2 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90" disabled={processing}>
                                {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                                Log in
                            </Button>
                        </div>

                        <div className="text-center text-sm text-slate-600">
                            New to Industrial Hub?{' '}
                            <TextLink href={`${route('register')}?type=${accountType}`}>
                                Create an account
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}
        </AuthLayout>
    );
}
