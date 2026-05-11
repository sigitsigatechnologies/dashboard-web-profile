"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState, useRef } from "react";
import { Search, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/Input";

export function SearchInput({ 
    placeholder = "Search...", 
    className = "",
    paramName = "q"
}: { 
    placeholder?: string; 
    className?: string;
    paramName?: string;
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [inputValue, setInputValue] = useState(searchParams.get(paramName) || "");

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        const timeoutId = setTimeout(() => {
            // Need to create new URLSearchParams from current to avoid stale params if other filters exist
            const params = new URLSearchParams(window.location.search);
            if (inputValue) {
                params.set(paramName, inputValue);
            } else {
                params.delete(paramName);
            }

            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`, { scroll: false });
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputValue, paramName, pathname, router]);

    return (
        <div className={`relative group ${className}`}>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 flex items-center justify-center pointer-events-none group-focus-within:text-primary transition-colors z-10">
                {isPending ? (
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                ) : (
                    <Search className="h-6 w-6" />
                )}
            </div>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className="w-full h-full pl-16 pr-6 rounded-[2rem] border-2 border-slate-100 bg-white dark:bg-slate-950 focus:border-primary transition-all text-lg font-medium shadow-[0_10px_40px_rgba(0,0,0,0.05)] focus:shadow-[0_20px_60px_rgba(0,0,0,0.1)] outline-none"
            />
        </div>
    );
}
