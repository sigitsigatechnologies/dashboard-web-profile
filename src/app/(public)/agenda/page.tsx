import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Calendar, MapPin, Clock, Search } from "lucide-react";
import { getDirectImageUrl } from "@/lib/utils";
import Image from "next/image";
import { SearchInput } from "@/components/shared/SearchInput";
import { Suspense } from "react";
import { getServerTranslations } from "@/lib/i18n";

export default async function AgendaPage(props: {
    searchParams: Promise<{ q?: string }>;
}) {
    const { t, language } = await getServerTranslations();
    const searchParams = await props.searchParams;
    const query = searchParams.q || "";

    const events = await prisma.agenda.findMany({
        where: {
            OR: [
                { title: { contains: query, mode: "insensitive" } },
                { location: { contains: query, mode: "insensitive" } },
            ],
        },
        orderBy: { date: "asc" },
    });

    return (
        <div className="flex flex-col gap-32 pb-32 bg-white dark:bg-slate-950">
            {/* Page Header */}
            <section className="relative pt-60 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-900">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://images.unsplash.com/photo-1506784911079-52146e5c5082?auto=format&fit=crop&q=80&w=2000"
                        alt="Agenda Header"
                        fill
                        className="object-cover opacity-30 animate-ken-burns"
                        unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.4em] mb-8 animate-fade-in">
                        {t("agenda.pageBadge")}
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter text-slate-900 dark:text-white leading-none">
                        {t("agenda.pageHeadline")}
                    </h1>
                    <p className="text-xl md:text-3xl text-slate-600 dark:text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed">
                        {t("agenda.pageSubheadline")}
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-12">
                    <div className="flex-1">
                        <div className="inline-block px-6 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-8">
                            Timeline
                        </div>
                        <h2 className="text-5xl md:text-[6rem] font-black mb-6 tracking-tighter text-slate-900 dark:text-white leading-[0.9]">
                            {t("agenda.pageBadge")}
                        </h2>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Suspense fallback={<div className="h-20 w-full animate-pulse bg-slate-100 dark:bg-slate-800 rounded-3xl" />}>
                            <SearchInput 
                                placeholder="Cari acara atau lokasi..." 
                                className="h-20 w-full" 
                            />
                        </Suspense>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    {events.map((event) => (
                        <div key={event.id} className="group flex flex-col md:flex-row bg-white dark:bg-slate-950 rounded-[4.5rem] overflow-hidden border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-[0_40px_100px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-3">
                            <div className="w-full md:w-72 h-72 md:h-auto relative bg-slate-50 dark:bg-slate-900 overflow-hidden">
                                {event.image ? (
                                    <Image
                                        src={getDirectImageUrl(event.image)}
                                        alt={event.title}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        unoptimized
                                    />
                                ) : (
                                    <div className="h-full w-full flex flex-col items-center justify-center bg-slate-900 text-white p-12">
                                        <Calendar className="h-16 w-16 mb-6 text-primary" />
                                        <span className="text-7xl font-black tracking-tighter leading-none">{new Date(event.date).getDate()}</span>
                                        <span className="text-sm font-black uppercase tracking-[0.4em] mt-3">
                                            {new Date(event.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { month: 'short' })}
                                        </span>
                                    </div>
                                )}
                                <div className="absolute top-8 left-8 md:hidden">
                                    <div className="bg-white dark:bg-slate-950/95 backdrop-blur-md text-slate-900 dark:text-white px-6 py-3 rounded-2xl font-black text-xl shadow-xl border border-white/50">
                                        {new Date(event.date).getDate()} {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                                    </div>
                                </div>
                            </div>
                            <div className="p-12 flex-1 flex flex-col justify-center">
                                <div className="flex items-center gap-6 mb-10">
                                    <div className="hidden md:flex flex-col items-center justify-center w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 shadow-xl text-slate-900 dark:text-white">
                                        <span className="text-4xl font-black leading-none">{new Date(event.date).getDate()}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-1 text-primary">{new Date(event.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { month: 'short' })}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-black mb-4 group-hover:text-primary transition-colors leading-tight text-slate-900 dark:text-white line-clamp-2">{event.title}</h3>
                                        <div className="flex items-center text-slate-400 font-black text-[10px] uppercase tracking-[0.3em]">
                                            <MapPin className="h-4 w-4 mr-3 text-primary" />
                                            {event.location}
                                        </div>
                                    </div>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 font-medium text-lg line-clamp-3 leading-relaxed mb-10">
                                    {event.description}
                                </p>
                                <div className="flex items-center gap-6 mt-auto pt-8 border-t border-slate-100 dark:border-slate-800">
                                    <div className="flex items-center text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">
                                        <Clock className="h-4 w-4 mr-3 text-primary" />
                                        {new Date(event.date).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {events.length === 0 && (
                    <div className="text-center py-48 bg-slate-50 dark:bg-slate-900 rounded-[5rem] border-2 border-dashed border-slate-200 dark:border-slate-700">
                        <div className="w-24 h-24 bg-white dark:bg-slate-950 rounded-[2rem] flex items-center justify-center mx-auto mb-12 shadow-xl border border-slate-100 dark:border-slate-800">
                            <Calendar className="h-10 w-10 text-primary" />
                        </div>
                        <h3 className="text-4xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">No Events Scheduled</h3>
                        <p className="text-slate-500 dark:text-slate-400 text-xl font-medium">We'll be updating our calendar soon. Please check back later.</p>
                    </div>
                )}
            </section>
        </div>
    );
}
