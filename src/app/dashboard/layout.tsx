import { AppSidebar } from "@/components/blocks/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="ms-4">
                { children }
            </main>
        </SidebarProvider>
    )
}