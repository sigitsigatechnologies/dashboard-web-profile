import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { prisma } from "@/lib/prisma";
import { Calendar, ArrowRight, BookOpen, Users, Trophy, Star } from "lucide-react";
import { formatDate, getDirectImageUrl } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

export default async function HomePage() {
    const profile: any = await prisma.schoolProfile.findFirst();
    const features: any[] = await prisma.feature.findMany({ orderBy: { order: "asc" } });
    const latestPosts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 3,
    });
    const upcomingEvents = await prisma.agenda.findMany({
        where: { date: { gte: new Date() } },
        orderBy: { date: "asc" },
        take: 3,
    });

    return (
        <div className="flex flex-col gap-20 pb-20">
            {/* Hero Section */}
            <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={getDirectImageUrl(profile?.heroImage) || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=2000"}
                        alt="School Building"
                        fill
                        className="object-cover brightness-50"
                        priority
                        unoptimized
                    />
                </div>
                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight drop-shadow-2xl">
                        {profile?.heroHeadline || profile?.schoolName || "EduCenter Academy"}
                    </h1>
                    <p className="text-xl md:text-2xl mb-10 text-gray-200">
                        {profile?.heroSubheadline || "Empowering students to achieve excellence through innovation, creativity, and character development."}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Button size="lg" className="rounded-full px-12 shadow-xl" asChild>
                            <Link href="/contact">Register Now</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-full px-12 bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20" asChild>
                            <Link href="/profile">Learn More</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Quick Info / Vision */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.length > 0 ? (
                        features.map((feature, i) => {
                            const IconComponent = (LucideIcons as any)[feature.icon] || BookOpen;
                            const colors = [
                                "bg-blue-50 dark:bg-blue-900/10 border-blue-100 dark:border-blue-800 text-blue-500",
                                "bg-purple-50 dark:bg-purple-900/10 border-purple-100 dark:border-purple-800 text-purple-500",
                                "bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800 text-amber-500"
                            ];
                            const colorClass = colors[i % colors.length];

                            return (
                                <div key={feature.id} className={`p-8 rounded-3xl border ${colorClass.split(' ').slice(0, 2).join(' ')} flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300`}>
                                    <div className={`w-16 h-16 rounded-2xl ${colorClass.split(' ').slice(2).join(' ')} bg-current text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                        <IconComponent className="h-8 w-8" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-slate-100">{feature.title}</h3>
                                    <p className="text-muted-foreground">{feature.description}</p>
                                </div>
                            );
                        })
                    ) : (
                        <>
                            <div className="p-8 rounded-3xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-blue-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <BookOpen className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Academic Excellence</h3>
                                <p className="text-muted-foreground">Rigorous curriculum designed to challenge and inspire students at every level.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-purple-50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-800 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-purple-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Users className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Strong Community</h3>
                                <p className="text-muted-foreground">A supportive environment where every student is valued and encouraged to grow.</p>
                            </div>
                            <div className="p-8 rounded-3xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-800 flex flex-col items-center text-center group hover:shadow-xl transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Trophy className="h-8 w-8" />
                                </div>
                                <h3 className="text-xl font-bold mb-3">Global Future</h3>
                                <p className="text-muted-foreground">Preparing students with skills and mindset needed for success in a global society.</p>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* Latest News */}
            <section className="container mx-auto px-4">
                <div className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Latest News & Posts</h2>
                        <p className="text-muted-foreground text-lg font-medium">Stay updated with the latest happenings at our school.</p>
                    </div>
                    <Button variant="ghost" className="hidden md:flex group rounded-full" asChild>
                        <Link href="/news">
                            See All Posts <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {latestPosts.map((post) => (
                        <Link key={post.id} href={`/news/${post.slug}`} className="group">
                            <div className="flex flex-col h-full bg-card rounded-[2.5rem] overflow-hidden border shadow-sm group-hover:shadow-2xl group-hover:-translate-y-2 transition-all duration-500">
                                <div className="relative h-64 w-full overflow-hidden">
                                    <Image
                                        src={getDirectImageUrl(post.featuredImage) || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        unoptimized
                                    />
                                    <div className="absolute top-6 left-6 bg-white/90 dark:bg-black/80 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {post.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <span className="text-xs font-bold text-blue-600 mb-3 tracking-wider uppercase">{formatDate(post.createdAt)}</span>
                                    <h3 className="text-2xl font-black mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-muted-foreground text-sm line-clamp-3 mb-8 flex-1 leading-relaxed">
                                        {post.content}
                                    </p>
                                    <div className="flex items-center text-blue-600 font-black text-xs tracking-widest uppercase">
                                        Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-32">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Upcoming Events</h2>
                        <p className="text-muted-foreground text-xl max-w-2xl mx-auto font-medium">Mark your calendars for these exciting events happening soon.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {upcomingEvents.map((event) => (
                            <Link key={event.id} href={`/agenda`} className="group">
                                <div className="flex flex-col md:flex-row bg-card rounded-[2rem] overflow-hidden border shadow-sm hover:shadow-xl transition-all duration-500">
                                    <div className="w-full md:w-40 bg-blue-600 text-white flex flex-col items-center justify-center p-4 relative min-h-[120px]">
                                        {event.image && (
                                            <Image
                                                src={getDirectImageUrl(event.image)}
                                                alt=""
                                                fill
                                                className="object-cover opacity-30"
                                                unoptimized
                                            />
                                        )}
                                        <div className="relative z-10 flex flex-col items-center">
                                            <span className="text-4xl font-black">{new Date(event.date).getDate()}</span>
                                            <span className="text-sm font-bold uppercase tracking-[0.2em]">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                                        </div>
                                    </div>
                                    <div className="p-8 flex-1">
                                        <h3 className="text-2xl font-black mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">{event.title}</h3>
                                        <div className="flex items-center text-sm font-medium text-slate-500 mb-4">
                                            <LucideIcons.MapPin className="h-4 w-4 mr-2 text-blue-600" />
                                            {event.location}
                                        </div>
                                        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                        {upcomingEvents.length === 0 && (
                            <div className="lg:col-span-2 text-center p-12 bg-white dark:bg-black/20 rounded-3xl border border-dashed text-muted-foreground">
                                No upcoming events at the moment.
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-4">
                <div className="rounded-[4rem] bg-gradient-to-r from-blue-700 to-indigo-800 p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
                    <div className="absolute bottom-0 right-0 w-full h-96 bg-blue-400/20 rounded-full translate-x-1/4 translate-y-1/4 blur-[100px] opacity-30" />

                    <div className="relative z-10 max-w-3xl mx-auto leading-relaxed">
                        <Star className="h-16 w-16 text-yellow-300 mx-auto mb-10 animate-pulse fill-yellow-300" />
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tight">
                            {profile?.ctaHeadline || "Ready to join our community?"}
                        </h2>
                        <p className="text-xl md:text-2xl mb-14 text-blue-50 font-medium leading-relaxed">
                            {profile?.ctaDescription || "Enroll your child today and provide them with the best educational experience for 2026."}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-12 rounded-full font-black shadow-2xl" asChild>
                                <Link href="/contact">Inquiry Now</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 px-12 rounded-full font-black" asChild>
                                <Link href="/profile">Explore Facilities</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
