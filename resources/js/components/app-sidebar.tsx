import * as React from "react"
import {
    Building,
    CheckCircle2,
    CreditCard,
    FileText,
    Home,
    LayoutDashboard,
    LogOut,
    Search,
    Settings,
    ShoppingCart,
    TrendingUp,
    Users,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Link, usePage } from "@inertiajs/react"
import { route } from "ziggy-js"

interface User {
    name: string;
    email: string;
    role?: string;
}

interface PageProps {
    auth: {
        user: User;
    };
}

interface NavItem {
    title: string;
    url: string;
    icon: React.ComponentType<{ className?: string }>;
}

export function AppSidebar({ variant = "sidebar", role = "buyer" }: { variant?: "sidebar" | "floating" | "inset"; role?: "buyer" | "supplier" }) {
    const { auth } = usePage<PageProps>().props;

    const buyerNavMain: NavItem[] = [
        {
            title: "Dashboard",
            url: route('buyer.dashboard'),
            icon: LayoutDashboard,
        },
        {
            title: "Active Requests",
            url: route('buyer.active-requests'),
            icon: FileText,
        },
        {
            title: "Supplier Contacts",
            url: route('buyer.supplier-contacts'),
            icon: Users,
        },
        {
            title: "Completed Orders",
            url: route('buyer.completed-orders'),
            icon: CheckCircle2,
        },
    ];

    const supplierNavMain: NavItem[] = [
        {
            title: "Dashboard",
            url: route('supplier.dashboard'),
            icon: LayoutDashboard,
        },
        {
            title: "RFQ Opportunities",
            url: route('supplier.rfqs'),
            icon: Search,
        },
        {
            title: "My Responses",
            url: route('supplier.responses'),
            icon: FileText,
        },
        {
            title: "Orders",
            url: route('supplier.orders'),
            icon: ShoppingCart,
        },
    ];

    const navQuickActions: NavItem[] = role === "buyer" ? [
        {
            title: "Post New RFQ",
            url: route('buyer.requests.create'),
            icon: FileText,
        },
        {
            title: "Browse Suppliers",
            url: route('suppliers.index'),
            icon: Search,
        },
    ] : [
        {
            title: "Browse RFQs",
            url: route('supplier.rfqs'),
            icon: Search,
        },
        {
            title: "My Responses",
            url: route('supplier.responses'),
            icon: FileText,
        },
    ];

    const navSettings: NavItem[] = role === "buyer" ? [
        {
            title: "My Profile",
            url: route('buyer.profile.edit'),
            icon: Settings,
        },
        {
            title: "Home",
            url: route('home'),
            icon: Home,
        },
    ] : [
        {
            title: "My Profile",
            url: route('supplier.profile.edit'),
            icon: Settings,
        },
        {
            title: "Pricing & Plans",
            url: route('supplier.subscription'),
            icon: CreditCard,
        },
        {
            title: "Home",
            url: route('home'),
            icon: Home,
        },
    ];

    const navMain = role === "buyer" ? buyerNavMain : supplierNavMain;

    return (
        <Sidebar variant={variant} collapsible="icon">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('home')}>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                    <span className="text-sm font-bold">EG</span>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">Export Go</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {role === "buyer" ? "Buyer Portal" : "Supplier Portal"}
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navQuickActions.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup className="mt-auto">
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navSettings.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild tooltip={item.title}>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild tooltip="Sign out">
                            <Link href={route('logout')} method="post" as="button">
                                <LogOut />
                                <span>Sign out</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    )
}
