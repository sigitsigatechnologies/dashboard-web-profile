"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider, Language } from "@/context/LanguageContext";

export function Providers({ children, initialLanguage }: { children: React.ReactNode, initialLanguage: Language }) {
    return (
        <SessionProvider>
            <LanguageProvider initialLanguage={initialLanguage}>
                {children}
            </LanguageProvider>
        </SessionProvider>
    );
}
