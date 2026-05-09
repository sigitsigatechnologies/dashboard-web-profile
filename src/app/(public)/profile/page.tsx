import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/Button";
import { getDirectImageUrl, cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import { getServerTranslations } from "@/lib/i18n";

export default async function ProfilePage() {
    const { t } = await getServerTranslations();
    const profile: any = await prisma.schoolProfile.findFirst();
    const teachers = await prisma.teacher.findMany();
    const facilities = await prisma.facility.findMany({ orderBy: { order: "asc" } });

    return (
        <div className="flex flex-col gap-32 pb-32 bg-white">
            {/* Page Header */}
            <section className="relative pt-60 pb-32 overflow-hidden bg-slate-50">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={getDirectImageUrl(profile?.heroImage) || "https://images.unsplash.com/photo-1523050335102-c67ad5154573?auto=format&fit=crop&q=80&w=2000"}
                        alt="School Background"
                        fill
                        className="object-cover opacity-30 animate-ken-burns"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-slate-900 text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
                        {t("profile.pageBadge")}
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-slate-900 leading-none">
                        {t("profile.headlinePrefix")} {profile?.schoolName || "Our Academy"}
                    </h1>
                    <p className="text-xl md:text-3xl text-slate-600 max-w-4xl mx-auto font-medium leading-relaxed">
                        {t("profile.subheadline")}
                    </p>
                </div>
            </section>

            {/* History Section */}
            <section className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <div className="relative aspect-[4/3] rounded-[4.5rem] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.08)] group border border-slate-100">
                        <Image
                            src="https://images.unsplash.com/photo-1519311965067-36d3e5f33d39?auto=format&fit=crop&q=80&w=1000"
                            alt="School History"
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                    </div>
                    <div>
                        <div className="mb-8 inline-flex items-center rounded-full px-8 py-3 text-xs font-black uppercase tracking-[0.3em] bg-primary/10 text-slate-900 border border-primary/20">
                            {t("profile.journeyBadge")}
                        </div>
                        <h2 className="text-5xl md:text-[6rem] font-black mb-10 leading-[0.9] tracking-tighter text-slate-900">{t("profile.journeyHeadline")}</h2>
                        <div className="space-y-8 text-xl text-slate-500 leading-relaxed font-medium">
                            <p className="first-letter:text-8xl first-letter:font-black first-letter:text-primary first-letter:mr-4 first-letter:float-left first-letter:leading-none">
                                {profile?.history || "Founded with a vision to transform education, our school has been a pillar of academic excellence for decades. We believe in nurturing not just students, but future global citizens who are prepared to lead with integrity."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Vision & Mission */}
            <section className="bg-slate-50 py-40 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                        <div className="p-16 bg-white rounded-[4.5rem] border border-slate-100 shadow-xl hover:shadow-3xl transition-all duration-700">
                            <div className="w-24 h-24 bg-primary text-slate-900 rounded-[2rem] flex items-center justify-center mb-12 shadow-2xl rotate-3">
                                <LucideIcons.Target className="h-12 w-12" />
                            </div>
                            <h2 className="text-4xl font-black mb-8 text-slate-900">{t("profile.visionTitle")}</h2>
                            <p className="text-2xl text-slate-500 leading-relaxed font-medium italic opacity-90">
                                "{profile?.vision || "To be a world-class institution that nurtures future leaders with integrity and innovation."}"
                            </p>
                        </div>
                        <div className="p-16 bg-white rounded-[4.5rem] border border-slate-100 shadow-xl hover:shadow-3xl transition-all duration-700">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-12 border border-slate-100 -rotate-3">
                                <LucideIcons.Rocket className="h-12 w-12 text-primary" />
                            </div>
                            <h2 className="text-4xl font-black mb-8 text-slate-900">{t("profile.missionTitle")}</h2>
                            <ul className="space-y-8">
                                {profile?.mission ? (
                                    profile.mission.split('\n').map((m: string, i: number) => (
                                        <li key={i} className="flex items-start gap-6 group">
                                            <div className="mt-1.5 p-1 rounded-full bg-primary/20 border border-primary/40 group-hover:bg-primary transition-colors">
                                                <LucideIcons.Check className="h-4 w-4 text-slate-900" />
                                            </div>
                                            <span className="text-xl text-slate-600 font-medium">{m}</span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="flex items-start gap-6">
                                        <div className="mt-1.5 p-1 rounded-full bg-primary/20 border border-primary/40">
                                            <LucideIcons.Check className="h-4 w-4 text-slate-900" />
                                        </div>
                                        <span className="text-xl text-slate-600 font-medium">Providing high-quality education and character building.</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Principal's Message */}
            <section className="container mx-auto px-4">
                <div className="relative group bg-white rounded-[5rem] p-16 md:p-32 border border-slate-100 shadow-[0_40px_120px_rgba(0,0,0,0.05)] flex flex-col items-center text-center">
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-900 text-primary flex items-center justify-center mb-12 shadow-2xl rotate-12">
                        <LucideIcons.Quote className="h-10 w-10 fill-current" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter text-slate-900">{t("profile.principalTitle")}</h2>
                    <p className="text-2xl md:text-[3.5rem] text-slate-600 leading-[1.2] italic max-w-5xl font-black tracking-tight">
                        "{profile?.principalMessage || "Welcome to our school. We are committed to providing an environment where every student can discover their passions and reach their full potential."}"
                    </p>
                </div>
            </section>

            {/* Teachers Section */}
            <section className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            {t("profile.mentorshipBadge")}
                        </div>
                        <h2 className="text-5xl md:text-[7rem] font-black tracking-tighter text-slate-900 leading-[0.9]">
                            {t("profile.mentorshipHeadline")}
                        </h2>
                    </div>
                    <div className="max-w-md text-right hidden md:block">
                        <p className="text-xl text-slate-500 font-medium leading-relaxed">
                            {t("profile.mentorshipSubheadline")}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    {teachers.map((teacher) => (
                        <div key={teacher.id} className="group flex flex-col">
                            <div className="relative aspect-[3/4] rounded-[4.5rem] overflow-hidden mb-10 shadow-xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.1)] transition-all duration-700 border border-slate-100">
                                <Image
                                    src={getDirectImageUrl(teacher.photo) || "https://images.unsplash.com/photo-1544717297-fa154da09f9d?auto=format&fit=crop&q=80&w=400"}
                                    alt={teacher.name}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <h3 className="text-3xl font-black mb-3 group-hover:text-primary transition-colors text-slate-900">{teacher.name}</h3>
                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-6">{teacher.position}</p>
                            <p className="text-slate-500 text-lg font-medium line-clamp-2 leading-relaxed">
                                {teacher.bio}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Facilities Section */}
            <section className="bg-slate-50 py-40">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                        <div className="lg:col-span-5">
                            <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                                {t("profile.envBadge")}
                            </div>
                            <h2 className="text-6xl md:text-[6.5rem] font-black mb-12 tracking-tighter text-slate-900 leading-[0.9]">{t("profile.envHeadline")}</h2>
                            <p className="text-2xl text-slate-500 font-medium mb-20 leading-relaxed">
                                {t("profile.envSubheadline")}
                            </p>
                            <div className="space-y-12">
                                <div className="flex items-start gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                        <LucideIcons.MapPin className="h-8 w-8 text-primary group-hover:text-slate-900 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em] mb-3">Campus Address</p>
                                        <p className="text-2xl font-black text-slate-900 leading-tight">
                                            {profile?.address || "123 School Street, Education City, ED 12345"}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-8 group">
                                    <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 shadow-xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors">
                                        <LucideIcons.PhoneCall className="h-8 w-8 text-primary group-hover:text-slate-900 transition-colors" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase text-primary tracking-[0.3em] mb-3">Get in Touch</p>
                                        <p className="text-2xl font-black text-slate-900">
                                            {profile?.phone || "+1 (234) 567-890"}
                                        </p>
                                        <p className="text-2xl font-black text-slate-900">
                                            {profile?.email || "info@educenter.sch.id"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-7 grid grid-cols-2 gap-12">
                            {facilities.length > 0 ? (
                                facilities.map((f, i) => (
                                    <div key={f.id} className={cn(
                                        "relative aspect-square rounded-[4.5rem] overflow-hidden group shadow-2xl border border-white",
                                        i % 2 === 1 ? "translate-y-16" : ""
                                    )}>
                                        <Image src={getDirectImageUrl(f.image)} alt={f.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" unoptimized />
                                        <div className="absolute inset-0 bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-12 text-center backdrop-blur-md">
                                            <span className="text-slate-900 text-3xl font-black uppercase tracking-tighter">{f.name}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <>
                                    <div className="relative aspect-square rounded-[4.5rem] overflow-hidden group shadow-2xl border border-white">
                                        <Image src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600" alt="Smart Classrooms" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    </div>
                                    <div className="relative aspect-square rounded-[4.5rem] overflow-hidden group shadow-2xl border border-white translate-y-16">
                                        <Image src="https://images.unsplash.com/photo-1532094349884-543bb1178329?auto=format&fit=crop&q=80&w=600" alt="Research Labs" fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
