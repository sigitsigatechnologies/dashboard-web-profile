"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations, Language } from '@/lib/translations';

export { type Language };

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children, initialLanguage = 'id' }: { children: React.ReactNode, initialLanguage?: Language }) {
    const [language, setLanguageState] = useState<Language>(initialLanguage);

    useEffect(() => {
        const savedLang = document.cookie.split('; ').find(row => row.startsWith('language='))?.split('=')[1] as Language;
        if (savedLang && (savedLang === 'id' || savedLang === 'en')) {
            setLanguageState(savedLang);
        }
    }, []);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        document.cookie = `language=${lang}; path=/; max-age=31536000`; // 1 year
        window.location.reload(); // Reload to update server components
    };

    const t = (key: string): string => {
        const langDict = (translations as any)[language] || translations.id;
        return langDict[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
