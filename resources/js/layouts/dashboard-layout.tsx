import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"
import { Head } from '@inertiajs/react'
import { PropsWithChildren } from "react"

interface DashboardLayoutProps extends PropsWithChildren {
    role: "buyer" | "supplier"
    title?: string
    pageTitle?: string
}

export default function DashboardLayout({ 
    children, 
    role, 
    title = "Dashboard",
    pageTitle 
}: DashboardLayoutProps) {
    return (
        <>
            {pageTitle && <Head title={pageTitle} />}
            <SidebarProvider
                style={
                    {
                        "--sidebar-width": "16rem",
                        "--header-height": "4rem",
                    } as React.CSSProperties
                }
            >
                <AppSidebar variant="inset" role={role} />
                <SidebarInset>
                    <SiteHeader title={title} />
                    <div className="flex flex-1 flex-col gap-4 p-4">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </>
    )
}

