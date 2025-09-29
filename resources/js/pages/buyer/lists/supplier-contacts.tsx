import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { route } from 'ziggy-js';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Mail, MessageSquare, Clock, User, FileText } from 'lucide-react';
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

    const getContactTypeLabel = (type: string) => {
        const labels = {
            inquiry: 'General Inquiry',
            quote_request: 'Quote Request',
            follow_up: 'Follow Up',
            other: 'Other'
        };
        return labels[type as keyof typeof labels] || type;
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'replied': return 'bg-green-100 text-green-800';
            case 'closed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getContactTypeColor = (type: string) => {
        switch (type) {
            case 'quote_request': return 'bg-blue-100 text-blue-800';
            case 'inquiry': return 'bg-purple-100 text-purple-800';
            case 'follow_up': return 'bg-orange-100 text-orange-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <>
            <Head title="Supplier Contacts" />
            
            <div className="min-h-screen bg-[#f5f7fb]">
                {/* Header */}
                <header className="border-b border-[#d6e0f5] bg-white/90 backdrop-blur">
                    <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between gap-6 px-4 py-4">
                        <Link href={route('home')} className="flex items-center gap-3 text-primary">
                            <span className="flex size-12 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground">
                                II
                            </span>
                            <div className="leading-tight">
                                <p className="text-lg font-semibold text-foreground">INDUSTRIAL HUB</p>
                                <p className="text-xs font-medium uppercase tracking-[0.3em] text-primary/70">
                                    Connect. Source. Grow.
                                </p>
                            </div>
                        </Link>

                        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
                            <Link 
                                href={route('buyer.dashboard')} 
                                className="group inline-flex items-center gap-1 rounded-full px-3 py-2 text-slate-600 transition hover:bg-primary/10 hover:text-primary"
                            >
                                Back to Dashboard
                            </Link>
                        </nav>

                        <div className="text-sm text-slate-600 font-medium">
                            Supplier Contacts
                        </div>
                    </div>
                </header>

                {/* Main Content */}
                <main className="bg-gradient-to-b from-white via-[#f0f4ff] to-[#f5f7fb]">
                    <div className="mx-auto w-full max-w-7xl px-4 py-12">
                        {/* Header */}
                        <div className="mb-8">
                            <Link href={route('buyer.dashboard')} className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-primary mb-4">
                                <ArrowLeft className="size-4" />
                                Back to Dashboard
                            </Link>
                            <div>
                                <h1 className="text-3xl font-bold text-foreground mb-2">
                                    Supplier Contacts
                                </h1>
                                <p className="text-slate-600">
                                    Track your communications with suppliers and manage your sourcing relationships.
                                </p>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="mb-8">
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">{contacts.data.length}</div>
                                        <div className="text-sm text-slate-600">Total Contacts</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {contacts.data.filter(c => c.status === 'pending').length}
                                        </div>
                                        <div className="text-sm text-slate-600">Pending</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {contacts.data.filter(c => c.status === 'replied').length}
                                        </div>
                                        <div className="text-sm text-slate-600">Replied</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardContent className="p-6 text-center">
                                        <div className="text-2xl font-bold text-foreground mb-1">
                                            {contacts.data.filter(c => c.status === 'closed').length}
                                        </div>
                                        <div className="text-sm text-slate-600">Closed</div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>

                        {/* Contacts List */}
                        {contacts.data.length > 0 ? (
                            <div className="space-y-6">
                                {contacts.data.map((contact) => (
                                    <Card key={contact.id} className="hover:shadow-lg transition-shadow">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <h3 className="text-xl font-semibold text-foreground">{contact.subject}</h3>
                                                        <Badge className={getStatusColor(contact.status)}>
                                                            {contact.status}
                                                        </Badge>
                                                        <Badge className={getContactTypeColor(contact.contact_type)}>
                                                            {getContactTypeLabel(contact.contact_type)}
                                                        </Badge>
                                                    </div>
                                                    
                                                    <div className="mb-4">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <User className="size-4 text-slate-500" />
                                                            <span className="font-medium text-foreground">{contact.supplier.name}</span>
                                                            <span className="text-slate-500">({contact.supplier.email})</span>
                                                        </div>
                                                        
                                                        {contact.buyer_request && (
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <FileText className="size-4 text-slate-500" />
                                                                <Link 
                                                                    href={route('requests.show', contact.buyer_request.id)}
                                                                    className="text-primary hover:underline"
                                                                >
                                                                    {contact.buyer_request.title}
                                                                </Link>
                                                            </div>
                                                        )}
                                                        
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="size-4 text-slate-500" />
                                                            <span className="text-slate-600">Contacted: {contact.contacted_at}</span>
                                                            {contact.replied_at && (
                                                                <>
                                                                    <span className="text-slate-400">•</span>
                                                                    <span className="text-slate-600">Replied: {contact.replied_at}</span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="bg-slate-50 rounded-lg p-4">
                                                        <div className="flex items-start gap-2">
                                                            <MessageSquare className="size-4 text-slate-500 mt-1" />
                                                            <p className="text-slate-700">{contact.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex gap-2 ml-4">
                                                    <Button variant="outline" size="sm">
                                                        <Mail className="size-4 mr-2" />
                                                        Reply
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <Card>
                                <CardContent className="p-12 text-center">
                                    <div className="text-slate-500 mb-4">
                                        <Mail className="size-16 mx-auto mb-4" />
                                        <h3 className="text-lg font-semibold mb-2">No Supplier Contacts</h3>
                                        <p>You haven't contacted any suppliers yet. Start by creating a request and reaching out to suppliers.</p>
                                    </div>
                                    <Link href={route('buyer.requests.create')}>
                                        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                                            Create Your First Request
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-[#d6e0f5] bg-white">
                    <div className="mx-auto w-full max-w-7xl px-4 py-8">
                        <div className="flex items-center justify-center space-x-8">
                            <Link 
                                href={route('home')} 
                                className="text-sm font-medium text-slate-600 transition hover:text-primary"
                            >
                                About Us
                            </Link>
                            <Link 
                                href={route('home')} 
                                className="text-sm font-medium text-slate-600 transition hover:text-primary"
                            >
                                Pricing
                            </Link>
                            <Link 
                                href={route('home')} 
                                className="text-sm font-medium text-slate-600 transition hover:text-primary"
                            >
                                Contact
                            </Link>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
