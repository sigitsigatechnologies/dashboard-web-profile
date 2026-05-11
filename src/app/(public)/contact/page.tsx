import { Card, CardContent } from "@/components/ui/Card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { ContactForm } from "@/components/shared/ContactForm";
import { getServerTranslations } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
    const { t } = await getServerTranslations();
    const profile = await prisma.schoolProfile.findFirst();

    return (
        <div className="flex flex-col bg-white dark:bg-slate-950">
            {/* Page Header */}
            <section className="relative pt-60 pb-32 overflow-hidden bg-slate-50 dark:bg-slate-900/50">
                <div className="absolute inset-0 z-0 bg-grid-slate-100 opacity-40" />
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <div className="inline-flex items-center space-x-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-700 px-8 py-3 rounded-full mb-10 shadow-sm animate-fade-in">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                        </span>
                        <span className="text-slate-900 dark:text-white text-[10px] font-black uppercase tracking-[0.4em]">{t("contact.pageBadge")}</span>
                    </div>
                    <h1 className="text-7xl md:text-[10rem] font-black mb-10 tracking-tighter text-slate-900 dark:text-white leading-none">
                        {t("contact.pageHeadline")}
                    </h1>
                    <p className="text-xl md:text-3xl text-slate-500 dark:text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed">
                        {t("contact.pageSubheadline")}
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
                    {/* Contact Info */}
                    <div className="lg:col-span-5 space-y-16">
                        <div>
                            <div className="inline-block px-8 py-3 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.4em] mb-10">
                                {t("contact.info.title")}
                            </div>
                            <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter text-slate-900 dark:text-white leading-[0.85]">{t("contact.info.headline")}</h2>
                            <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{t("contact.info.subheadline")}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 gap-10">
                            <div className="group bg-white dark:bg-slate-950 p-12 rounded-[4.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-[0_60px_120px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-4">
                                <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500 shadow-sm">
                                    <MapPin className="h-10 w-10 text-primary group-hover:text-slate-900 dark:text-white transition-colors" />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-5">{t("contact.info.campus")}</h3>
                                <p className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                                    {profile?.address || "123 School Street, Education City, ED 12345"}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="group bg-white dark:bg-slate-950 p-12 rounded-[4.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-[0_60px_120px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-4">
                                    <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500 shadow-sm">
                                        <Phone className="h-10 w-10 text-primary group-hover:text-slate-900 dark:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-5">{t("contact.info.call")}</h3>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight">
                                        {profile?.phone || "+1 (234) 567-890"}
                                    </p>
                                </div>
                                <div className="group bg-white dark:bg-slate-950 p-12 rounded-[4.5rem] border border-slate-100 dark:border-slate-800 shadow-xl hover:shadow-[0_60px_120px_rgba(0,0,0,0.08)] transition-all duration-700 hover:-translate-y-4">
                                    <div className="w-20 h-20 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-10 group-hover:bg-primary transition-all duration-500 shadow-sm">
                                        <Mail className="h-10 w-10 text-primary group-hover:text-slate-900 dark:text-white transition-colors" />
                                    </div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400 mb-5">{t("contact.info.email")}</h3>
                                    <p className="text-2xl font-black text-slate-900 dark:text-white leading-tight break-all">
                                        {profile?.email || "info@educenter.sch.id"}
                                    </p>
                                </div>
                            </div>

                            <div className="group bg-primary p-12 rounded-[4.5rem] shadow-2xl text-slate-900 dark:text-white relative overflow-hidden transition-all duration-700 hover:scale-[1.02]">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-white dark:bg-slate-950/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                                <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-950/30 backdrop-blur-md flex items-center justify-center mb-10 relative z-10 border border-white/20">
                                    <Clock className="h-10 w-10 text-slate-900 dark:text-white" />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-800 dark:text-slate-200 mb-5 relative z-10">{t("contact.info.hours")}</h3>
                                <p className="text-4xl font-black leading-tight relative z-10 tracking-tight">
                                    {profile?.officeHours || "Mon - Fri: 07:00 AM - 04:00 PM"}
                                </p>
                            </div>
                        </div>

                        <div className="h-[500px] rounded-[5rem] overflow-hidden border-[12px] border-white shadow-[0_60px_120px_rgba(0,0,0,0.1)] group relative">
                            {!profile?.googleMapsUrl || !profile.googleMapsUrl.includes("embed") ? (
                                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-slate-100 dark:bg-slate-800 text-center p-8">
                                    <MapPin className="h-16 w-16 text-slate-400 mb-4" />
                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Peta Tidak Valid</h3>
                                    <p className="text-slate-500 dark:text-slate-400 font-medium">
                                        URL Google Maps yang dimasukkan di Dashboard bukan URL Embed. <br/>
                                        Harap gunakan fitur "Bagikan" &gt; "Sematkan Peta" (Embed a map) di Google Maps dan salin HTML-nya.
                                    </p>
                                </div>
                            ) : null}
                            <iframe
                                src={profile?.googleMapsUrl?.includes("embed") ? profile.googleMapsUrl : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15865.039237691!2d106.816666!3d-6.19!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e3ecb1%3A0x600f6b4020a5948a!2sJakarta%20Pusat%2C%20Kota%20Jakarta%20Pusat%2C%20Daerah%20Khusus%20Ibukota%20Jakarta!5e0!3m2!1sid!2sid!4v1650000000000!5m2!1sid!2sid"}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                title="Google Maps"
                                className="group-hover:scale-105 transition-transform duration-1000 absolute inset-0"
                            ></iframe>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white dark:bg-slate-950 p-12 md:p-32 rounded-[6rem] border border-slate-100 dark:border-slate-800 shadow-[0_60px_150px_rgba(0,0,0,0.05)] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                            <div className="relative z-10">
                                <div className="inline-block px-8 py-3 rounded-full bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12">
                                    Direct Message
                                </div>
                                <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter leading-[0.85] text-slate-900 dark:text-white">{t("contact.form.title")}</h2>
                                <p className="text-2xl text-slate-500 dark:text-slate-400 font-medium mb-20 leading-relaxed">{t("contact.form.subheadline")}</p>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
