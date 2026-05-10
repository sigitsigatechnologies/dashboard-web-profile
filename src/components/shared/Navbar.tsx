"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn, getDirectImageUrl } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X, School, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const navigation = [
    { nameKey: "nav.home", href: "/" },
    { nameKey: "nav.profile", href: "/profile" },
    { nameKey: "nav.facilities", href: "/facilities" },
    { nameKey: "nav.teachers", href: "/teachers" },
    { nameKey: "nav.news", href: "/news" },
    { nameKey: "nav.agenda", href: "/agenda" },
    { nameKey: "nav.contact", href: "/contact" },
];

export function Navbar({ profile }: { profile: any }) {
    const pathname = usePathname();
    const { language, setLanguage, t } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "sticky top-0 z-50 w-full transition-all duration-300 border-b",
            scrolled 
                ? "bg-white/95 backdrop-blur-md shadow-md py-3 px-6 md:px-12" 
                : "bg-white py-4 px-6 md:px-12"
        )}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-5 group">
                            <div className="bg-white p-3 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl border border-slate-100">
                                {profile?.logo ? (
                                    <Image
                                        src={getDirectImageUrl(profile.logo)}
                                        alt={profile.schoolName}
                                        width={48}
                                        height={48}
                                        className="h-10 w-auto object-contain"
                                        unoptimized
                                    />
                                ) : (
                                    <School className="h-10 w-10 text-primary" />
                                )}
                            </div>
                            <span className={cn(
                                "text-2xl md:text-3xl font-black tracking-tighter font-heading transition-colors duration-500 text-slate-900"
                            )}>
                                {profile?.schoolName || "EduCenter"}
                            </span>
                        </Link>
                    </div>
                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-2">
                            {navigation.map((item) => (
                                <Link
                                    key={item.nameKey}
                                    href={item.href}
                                    className={cn(
                                        "px-7 py-3 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] transition-all duration-500 font-heading",
                                        pathname === item.href
                                            ? "bg-primary text-slate-900 shadow-2xl shadow-primary/30"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                                    )}
                                >
                                    {t(item.nameKey)}
                                </Link>
                            ))}
                            
                            <div className="flex items-center ml-4 pl-4 border-l border-slate-200 space-x-4">
                                <button
                                    onClick={() => setLanguage(language === 'id' ? 'en' : 'id')}
                                    className="flex items-center space-x-2 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-widest border-2 border-slate-200 hover:border-primary transition-all group"
                                >
                                    <Globe className="h-4 w-4 text-slate-400 group-hover:text-primary" />
                                    <span>{language.toUpperCase()}</span>
                                </button>
                                
                                <Link href="/login">
                                    <Button 
                                        variant="outline" 
                                        size="lg" 
                                        className={cn(
                                            "rounded-2xl font-black text-xs uppercase tracking-[0.2em] border-2 border-slate-900 text-slate-900 h-14 px-10 hover:bg-slate-900 hover:text-white transition-all duration-500"
                                        )}
                                    >
                                        {t("nav.login")}
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={cn(
                                "inline-flex items-center justify-center p-4 rounded-2xl transition-all duration-500 text-slate-900 hover:bg-white shadow-xl border border-slate-100"
                            )}
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                </div>
            </div>
        </div>

            {/* Mobile menu */}
            {isOpen && (
                <div className="md:hidden mt-2 animate-fade-in px-6">
                    <div className="bg-white rounded-2xl p-6 space-y-2 shadow-xl border border-slate-100">
                        {navigation.map((item) => (
                            <Link
                                key={item.nameKey}
                                href={item.href}
                                className={cn(
                                    "block px-6 py-4 rounded-2xl text-base font-bold font-heading transition-colors",
                                    pathname === item.href
                                        ? "bg-primary text-slate-900"
                                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                {t(item.nameKey)}
                            </Link>
                        ))}
                        
                        <div className="pt-4 border-t border-slate-100 flex items-center justify-between px-4">
                            <span className="text-xs font-black uppercase tracking-widest text-slate-400">Language</span>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => { setLanguage('id'); setIsOpen(false); }}
                                    className={cn("px-4 py-2 rounded-xl text-xs font-black", language === 'id' ? "bg-primary" : "bg-slate-100")}
                                >
                                    ID
                                </button>
                                <button 
                                    onClick={() => { setLanguage('en'); setIsOpen(false); }}
                                    className={cn("px-4 py-2 rounded-xl text-xs font-black", language === 'en' ? "bg-primary" : "bg-slate-100")}
                                >
                                    EN
                                </button>
                            </div>
                        </div>

                        <Link
                            href="/login"
                            className="block px-6 py-4 rounded-2xl text-base font-black font-heading text-white bg-slate-900 mt-6 text-center shadow-xl"
                            onClick={() => setIsOpen(false)}
                        >
                            {t("nav.login")}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
