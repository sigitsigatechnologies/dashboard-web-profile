import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Mock data until DB is seeded
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { prisma } from "@/lib/prisma";
import { formatDate, getDirectImageUrl } from "@/lib/utils";
import { SearchInput } from "@/components/shared/SearchInput";
import { Suspense } from "react";
import { getServerTranslations } from "@/lib/i18n";

export default async function NewsPage(props: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { t } = await getServerTranslations();
    const searchParams = await props.searchParams;
    const query = searchParams.q || "";

    const posts = await prisma.post.findMany({
        where: {
            published: true,
            OR: query ? [
                { title: { contains: query, mode: "insensitive" } },
                { content: { contains: query, mode: "insensitive" } },
                { category: { contains: query, mode: "insensitive" } },
            ] : undefined,
        },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="flex flex-col gap-32 pb-32 bg-white dark:bg-slate-950">
            {/* Page Header */}
            <section className="relative pt-60 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1504173010664-32509aeebb62?auto=format&fit=crop&q=80&w=2000"
                        alt="News Header"
                        fill
                        className="object-cover opacity-30 animate-ken-burns"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
                        {t("news.pageBadge")}
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white leading-none">
                        {t("news.pageHeadline")}
                    </h1>
                    <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed">
                        {t("news.pageSubheadline")}
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            {t("news.archiveBadge")}
                        </div>
                        <h2 className="text-5xl md:text-[6rem] font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
                            {t("news.exploreHeadline")}
                        </h2>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Suspense fallback={<div className="h-20 w-full animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
                            <SearchInput 
                                placeholder={t("news.searchPlaceholder")} 
                                className="h-20 px-8 rounded-3xl border-slate-200 dark:border-slate-700 focus:border-primary shadow-sm" 
                            />
                        </Suspense>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/news/${post.slug}`} className="group h-full">
                            <article className="flex flex-col h-full bg-white dark:bg-slate-950 rounded-[4.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] hover:-translate-y-4 transition-all duration-700">
                                <div className="relative h-80 w-full overflow-hidden">
                                    <Image
                                        src={getDirectImageUrl(post.featuredImage) || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        unoptimized
                                    />
                                    <div className="absolute top-8 left-8">
                                        <span className="bg-white dark:bg-slate-950/95 backdrop-blur-md text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-2xl shadow-xl border border-white/50">
                                            {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-12 flex flex-col flex-1">
                                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">
                                        <div className="flex items-center gap-3">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <User className="h-4 w-4" />
                                            <span>{post.author}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-black mb-6 line-clamp-2 leading-tight group-hover:text-primary transition-colors text-slate-900 dark:text-white">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-lg line-clamp-3 mb-10 flex-1">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center text-slate-900 dark:text-white font-black text-xs uppercase tracking-[0.3em] group-hover:text-primary transition-all">
                                        {t("news.readFull")} <ArrowRight className="h-6 w-6 ml-4 group-hover:translate-x-3 transition-transform" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>

                {posts.length === 0 && (
                    <div className="text-center py-48 bg-slate-50 dark:bg-slate-900 rounded-[5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                        <div className="w-24 h-24 bg-white dark:bg-slate-950 rounded-[2rem] flex items-center justify-center mx-auto mb-12 shadow-xl border border-slate-100 dark:border-slate-800">
                            <Search className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">{t("news.noArticles")}</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">{t("news.noArticlesSub")}</p>
                    </div>
                )}
            </section>
        </div>
    );
}
