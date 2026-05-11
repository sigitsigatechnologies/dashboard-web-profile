"use client";

import { SessionProvider } from "next-auth/react";
import { LanguageProvider, Language } from "@/context/LanguageContext";
import { ThemeProvider } from "next-themes";

export function Providers({ children, initialLanguage }: { children: React.ReactNode, initialLanguage: Language }) {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
                <LanguageProvider initialLanguage={initialLanguage}>
                    {children}
                </LanguageProvider>
            </SessionProvider>
        </ThemeProvider>
    );
}
