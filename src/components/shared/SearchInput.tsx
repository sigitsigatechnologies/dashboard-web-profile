"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
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

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (inputValue) {
                params.set(paramName, inputValue);
            } else {
                params.delete(paramName);
            }

            startTransition(() => {
                router.replace(`${pathname}?${params.toString()}`);
            });
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [inputValue, paramName, pathname, router, searchParams]);

    return (
        <div className={`relative group ${className}`}>
            <div className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 flex items-center justify-center pointer-events-none group-focus-within:text-primary transition-colors">
                {isPending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <Search className="h-5 w-5" />
                )}
            </div>
            <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={placeholder}
                className="w-full h-full pl-16 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-primary transition-all text-lg font-medium shadow-sm group-hover:shadow-xl"
            />
        </div>
    );
}
