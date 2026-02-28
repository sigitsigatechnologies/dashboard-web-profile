"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn, getDirectImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X, School } from "lucide-react";
import { useState } from "react";

const navigation = [
    { name: "Home", href: "/" },
    { name: "Profile", href: "/profile" },
    { name: "News", href: "/news" },
    { name: "Agenda", href: "/agenda" },
    { name: "Contact", href: "/contact" },
];

export function Navbar({ profile }: { profile: any }) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            {profile?.logo ? (
                                <Image
                                    src={getDirectImageUrl(profile.logo)}
                                    alt={profile.schoolName}
                                    width={48}
                                    height={48}
                                    className="h-12 w-auto object-contain"
                                    unoptimized
                                />
                            ) : (
                                <School className="h-10 w-10 text-blue-600" />
                            )}
                            <span className="text-xl font-bold tracking-tight">{profile?.schoolName || "EduCenter"}</span>
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={cn(
                                        "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                                        pathname === item.href
                                            ? "bg-primary text-primary-foreground"
                                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link href="/login">
                                <Button variant="outline" size="sm">Admin Login</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden border-b bg-background">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "block px-3 py-2 rounded-md text-base font-medium",
                                    pathname === item.href
                                        ? "bg-primary text-primary-foreground"
                                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        <Link
                            href="/login"
                            className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={() => setIsOpen(false)}
                        >
                            Admin Login
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
