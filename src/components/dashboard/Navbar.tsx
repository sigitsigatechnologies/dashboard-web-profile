"use client";

import { useSession } from "next-auth/react";
import { User, Bell, Search, Mail, X } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

export function DashboardNavbar() {
    const { data: session } = useSession();
    const [unreadCount, setUnreadCount] = useState(0);
    const [unreadMessages, setUnreadMessages] = useState<any[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const fetchUnreadInfo = async () => {
        try {
            const response = await fetch("/api/messages/unread");
            const data = await response.json();
            if (data.count !== undefined) {
                setUnreadCount(data.count);
                setUnreadMessages(data.messages || []);
            }
        } catch (error) {
            console.error("Failed to fetch unread info:", error);
        }
    };

    useEffect(() => {
        fetchUnreadInfo();
        const interval = setInterval(fetchUnreadInfo, 30000); // Refresh every 30 seconds
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        };

        if (showDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [showDropdown]);

    const handleMarkAsRead = async (id: string) => {
        try {
            await fetch(`/api/messages/${id}/read`, { method: "PUT" });
            fetchUnreadInfo();
        } catch (error) {
            console.error("Failed to mark as read:", error);
        }
    };

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
                <div className="relative" ref={dropdownRef}>
                    <button 
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="relative text-muted-foreground hover:text-foreground transition-colors p-2 rounded-full hover:bg-accent/50"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-background">
                                {unreadCount > 9 ? "9+" : unreadCount}
                            </span>
                        )}
                    </button>

                    {showDropdown && (
                        <div className="absolute right-0 mt-2 w-80 rounded-2xl border bg-card shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
                            <div className="p-4 border-b flex items-center justify-between bg-accent/50">
                                <h3 className="font-bold text-sm">Notifications</h3>
                                <span className="text-[10px] bg-primary text-white font-black px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                    {unreadCount} New
                                </span>
                            </div>
                            <div className="max-h-[350px] overflow-y-auto">
                                {unreadMessages.length === 0 ? (
                                    <div className="p-8 text-center">
                                        <Mail className="h-8 w-8 mx-auto mb-2 opacity-20" />
                                        <p className="text-xs text-muted-foreground">All messages read!</p>
                                    </div>
                                ) : (
                                    unreadMessages.map((msg) => (
                                        <Link
                                            key={msg.id}
                                            href="/dashboard/messages"
                                            onClick={() => {
                                                handleMarkAsRead(msg.id);
                                                setShowDropdown(false);
                                            }}
                                            className="flex flex-col gap-1 p-4 border-b hover:bg-muted/50 transition-colors"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="font-bold text-xs">{msg.name}</span>
                                                <span className="text-[10px] text-muted-foreground">{formatDate(msg.createdAt)}</span>
                                            </div>
                                            <p className="text-xs font-medium truncate">{msg.subject || "No Subject"}</p>
                                            <p className="text-[11px] text-muted-foreground line-clamp-1">{msg.body}</p>
                                        </Link>
                                    ))
                                )}
                            </div>
                            <Link 
                                href="/dashboard/messages" 
                                className="block p-3 text-center text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t"
                                onClick={() => setShowDropdown(false)}
                            >
                                View All Messages
                            </Link>
                        </div>
                    )}
                </div>
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
