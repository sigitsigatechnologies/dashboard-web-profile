import { cookies } from 'next/headers';
import { translations, Language } from '@/lib/translations';

export async function getServerTranslations() {
    const cookieStore = await cookies();
    const rawLanguage = cookieStore.get('language')?.value;
    const language: Language = (rawLanguage === 'en' || rawLanguage === 'id') ? rawLanguage : 'id';

    const t = (key: string): string => {
        const langDict = (translations as any)[language] || translations.id;
        return langDict[key] || key;
    };

    return { t, language };
}
