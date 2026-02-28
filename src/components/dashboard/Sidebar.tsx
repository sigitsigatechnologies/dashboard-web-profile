"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    FileText,
    Calendar,
    Users,
    Building2,
    MessageSquare,
    LogOut,
    School,
    Trophy,
    Star
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const sidebarLinks = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Posts", href: "/dashboard/posts", icon: FileText },
    { name: "Agenda", href: "/dashboard/agenda", icon: Calendar },
    { name: "Teachers", href: "/dashboard/teachers", icon: Users },
    { name: "Features", href: "/dashboard/features", icon: Trophy },
    { name: "Facilities", href: "/dashboard/facilities", icon: Star },
    { name: "School Profile", href: "/dashboard/school", icon: Building2 },
    { name: "Messages", href: "/dashboard/messages", icon: MessageSquare },
    { name: "Users", href: "/dashboard/users", icon: Users, adminOnly: true },
];

export function DashboardSidebar() {
    const pathname = usePathname();
    const { data: session } = useSession();
    const role = (session?.user as any)?.role;

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-card text-card-foreground">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/" className="flex items-center gap-2">
                    <School className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold tracking-tight">EduCenter CMS</span>
                </Link>
            </div>
            <div className="flex-1 overflow-y-auto py-6">
                <nav className="space-y-1 px-3">
                    {sidebarLinks.map((link) => {
                        if (link.adminOnly && role !== "ADMIN") return null;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                            >
                                <link.icon className={cn("mr-3 h-5 w-5", isActive ? "" : "text-muted-foreground group-hover:text-accent-foreground")} />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="border-t p-4">
                <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                    <LogOut className="mr-3 h-5 w-5" />
                    Logout
                </button>
            </div>
        </div>
    );
}
