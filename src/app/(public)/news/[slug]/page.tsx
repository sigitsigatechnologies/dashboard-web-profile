import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { ArrowLeft, User, Calendar, Share2, Clock, Mail } from "lucide-react";
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
        <div className="pb-32 bg-white">
            {/* Article Hero */}
            <section className="relative h-[60vh] md:h-[80vh] min-h-[600px] flex items-end pt-40 overflow-hidden bg-slate-50">
                <Image
                    src={getDirectImageUrl(post.featuredImage) || "https://images.unsplash.com/photo-1523050853064-5d5ded1217e9?auto=format&fit=crop&q=80&w=2000"}
                    alt={post.title}
                    fill
                    className="object-cover opacity-40 animate-ken-burns"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
                
                <div className="container mx-auto px-4 pb-24 relative z-10">
                    <Link href="/news" className="inline-flex items-center text-slate-500 hover:text-primary mb-12 transition-all group font-black text-xs uppercase tracking-[0.3em]">
                        <ArrowLeft className="mr-3 h-5 w-5 group-hover:-translate-x-2 transition-transform" /> Back to School News
                    </Link>
                    <div className="inline-block bg-primary text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] px-6 py-3 rounded-2xl mb-10 shadow-xl border border-white/50">
                        {post.category}
                    </div>
                    <h1 className="text-5xl md:text-[7rem] font-black text-slate-900 max-w-6xl tracking-tighter leading-[0.9] mb-12">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-10 text-slate-500 font-black text-xs uppercase tracking-[0.3em]">
                        <div className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                                <Calendar className="h-5 w-5 text-primary group-hover:text-slate-900 transition-colors" />
                            </div>
                            {formatDate(post.createdAt)}
                        </div>
                        <div className="flex items-center gap-3 group">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center group-hover:bg-primary transition-colors">
                                <User className="h-5 w-5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                            </div>
                            By {post.author}
                        </div>
                    </div>
                </div>
            </section>

            {/* Article Content */}
            <section className="container mx-auto px-4 py-40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-2xl prose-slate max-w-none 
                            prose-headings:font-black prose-headings:tracking-tighter prose-headings:leading-none prose-headings:text-slate-900
                            prose-p:text-slate-600 prose-p:leading-[1.8] prose-p:font-medium
                            prose-img:rounded-[4rem] prose-img:shadow-3xl prose-blockquote:border-primary prose-blockquote:bg-slate-50
                            prose-blockquote:rounded-[3rem] prose-blockquote:p-12 prose-blockquote:not-italic
                            prose-blockquote:font-black prose-blockquote:text-slate-900">
                            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
                        </div>
                        
                        <div className="mt-32 pt-12 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex items-center gap-6">
                                <span className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Share Story</span>
                                <div className="flex gap-4">
                                    <button className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center hover:bg-primary hover:text-slate-900 hover:scale-110 transition-all duration-300">
                                        <Share2 className="h-6 w-6" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-16">
                        <div className="sticky top-32 space-y-16">
                            <div className="bg-slate-50 p-12 rounded-[4.5rem] border border-slate-100 shadow-xl">
                                <h3 className="font-black text-3xl mb-12 tracking-tighter text-slate-900">Recent Stories</h3>
                                <div className="space-y-12">
                                    {recentPosts.map((recent) => (
                                        <Link key={recent.id} href={`/news/${recent.slug}`} className="group flex items-start gap-6">
                                            <div className="relative w-24 h-24 rounded-[2rem] overflow-hidden shrink-0 shadow-lg group-hover:shadow-2xl transition-all duration-700">
                                                <Image
                                                    src={getDirectImageUrl(recent.featuredImage) || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=400"}
                                                    alt={recent.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                    unoptimized
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mb-2 block">{recent.category}</span>
                                                <h4 className="text-xl font-black line-clamp-2 group-hover:text-primary transition-colors leading-tight text-slate-900">
                                                    {recent.title}
                                                </h4>
                                                <div className="flex items-center gap-2 mt-3 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                                    <Clock className="h-3 w-3" />
                                                    {formatDate(recent.createdAt)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/news" className="flex items-center justify-center w-full mt-12 rounded-2xl h-16 bg-white border border-slate-200 text-slate-900 font-black text-xs uppercase tracking-[0.3em] hover:bg-primary hover:border-primary transition-all group">
                                    View All Stories
                                </Link>
                            </div>

                            <div className="rounded-[4.5rem] bg-slate-900 p-12 text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.15)]">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-10 relative z-10 border border-white/10">
                                    <Mail className="h-8 w-8 text-primary" />
                                </div>
                                <h4 className="text-3xl font-black mb-6 tracking-tighter leading-tight relative z-10">Get Updates</h4>
                                <p className="text-white/60 font-medium mb-10 relative z-10">Stay informed about our community's latest stories.</p>
                                <div className="space-y-4 relative z-10">
                                    <input 
                                        type="email" 
                                        placeholder="your@email.com" 
                                        className="w-full h-16 rounded-2xl bg-white/5 border border-white/10 px-8 text-white placeholder:text-white/30 focus:bg-white/10 transition-all outline-none font-medium"
                                    />
                                    <button className="w-full h-16 rounded-2xl bg-primary text-slate-900 hover:bg-primary/90 font-black text-xs uppercase tracking-[0.3em] shadow-xl transition-all">
                                        Join Community
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}
