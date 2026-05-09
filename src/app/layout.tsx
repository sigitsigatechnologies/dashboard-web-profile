import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import { cookies } from "next/headers";
import { Language } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
    title: "EduCenter - Shaping Future Leaders",
    description: "Official school profile website for EduCenter, providing quality education and modern learning experiences.",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookieStore = await cookies();
    const language = (cookieStore.get('language')?.value as Language) || 'id';

    return (
        <html lang={language} suppressHydrationWarning>
            <body className={`${inter.variable} ${outfit.variable} font-sans`}>
                <Providers initialLanguage={language}>
                    {children}
                    <Toaster position="top-right" />
                </Providers>
            </body>
        </html>
    );
}
