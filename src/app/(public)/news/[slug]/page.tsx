import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, User, Calendar, Share2, Clock } from "lucide-react";
import { formatDate, getDirectImageUrl } from "@/lib/utils";
import { notFound } from "next/navigation";

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await prisma.post.findUnique({
        where: { slug: slug },
    });

    if (!post || !post.published) {
        return notFound();
    }

    const recentPosts = await prisma.post.findMany({
        where: {
            published: true,
            NOT: { id: post.id }
        },
        orderBy: { createdAt: "desc" },
        take: 4,
    });

    return (
        <div className="pb-20">
            {/* Article Hero */}
            <section className="relative h-[400px] md:h-[600px]">
                <Image
                    src={getDirectImageUrl(post.featuredImage) || "https://images.unsplash.com/photo-1523050853064-5d5ded1217e9?auto=format&fit=crop&q=80&w=2000"}
                    alt={post.title}
                    fill
                    className="object-cover brightness-[0.4]"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-slate-950 via-transparent to-transparent">
                    <div className="container mx-auto px-4 pb-20">
                        <Link href="/news" className="inline-flex items-center text-blue-200 hover:text-white mb-8 transition-colors font-medium">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to News
                        </Link>
                        <div className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full inline-block mb-6 shadow-xl">
                            {post.category}
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white max-w-5xl tracking-tight leading-[1.1]">
                            {post.title}
                        </h1>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="container mx-auto px-4 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-3 space-y-12">
                        <div className="flex flex-wrap items-center gap-8 text-sm text-muted-foreground border-b border-slate-100 dark:border-slate-800 pb-8">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                    <User className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Published By</p>
                                    <span className="font-bold text-foreground text-base">{post.author}</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-widest font-bold opacity-60">Posted On</p>
                                    <span className="font-bold text-foreground text-base">{formatDate(post.createdAt)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="prose prose-lg prose-slate max-w-none dark:prose-invert prose-headings:font-black prose-headings:tracking-tight prose-p:text-slate-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-img:rounded-[2rem] prose-img:shadow-2xl">
                            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-12">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800">
                            <h3 className="font-black text-xl mb-8 tracking-tight">Recent Stories</h3>
                            <div className="space-y-8">
                                {recentPosts.map((recent) => (
                                    <Link key={recent.id} href={`/news/${recent.slug}`} className="flex flex-col gap-4 group">
                                        <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-sm">
                                            <Image
                                                src={getDirectImageUrl(recent.featuredImage) || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400"}
                                                alt={recent.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                unoptimized
                                            />
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">{recent.category}</span>
                                            <h4 className="text-base font-bold line-clamp-2 group-hover:text-blue-600 transition-colors leading-snug">
                                                {recent.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-2 text-[10px] text-muted-foreground font-bold">
                                                <Clock className="h-3 w-3" />
                                                {formatDate(recent.createdAt)}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
