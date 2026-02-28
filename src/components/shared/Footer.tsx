import Link from "next/link";
import { School, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { getDirectImageUrl } from "@/lib/utils";

export async function Footer() {
    const profile: any = await prisma.schoolProfile.findFirst();

    const socialLinks = [
        { icon: Facebook, href: profile?.facebookUrl || "#" },
        { icon: Twitter, href: profile?.twitterUrl || "#" },
        { icon: Instagram, href: profile?.instagramUrl || "#" },
        { icon: Youtube, href: profile?.youtubeUrl || "#" },
    ];

    return (
        <footer className="border-t bg-slate-50/50 dark:bg-slate-900/50">
            <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="flex items-center space-x-2">
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
                                <School className="h-10 w-10 text-blue-600" />
                            )}
                            <span className="text-2xl font-black tracking-tight text-slate-900">{profile?.schoolName || "EduCenter"}</span>
                        </Link>
                        <p className="mt-6 text-sm text-slate-500 leading-relaxed font-medium">
                            {profile?.vision || "Providing quality education for a brighter future. Empowering students to achieve excellence and become leaders of tomorrow."}
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Quick Navigation</h3>
                        <ul className="mt-6 space-y-4">
                            <li><Link href="/profile" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Our Identity</Link></li>
                            <li><Link href="/news" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">News & Updates</Link></li>
                            <li><Link href="/agenda" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">School Calendar</Link></li>
                            <li><Link href="/contact" className="text-sm font-bold text-slate-600 hover:text-blue-600 transition-colors">Get in Touch</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Contact Details</h3>
                        <ul className="mt-6 space-y-4">
                            <li className="flex items-start space-x-3 text-sm font-medium text-slate-600">
                                <MapPin className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                                <span>{profile?.address || "123 School Street, Education City"}</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm font-medium text-slate-600">
                                <Phone className="h-5 w-5 text-blue-600 shrink-0" />
                                <span>{profile?.phone || "+1 (234) 567-890"}</span>
                            </li>
                            <li className="flex items-center space-x-3 text-sm font-medium text-slate-600">
                                <Mail className="h-5 w-5 text-blue-600 shrink-0" />
                                <span>{profile?.email || "info@educenter.sch.id"}</span>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600">Digital Presence</h3>
                        <div className="mt-6 flex space-x-4">
                            {socialLinks.map((social, i) => {
                                const Icon = social.icon;
                                return (
                                    <Link
                                        key={i}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-600 hover:text-blue-600 hover:border-blue-100 hover:shadow-lg transition-all"
                                    >
                                        <Icon className="h-5 w-5" />
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} {profile?.schoolName || "EduCenter"}. All rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
