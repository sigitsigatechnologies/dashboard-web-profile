import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { HeroSlider } from "@/components/sections/HeroSlider";
import { prisma } from "@/lib/prisma";
import { Calendar, ArrowRight, BookOpen, Users, Trophy, Star } from "lucide-react";
import { formatDate, getDirectImageUrl } from "@/lib/utils";
import { getServerTranslations } from "@/lib/i18n";
import * as LucideIcons from "lucide-react";

export default async function HomePage() {
    const { t, language } = await getServerTranslations();
    const profile: any = await prisma.schoolProfile.findFirst();
    const features: any[] = await prisma.feature.findMany({ orderBy: { order: "asc" } });
    const latestPosts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: 3,
    });
    const upcomingEvents = await prisma.agenda.findMany({
        orderBy: { date: "desc" },
        take: 3,
    });
    const facilitiesList = await prisma.facility.findMany({
        orderBy: { order: "asc" },
        take: 4,
    });
    const teachersList = await prisma.teacher.findMany({
        take: 4,
    });

    return (
        <div className="flex flex-col bg-white">
            {/* Hero Section */}
            <section className="relative min-h-[calc(100vh-72px)] flex items-center py-20 lg:py-0 overflow-visible bg-slate-50/30">
                <div className="absolute inset-0 z-0 bg-grid-slate-100 opacity-30" />
                
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center space-x-3 bg-slate-900/[0.03] border border-slate-900/10 px-5 py-2 rounded-full mb-8">
                                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-slate-500 text-[11px] font-black uppercase tracking-[0.3em]">{t("hero.badge")}</span>
                            </div>
                            
                            <h1 className="text-4xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-slate-900">
                                {language === 'id' && profile?.heroHeadline ? profile.heroHeadline.split(',')[0] + ',' : t("hero.headline")} <br className="hidden md:block"/>
                                <span className="text-primary">{language === 'id' && profile?.heroHeadline && profile.heroHeadline.includes(',') ? profile.heroHeadline.split(',')[1] : t("hero.headline.highlight")}</span>
                            </h1>
                            
                            <p className="text-lg md:text-xl mb-10 text-slate-600 leading-relaxed font-medium max-w-xl">
                                {language === 'id' && profile?.heroSubheadline ? profile.heroSubheadline : t("hero.subheadline")}
                                <span className="block mt-4 text-sm text-slate-400 font-normal italic">
                                    {profile?.address || "Srihardono, Pundong, Klisat, Srihardono, Kec. Bantul, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55771"}
                                </span>
                            </p>
                            
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-10 sm:gap-12">
                                <Button size="lg" className="bg-slate-900 text-white hover:bg-primary hover:text-slate-900 h-20 px-12 rounded-[2rem] text-xl font-black shadow-2xl shadow-primary/20 transition-all group w-full sm:w-auto" asChild>
                                    <Link href="/contact" className="flex items-center justify-center">
                                        {t("hero.cta")}
                                        <ArrowRight className="ml-4 h-6 w-6 group-hover:translate-x-3 transition-transform" />
                                    </Link>
                                </Button>
                                
                                <div className="flex items-center gap-6 bg-white/50 backdrop-blur-sm p-4 pr-8 rounded-[2.5rem] border border-white/50 shadow-sm group hover:bg-white hover:shadow-xl transition-all duration-500">
                                    <div className="flex -space-x-4">
                                        {[1,2,3,4].map(i => (
                                            <div key={i} className="w-14 h-14 rounded-full border-4 border-white overflow-hidden shadow-lg relative group-hover:scale-110 transition-transform duration-500" style={{ transitionDelay: `${i * 100}ms` }}>
                                                <Image src={`https://i.pravatar.cc/100?img=${i+10}`} alt="Student" fill className="object-cover" unoptimized />
                                            </div>
                                        ))}
                                    </div>
                                    <div className="text-slate-900">
                                        <div className="flex items-center gap-1 mb-1">
                                            {[1,2,3,4,5].map(i => (
                                                <Star key={i} className="h-3 w-3 text-primary fill-current" />
                                            ))}
                                        </div>
                                        <div className="text-2xl font-black leading-none tracking-tighter">2,500+</div>
                                        <div className="text-[10px] uppercase tracking-widest text-slate-400 font-black mt-1">{t("hero.students")}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Embossed Slider Content */}
                        <div className="relative animate-fade-in delay-300 hidden lg:block">
                            <div className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-100 border-[12px] border-slate-50 shadow-[inset_0_10px_40px_rgba(0,0,0,0.1)]">
                                <HeroSlider 
                                    images={
                                        profile?.heroImages && profile.heroImages.length > 0 
                                            ? profile.heroImages.map((img: string) => getDirectImageUrl(img))
                                            : [
                                                getDirectImageUrl(profile?.heroImage) || "https://images.unsplash.com/photo-1523050335391-4dfeb0f7c071?auto=format&fit=crop&q=80&w=2000",
                                                "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=2000",
                                                "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=2000",
                                                "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2000",
                                                "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=2000",
                                                "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=2000"
                                            ]
                                    } 
                                />
                                <div className="absolute inset-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)] pointer-events-none" />
                            </div>

                            {/* Simplified Badge */}
                            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-3xl shadow-xl border border-slate-100 flex items-center gap-4">
                                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                                    <Star className="h-6 w-6 text-slate-900 fill-current" />
                                </div>
                                <div>
                                    <div className="text-xl font-black text-slate-900">4.9/5</div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Rating</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-24">
                <div className="flex flex-col lg:flex-row items-end justify-between mb-20 gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
                            {t("features.badge")}
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-slate-900 leading-[0.9]">
                            {t("features.headline")}
                        </h2>
                    </div>
                    <div className="max-w-md text-right hidden lg:block pb-4">
                        <p className="text-lg text-slate-500 font-medium leading-relaxed">
                            {t("features.subheadline")}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.length > 0 ? (
                        features.map((feature, i) => {
                            const IconComponent = (LucideIcons as any)[feature.icon] || BookOpen;
                            return (
                                <div key={feature.id} 
                                     className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
                                >
                                    <div className="relative z-10">
                                        <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary transition-all duration-500 border border-white">
                                            <IconComponent className="h-8 w-8 text-primary group-hover:text-slate-900 transition-colors" />
                                        </div>
                                        <h3 className="text-2xl font-black mb-4 text-slate-900 group-hover:text-primary transition-colors tracking-tight">
                                            {feature.title}
                                        </h3>
                                        <p className="text-slate-500 text-base font-medium leading-relaxed mb-8">
                                            {feature.description}
                                        </p>
                                        <div className="h-1.5 w-12 bg-slate-100 rounded-full group-hover:bg-primary transition-all duration-500 group-hover:w-full" />
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        [
                            { title: "Academic Excellence", desc: "Rigorous curriculum designed to challenge and inspire students.", icon: BookOpen },
                            { title: "Strong Community", desc: "A supportive environment where every student is valued.", icon: Users },
                            { title: "Global Future", desc: "Preparing students for success in a diverse global society.", icon: Trophy },
                            { title: "Personal Growth", desc: "Nurturing talents and building character for a lifetime.", icon: Star }
                        ].map((item, i) => (
                            <div key={i} className="group bg-white p-14 rounded-[4.5rem] border border-slate-100 shadow-xl hover:shadow-[0_60px_120px_rgba(0,0,0,0.1)] hover:-translate-y-6 transition-all duration-700">
                                <div className="w-24 h-24 bg-slate-50 rounded-3xl flex items-center justify-center mb-12 group-hover:bg-primary transition-all duration-500 shadow-xl border border-white">
                                    <item.icon className="h-12 w-12 text-primary group-hover:text-slate-900 transition-colors" />
                                </div>
                                <h3 className="text-4xl font-black mb-8 text-slate-900 group-hover:text-primary transition-colors tracking-tight">{item.title}</h3>
                                <p className="text-slate-500 text-xl font-medium leading-relaxed mb-12">{item.desc}</p>
                                <div className="h-2 w-20 bg-slate-100 rounded-full group-hover:bg-primary transition-all duration-500 group-hover:w-full" />
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* Facilities Preview Section */}
            {facilitiesList.length > 0 && (
                <section className="bg-slate-900 py-32 text-white overflow-hidden">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
                                    {t("facilities.title") || "Fasilitas Unggulan"}
                                </h2>
                                <p className="text-slate-400 mt-4 text-lg max-w-2xl">
                                    Lingkungan belajar modern yang dirancang untuk mendukung setiap aspek perkembangan siswa.
                                </p>
                            </div>
                            <Button variant="outline" className="border-slate-700 text-slate-300 hover:bg-white hover:text-slate-900 rounded-full px-8" asChild>
                                <Link href="/facilities">Lihat Semua Fasilitas</Link>
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {facilitiesList.map((facility) => (
                                <div key={facility.id} className="group relative rounded-3xl overflow-hidden aspect-[4/5]">
                                    <Image 
                                        src={getDirectImageUrl(facility.image)} 
                                        alt={facility.name} 
                                        fill 
                                        className="object-cover group-hover:scale-110 transition-transform duration-700" 
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                                    <div className="absolute bottom-0 left-0 p-8 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <h3 className="text-2xl font-black text-white mb-2">{facility.name}</h3>
                                        <div className="h-1 w-12 bg-primary rounded-full group-hover:w-full transition-all duration-500" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Teachers Preview Section */}
            {teachersList.length > 0 && (
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center mb-20">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
                                {t("teachers.title") || "Tenaga Pengajar"}
                            </h2>
                            <p className="text-slate-500 mt-4 text-lg max-w-2xl mx-auto">
                                Dididik oleh para ahli dan profesional yang berdedikasi tinggi terhadap masa depan siswa.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teachersList.map((teacher) => (
                                <div key={teacher.id} className="group text-center">
                                    <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-slate-50 shadow-xl group-hover:border-primary transition-colors duration-500">
                                        <Image 
                                            src={getDirectImageUrl(teacher.photo)} 
                                            alt={teacher.name} 
                                            fill 
                                            className="object-cover group-hover:scale-110 transition-transform duration-500" 
                                            unoptimized
                                        />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900">{teacher.name}</h3>
                                    <p className="text-primary font-bold text-sm uppercase tracking-widest mt-2 mb-4">{teacher.position}</p>
                                    <p className="text-slate-500 text-sm line-clamp-3 px-4">{teacher.bio}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-16">
                            <Button size="lg" className="bg-slate-100 text-slate-900 hover:bg-primary hover:text-slate-900 rounded-full px-12 font-bold shadow-sm" asChild>
                                <Link href="/teachers">Profil Seluruh Guru</Link>
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {/* News Section */}
            <section className="bg-slate-50 py-40">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-slate-900">
                            {t("news.latest")}
                        </h2>
                        <Link href="/news" className="group flex items-center gap-6 text-slate-900 font-black uppercase tracking-[0.4em] text-xs">
                            {t("news.viewAll")} <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform text-primary" />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {latestPosts.map((post) => (
                            <Link key={post.id} href={`/news/${post.slug}`} className="group h-full">
                                <article className="flex flex-col h-full bg-white rounded-[4rem] overflow-hidden border border-slate-100 shadow-xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] hover:-translate-y-4 transition-all duration-700">
                                    <div className="relative h-80 overflow-hidden">
                                        <Image
                                            src={getDirectImageUrl(post.featuredImage) || "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800"}
                                            alt={post.title}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                            unoptimized
                                        />
                                        <div className="absolute top-8 left-8">
                                            <span className="bg-white/95 backdrop-blur-md px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-slate-900 shadow-xl">
                                                {post.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-12 flex flex-col flex-1">
                                        <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-8">
                                            <Calendar className="h-4 w-4" />
                                            <span>{formatDate(post.createdAt)}</span>
                                        </div>
                                        <h3 className="text-3xl font-black mb-6 text-slate-900 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                                            {post.title}
                                        </h3>
                                        <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 line-clamp-3 flex-1">
                                            {post.content}
                                        </p>
                                        <div className="flex items-center gap-4 text-slate-900 font-black text-xs uppercase tracking-[0.3em] group-hover:text-primary transition-all">
                                            {t("news.readFull")} <ArrowRight className="h-6 w-6 group-hover:translate-x-3 transition-transform" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="container mx-auto px-4">
                <div className="bg-white rounded-[5rem] border border-slate-100 p-12 md:p-32 shadow-[0_40px_120px_rgba(0,0,0,0.05)]">
                    <div className="text-center mb-24">
                        <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                            {t("events.badge")}
                        </div>
                        <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter text-slate-900">{t("events.headline")}</h2>
                        <p className="text-slate-500 text-2xl max-w-3xl mx-auto font-medium leading-relaxed">{t("events.subheadline")}</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {upcomingEvents.map((event) => (
                            <Link key={event.id} href="/agenda" className="group">
                                <div className="flex flex-col md:flex-row bg-slate-50 border border-slate-100 rounded-[4rem] overflow-hidden hover:bg-white hover:shadow-2xl hover:border-primary/20 transition-all duration-700 hover:-translate-y-3">
                                    <div className="w-full md:w-56 bg-primary text-slate-900 flex flex-col items-center justify-center p-12 relative shadow-xl">
                                        <span className="text-7xl font-black tracking-tighter leading-none">{new Date(event.date).getDate()}</span>
                                        <span className="text-sm font-black uppercase tracking-[0.4em] mt-2">
                                            {new Date(event.date).toLocaleString('default', { month: 'short' })}
                                        </span>
                                    </div>
                                    <div className="p-12 flex-1 flex flex-col justify-center">
                                        <h3 className="text-3xl font-black mb-6 text-slate-900 group-hover:text-primary transition-colors line-clamp-1 leading-tight">{event.title}</h3>
                                        <div className="flex items-center text-xs font-black text-slate-400 mb-8 uppercase tracking-[0.3em]">
                                            <LucideIcons.MapPin className="h-5 w-5 mr-4 text-primary" />
                                            {event.location}
                                        </div>
                                        <p className="text-slate-500 text-lg line-clamp-2 leading-relaxed font-medium">
                                            {event.description}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6">
                <div className="relative rounded-[3rem] overflow-hidden bg-primary p-16 md:p-24 text-center shadow-2xl">
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <div className="w-16 h-16 bg-white text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-10 rotate-6 shadow-lg border border-white/50">
                            <Star className="h-8 w-8 fill-current text-primary" />
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-[0.9]">
                            {t("cta.headline")}
                        </h2>
                        <p className="text-lg md:text-xl mb-12 text-slate-800 font-medium leading-relaxed max-w-2xl mx-auto">
                            {t("cta.subheadline")}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Button size="lg" className="bg-slate-900 text-white hover:bg-white hover:text-slate-900 h-16 px-12 rounded-2xl text-xl font-bold shadow-xl transition-all hover:scale-105 active:scale-95" asChild>
                                <Link href="/contact">{t("cta.applyNow")}</Link>
                            </Button>
                            <Button size="lg" variant="outline" className="h-16 px-12 rounded-2xl text-xl font-bold bg-white/20 border-white/40 text-slate-900 backdrop-blur-md hover:bg-white transition-all hover:scale-105 active:scale-95" asChild>
                                <Link href="/profile">{t("cta.learnMore")}</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
