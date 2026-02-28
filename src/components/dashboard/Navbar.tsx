"use client";

import { useSession } from "next-auth/react";
import { User, Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function DashboardNavbar() {
    const { data: session } = useSession();

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-8">
            <div className="flex flex-1 items-center gap-4">
                <div className="relative w-64 lg:w-96">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search content..."
                        className="pl-10"
                    />
                </div>
            </div>
            <div className="flex items-center gap-6">
                <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2 rounded-full bg-primary"></span>
                </button>
                <div className="flex items-center gap-3 border-l pl-6">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold leading-none">{session?.user?.name || "Admin"}</p>
                        <p className="text-xs text-muted-foreground mt-1 capitalize">{session?.user?.role || "Administrator"}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center border">
                        <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </header>
    );
}
