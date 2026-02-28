import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

// Mock data until DB is seeded
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { prisma } from "@/lib/prisma";
import { formatDate, getDirectImageUrl } from "@/lib/utils";

export default async function NewsPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container mx-auto px-4 py-32">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">School News</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl">
                        Discover the latest stories, achievements, and updates from the EduCenter Academy community.
                    </p>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search articles..." className="pl-10 h-12 rounded-full bg-accent/30 border-none" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {posts.map((post) => (
                    <Link key={post.id} href={`/news/${post.slug}`} className="group h-full">
                        <article className="flex flex-col h-full bg-card rounded-[2rem] overflow-hidden border shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={getDirectImageUrl(post.featuredImage) || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                    unoptimized
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="bg-white/95 dark:bg-black/95 backdrop-blur-md text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-10 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="h-3.5 w-3.5" />
                                        <span>{formatDate(post.createdAt)}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <User className="h-3.5 w-3.5" />
                                        <span>{post.author}</span>
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4 line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-8 flex-1">
                                    {post.content}
                                </p>
                                <div className="flex items-center text-primary font-black text-sm uppercase tracking-wider gap-2">
                                    Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </article>
                    </Link>
                ))}
                {posts.length === 0 && (
                    <div className="col-span-1 md:col-span-3 text-center py-32 bg-accent/20 rounded-[3rem] border-2 border-dashed">
                        <h3 className="text-2xl font-bold text-muted-foreground">No news articles found</h3>
                        <p className="text-muted-foreground mt-2">Check back later for more updates.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
