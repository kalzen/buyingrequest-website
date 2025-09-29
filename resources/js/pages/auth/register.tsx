import RegisteredUserController from '@/actions/App/Http/Controllers/Auth/RegisteredUserController';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthLayout from '@/layouts/auth-layout';
import { route } from 'ziggy-js';
import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useMemo, useState } from 'react';

const COUNTRIES = [
    'United States',
    'United Kingdom',
    'Germany',
    'Japan',
    'South Korea',
    'Singapore',
    'Canada',
    'Australia',
    'Netherlands',
    'Sweden',
    'Norway',
    'Denmark',
];

const ACCOUNT_TABS = [
    {
        value: 'buyer',
        title: 'Buyer registration',
        subtitle: 'Source verified suppliers and manage RFQs.',
    },
    {
        value: 'supplier',
        title: 'Supplier registration',
        subtitle: 'Showcase capabilities and receive qualified leads.',
    },
];

export default function Register() {
    const [accountType, setAccountType] = useState<'buyer' | 'supplier'>('buyer');
    const countries = useMemo(() => COUNTRIES.sort((a, b) => a.localeCompare(b)), []);

    return (
        <AuthLayout
            title="Join Industrial Hub"
            description="Create your account to connect buyers and suppliers across global supply chains."
        >
            <Head title="Register" />

            <div className="w-full max-w-6xl mx-auto">
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
                    action={route('register')}
                    method="post"
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="mt-6 flex flex-col gap-6"
                >
                {({ processing, errors }) => (
                    <>
                        <input type="hidden" name="account_type" value={accountType} />

                        {accountType === 'buyer' ? (
                            <BuyerFields errors={errors} />
                        ) : (
                            <SupplierFields errors={errors} countries={countries} />
                        )}

                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                required
                                autoComplete="new-password"
                                placeholder="Create a password"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation">Confirm password</Label>
                            <Input
                                id="password_confirmation"
                                type="password"
                                name="password_confirmation"
                                required
                                autoComplete="new-password"
                                placeholder="Re-enter password"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button
                            type="submit"
                            className="mt-2 h-12 rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                            Create account
                        </Button>

                        <div className="text-center text-sm text-slate-600">
                            Already registered?{' '}
                            <TextLink href={`${route('login')}?type=${accountType}`}>Log in</TextLink>
                        </div>
                    </>
                )}
                </Form>
            </div>
        </AuthLayout>
    );
}

function BuyerFields({ errors }: { errors: Record<string, string | undefined> }) {
    return (
        <div className="grid gap-5">
            <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" type="text" name="name" autoComplete="name" required placeholder="John Smith" />
                <InputError message={errors.name} />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="buyer_email">Email address</Label>
                <Input id="buyer_email" type="email" name="email" autoComplete="email" required placeholder="you@company.com" />
                <InputError message={errors.email} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="buyer_phone">Phone number</Label>
                    <Input id="buyer_phone" type="tel" name="phone" autoComplete="tel" required placeholder="+1 555 123 4567" />
                    <InputError message={errors.phone} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="buyer_company">Company</Label>
                    <Input id="buyer_company" type="text" name="company" autoComplete="organization" placeholder="Company name" />
                    <InputError message={errors.company} />
                </div>
            </div>
        </div>
    );
}

function SupplierFields({
    errors,
    countries,
}: {
    errors: Record<string, string | undefined>;
    countries: string[];
}) {
    return (
        <div className="grid gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="supplier_contact">Representative name</Label>
                    <Input
                        id="supplier_contact"
                        type="text"
                        name="name"
                        required
                        placeholder="Sarah Johnson"
                    />
                    <InputError message={errors.name} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="company_name">Company name</Label>
                    <Input id="company_name" type="text" name="company_name" required placeholder="ABC Manufacturing Co." />
                    <InputError message={errors.company_name} />
                </div>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="supplier_address">Headquarters address</Label>
                <Input id="supplier_address" type="text" name="address" required placeholder="123 Industrial Boulevard, Downtown" />
                <InputError message={errors.address} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="supplier_country">Country</Label>
                    <Select name="country" required>
                        <SelectTrigger id="supplier_country" className="h-11">
                            <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                            {countries.map((country) => (
                                <SelectItem key={country} value={country}>
                                    {country}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <InputError message={errors.country} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="supplier_phone">Phone number</Label>
                    <Input id="supplier_phone" type="tel" name="phone" required placeholder="+1 555 987 6543" />
                    <InputError message={errors.phone} />
                </div>
            </div>
            
            <div className="grid gap-2">
                <Label htmlFor="supplier_email">Work email</Label>
                <Input id="supplier_email" type="email" name="email" required placeholder="sales@yourcompany.com" />
                <InputError message={errors.email} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="industry">Industry / sector</Label>
                    <Input id="industry" type="text" name="industry" required placeholder="Precision machining, automotive" />
                    <InputError message={errors.industry} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="products">Main products</Label>
                    <Input id="products" type="text" name="products" required placeholder="CNC components, sheet metal fabrication" />
                    <InputError message={errors.products} />
                </div>
            </div>
        </div>
    );
}