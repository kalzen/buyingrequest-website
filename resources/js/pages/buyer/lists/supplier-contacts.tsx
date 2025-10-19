import DashboardLayout from "@/layouts/dashboard-layout"
import { ContactsDataTable } from "@/components/contacts-data-table"
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { route } from 'ziggy-js';
import { Link } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';
import { usePage } from '@inertiajs/react';

interface Supplier {
    name: string;
    email: string;
}

interface BuyerRequest {
    id: number;
    title: string;
}

interface SupplierContact {
    id: number;
    subject: string;
    message: string;
    contact_type: string;
    status: string;
    contacted_at: string;
    replied_at: string | null;
    supplier: Supplier;
    buyer_request: BuyerRequest | null;
}

interface PageProps extends Record<string, unknown> {
    contacts: {
        data: SupplierContact[];
        links: any[];
        meta: any;
    };
}

export default function SupplierContacts() {
    const { contacts } = usePage<PageProps>().props;

    return (
        <DashboardLayout role="buyer" title="Supplier Contacts" pageTitle="Supplier Contacts">
            {/* Header */}
            <div className="mb-8 px-4 lg:px-6">
                <Link href={route('buyer.dashboard')} className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4">
                    <ArrowLeft className="size-4" />
                    Back to Dashboard
                </Link>
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Supplier Contacts
                        </h1>
                        <p className="text-muted-foreground">
                            Track your communications with suppliers and manage your sourcing relationships.
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats */}
            <div className="mb-8 px-4 lg:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">{contacts.data.length}</div>
                            <div className="text-sm text-muted-foreground">Total Contacts</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {contacts.data.filter(c => c.status === 'pending').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Pending</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {contacts.data.filter(c => c.status === 'replied').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Replied</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="p-6 text-center">
                            <div className="text-2xl font-bold text-foreground mb-1">
                                {contacts.data.filter(c => c.status === 'closed').length}
                            </div>
                            <div className="text-sm text-muted-foreground">Closed</div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* DataTable */}
            <div className="px-4 lg:px-6">
                {contacts.data.length > 0 ? (
                    <ContactsDataTable data={contacts.data} />
                ) : (
                    <Card>
                        <CardContent className="p-12 text-center">
                            <div className="text-muted-foreground mb-4">
                                <h3 className="text-lg font-semibold mb-2">No Supplier Contacts</h3>
                                <p>You haven't contacted any suppliers yet. Start by creating a request and reaching out to suppliers.</p>
                            </div>
                            <Link href={route('buyer.requests.create')}>
                                <Button>
                                    <Plus className="size-4 mr-2" />
                                    Create Your First Request
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </DashboardLayout>
    );
}
