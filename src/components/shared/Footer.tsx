import Link from "next/link";
import { School, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getDirectImageUrl } from "@/lib/utils";
import { getServerTranslations } from "@/lib/i18n";

export async function Footer() {
    const { t } = await getServerTranslations();
    const profile: any = await prisma.schoolProfile.findFirst();

    const socialLinks = [
        { icon: Facebook, href: profile?.facebookUrl || "#" },
        { icon: Twitter, href: profile?.twitterUrl || "#" },
        { icon: Instagram, href: profile?.instagramUrl || "#" },
        { icon: Youtube, href: profile?.youtubeUrl || "#" },
    ];

    return (
        <footer className="border-t bg-slate-50 dark:bg-slate-900 pt-32 pb-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 lg:gap-24">
                    <div className="col-span-1 lg:col-span-1">
                        <Link href="/" className="flex items-center space-x-4 group">
                            <div className="bg-white dark:bg-slate-950 p-3 rounded-2xl group-hover:scale-110 transition-transform shadow-sm border border-slate-100 dark:border-slate-800">
                                {profile?.logo ? (
                                    <Image
                                        src={getDirectImageUrl(profile.logo)}
                                        alt={profile.schoolName}
                                        width={48}
                                        height={48}
                                        className="h-12 w-auto object-contain"
                                        unoptimized
                                    />
                                ) : (
                                    <School className="h-10 w-10 text-primary" />
                                )}
                            </div>
                            <span className="text-3xl font-black tracking-tighter font-heading text-slate-900 dark:text-white">
                                {profile?.schoolName || "EduCenter"}
                            </span>
                        </Link>
                        <p className="mt-10 text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium max-w-sm">
                            {profile?.vision || "Empowering the next generation with world-class education and values-driven learning experiences."}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">{t("nav.dashboard")}</h3>
                        <ul className="space-y-6">
                            <li><Link href="/profile" className="text-base font-black text-slate-700 dark:text-slate-300 hover:text-primary transition-all font-heading tracking-tight">{t("nav.facilities")}</Link></li>
                            <li><Link href="/news" className="text-base font-black text-slate-700 dark:text-slate-300 hover:text-primary transition-all font-heading tracking-tight">{t("nav.news")}</Link></li>
                            <li><Link href="/agenda" className="text-base font-black text-slate-700 dark:text-slate-300 hover:text-primary transition-all font-heading tracking-tight">{t("nav.agenda")}</Link></li>
                            <li><Link href="/contact" className="text-base font-black text-slate-700 dark:text-slate-300 hover:text-primary transition-all font-heading tracking-tight">{t("nav.contact")}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">{t("contact.info.title")}</h3>
                        <ul className="space-y-8">
                            <li className="flex items-start space-x-5 text-base font-medium text-slate-500 dark:text-slate-400">
                                <div className="bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <MapPin className="h-5 w-5 text-primary shrink-0" />
                                </div>
                                <span className="leading-relaxed">{profile?.address || "123 School Street, Education City"}</span>
                            </li>
                            <li className="flex items-center space-x-5 text-base font-medium text-slate-500 dark:text-slate-400">
                                <div className="bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <Phone className="h-5 w-5 text-primary shrink-0" />
                                </div>
                                <span>{profile?.phone || "+1 (234) 567-890"}</span>
                            </li>
                            <li className="flex items-center space-x-5 text-base font-medium text-slate-500 dark:text-slate-400">
                                <div className="bg-white dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
                                    <Mail className="h-5 w-5 text-primary shrink-0" />
                                </div>
                                <span>{profile?.email || "info@educenter.sch.id"}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Stay Connected</h3>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-4 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 text-slate-600 dark:text-slate-400 hover:text-primary hover:border-primary/20 hover:shadow-xl hover:-translate-y-2 transition-all duration-500"
                                    >
                                        <Icon className="h-6 w-6" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="mt-32 pt-12 border-t border-slate-200 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-8">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} {profile?.schoolName || "EduCenter"}. {t("footer.rights")}.
                    </p>
                    <div className="flex items-center space-x-12">
                        <Link href="/privacy" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.4em] transition-all">Privacy Policy</Link>
                        <Link href="/terms" className="text-[10px] font-black text-slate-400 hover:text-primary uppercase tracking-[0.4em] transition-all">Terms of Use</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
