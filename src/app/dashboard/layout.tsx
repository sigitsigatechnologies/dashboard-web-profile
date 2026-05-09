import { DashboardSidebar } from "@/components/dashboard/Sidebar";
import { DashboardNavbar } from "@/components/dashboard/Navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="dashboard-theme">
            <div className="flex min-h-screen bg-slate-50/50">
                <DashboardSidebar />
                <div className="flex flex-1 flex-col">
                    <DashboardNavbar />
                    <main className="p-8 overflow-y-auto max-h-[calc(100vh-64px)]">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
