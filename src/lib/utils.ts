import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string) {
    return new Date(date).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

export function truncateText(text: string, length: number) {
    if (text.length <= length) return text;
    return text.slice(0, length) + "...";
}

export function getDirectImageUrl(url: string | null | undefined) {
    if (!url) return "";

    // If it's a local upload path, return as is
    if (url.startsWith("/uploads")) return url;

    // Handle Google Drive links (Legacy support, but prioritized to return original if possible)
    if (url.includes("drive.google.com")) {
        let fileId = "";
        const fileIdMatch = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
        if (fileIdMatch && fileIdMatch[1]) {
            fileId = fileIdMatch[1];
        } else {
            const idParamMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
            if (idParamMatch && idParamMatch[1]) {
                fileId = idParamMatch[1];
            }
        }

        if (fileId) {
            // Use standard direct link as fallback
            return `https://drive.google.com/uc?id=${fileId}`;
        }
    }

    return url;
}
